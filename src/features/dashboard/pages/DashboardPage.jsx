import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BookOpen,
  CalendarDays,
  ChevronRight,
  NotebookPen,
  Play,
  RefreshCw,
  Search,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ProgressBar from "@/components/ui/ProgressBar";
import Skeleton from "@/components/ui/Skeleton";

import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import useMyEnrollments from "@/features/enrollment/hooks/useEnrollment";
import { toggleSavedEnrollment } from "@/features/enrollment/api/enrollmentApi";
import { NotesDialog } from "@/features/enrollment/components/NotesDialog";
import useCourses from "@/features/courses/hooks/useCourses";
import { getEvents } from "@/features/events/api/eventsApi";

const greetingFor = (hour) => {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const courseOf = (enrollment) =>
  enrollment?.courseId && typeof enrollment.courseId === "object"
    ? enrollment.courseId
    : null;

const clampProgress = (value) =>
  Math.min(100, Math.max(0, Math.round(Number(value) || 0)));

const formatMinutes = (minutes) => {
  const value = Number(minutes) || 0;
  if (value <= 0) return "Self-paced";
  if (value < 60) return `${value}m`;

  const hours = Math.floor(value / 60);
  const rest = value % 60;
  return rest > 0 ? `${hours}h ${rest}m` : `${hours}h`;
};

const minutesLeftLabel = (minutes) => {
  const value = Number(minutes) || 0;
  if (value <= 0) return "LESSON READY";
  return `${value} MIN LEFT`;
};

const scheduleLabel = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "SCHEDULE TBC";
  }

  const parts = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).formatToParts(date);

  const read = (type) => parts.find((part) => part.type === type)?.value || "";

  const time = [read("hour"), read("minute")].filter(Boolean).join(":");

  return [read("weekday"), read("day"), "·", time, read("timeZoneName")]
    .filter(Boolean)
    .join(" ")
    .toUpperCase();
};

const badgeFor = (course) => {
  if (!course) return null;

  const created = course.createdAt ? new Date(course.createdAt) : null;
  const isNew =
    created && Date.now() - created.getTime() < 30 * 24 * 60 * 60 * 1000;

  if ((course.enrollmentCount ?? 0) >= 2) return "POPULAR";
  if (isNew) return "NEW";
  return null;
};

const SpotlightSkeleton = () => (
  <div className="overflow-hidden rounded-[24px] border border-line bg-white">
    <div className="grid lg:grid-cols-[1.35fr_1fr]">
      <div className="space-y-4 p-6 sm:p-7">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-1.5 w-full rounded-full" />
        <Skeleton className="h-10 w-44 rounded-full" />
      </div>
      <Skeleton className="m-3 h-[190px] rounded-[18px] lg:m-4" />
    </div>
  </div>
);

const CuratedSkeleton = () => (
  <div className="space-y-2">
    {[0, 1, 2].map((item) => (
      <Skeleton key={item} className="h-[68px] rounded-[16px]" />
    ))}
  </div>
);

export const DashboardPage = () => {
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();
  const enrollmentsQuery = useMyEnrollments();
  const coursesQuery = useCourses({ page: 1, limit: 8 });
  const eventsQuery = useQuery({
    queryKey: ["events", "dashboard"],
    queryFn: () => getEvents({ page: 1, limit: 4 }),
  });

  const [notesFor, setNotesFor] = useState(null);

  const saveMutation = useMutation({
    mutationFn: (enrollmentId) => toggleSavedEnrollment(enrollmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-enrollments"] });
    },
  });

  const enrollments = enrollmentsQuery.data?.data ?? [];
  const active = enrollments.filter((item) => item.status === "active");
  const completed = enrollments.filter((item) => item.status === "completed");

  const spotlight = [...active].sort(
    (left, right) =>
      new Date(right.updatedAt || 0) - new Date(left.updatedAt || 0),
  )[0];

  const spotlightCourse = courseOf(spotlight);
  const lesson =
    spotlight?.currentLesson ?? spotlight?.lastAccessedLesson ?? null;
  const progress = clampProgress(spotlight?.progress);
  const totalLessons = spotlight?.totalLessons ?? spotlightCourse?.lessonCount ?? 0;
  const doneLessons = spotlight?.completedLessonsCount ?? 0;
  const instructor = spotlightCourse?.createdBy?.fullname || "SkillHub instructor";
  const statusLabel =
    spotlight?.status === "completed"
      ? "COMPLETED"
      : spotlightCourse?.cohortLabel
        ? spotlightCourse.cohortLabel.toUpperCase()
        : "IN PROGRESS";

  const lessonsComplete = enrollments.reduce(
    (total, item) => total + (item.completedLessonsCount ?? 0),
    0,
  );

  const enrolledCourseIds = new Set(
    enrollments.map((item) => String(courseOf(item)?._id ?? item.courseId ?? "")),
  );
  const catalog = coursesQuery.data?.data?.courses ?? [];
  const curated = catalog
    .filter((course) => !enrolledCourseIds.has(String(course._id)))
    .filter((course) => (course.lessonCount ?? 0) > 0)
    .sort(
      (left, right) =>
        (right.enrollmentCount ?? 0) - (left.enrollmentCount ?? 0),
    )
    .slice(0, 3);

  const events = (eventsQuery.data?.data ?? [])
    .filter((event) => new Date(event.date) > new Date())
    .slice(0, 3);

  const firstName = (user?.fullname || "").split(" ")[0];
  const today = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  const openSearch = () => {
    window.dispatchEvent(new Event("skillhub:open-search"));
  };

  const media = spotlightCourse?.imageUrl;

  return (
    <div className="pb-4">
      {/* Contextual bar: breadcrumb + workspace search */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center gap-1.5 text-[11.5px]"
        >
          <span className="text-text-muted">Workspace</span>
          <ChevronRight size={11} className="text-text-muted" aria-hidden="true" />
          <span className="truncate font-medium text-text-primary">
            {spotlightCourse?.title || "Dashboard"}
          </span>
        </nav>

        <button
          type="button"
          onClick={openSearch}
          className="group flex items-center gap-3 rounded-full border border-line bg-white px-3.5 py-2 text-[12px] text-text-muted transition-colors hover:border-primary/35 hover:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        >
          <Search size={14} aria-hidden="true" />
          <span>Search workspace</span>
          <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Greeting */}
      <header className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="section-label">{today}</p>
          <h1 className="mt-2 text-[26px] font-semibold leading-[1.2] tracking-[-0.025em] sm:text-[30px]">
            {greetingFor(new Date().getHours())}, {firstName || "Learner"}
          </h1>
        </div>

        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-text-muted">
          <span>
            <span className="font-medium text-text-primary">{active.length}</span>{" "}
            active
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <span className="font-medium text-text-primary">{lessonsComplete}</span>{" "}
            lessons complete
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <span className="font-medium text-text-primary">{completed.length}</span>{" "}
            finished
          </span>
        </p>
      </header>

      <div className="editorial-split mt-8">
        <div className="min-w-0 space-y-10">
          {/* Continue learning */}
          <section>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="section-label">Continue learning</h2>
              <Link
                to="/learning"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-primary"
              >
                All tracks
                <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            </div>

            {enrollmentsQuery.isLoading ? (
              <SpotlightSkeleton />
            ) : enrollmentsQuery.isError ? (
              <EmptyState
                tone="error"
                icon={RefreshCw}
                title="Your workspace couldn't load"
                description="The enrollment service did not respond. Try again in a moment."
                action={
                  <Button variant="secondary" onClick={() => enrollmentsQuery.refetch()}>
                    Try again
                  </Button>
                }
              />
            ) : spotlight ? (
              <article className="overflow-hidden rounded-[24px] border border-line bg-white">
                <div className="grid lg:grid-cols-[1.35fr_1fr]">
                  <div className="flex flex-col justify-between gap-7 p-6 sm:p-7">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10.5px] font-medium uppercase tracking-[0.1em] text-text-muted">
                          Continue learning
                        </span>
                        <Badge
                          dot
                          size="sm"
                          variant={spotlightCourse?.cohortLabel ? "live" : "sage"}
                          className="uppercase tracking-[0.08em]"
                        >
                          {statusLabel}
                        </Badge>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11.5px] text-text-muted">
                        <span className="truncate">
                          {spotlightCourse?.title || "Course"}
                        </span>
                        <ChevronRight size={11} aria-hidden="true" />
                        <span className="truncate">
                          {lesson?.sectionTitle || "Section"}
                        </span>
                        <ChevronRight size={11} aria-hidden="true" />
                        <span className="text-text-secondary">
                          Lesson {lesson?.index ?? 1}
                        </span>
                      </div>

                      <h3 className="mt-2 text-[20px] font-semibold leading-[1.3] tracking-[-0.02em] text-text-primary sm:text-[22px]">
                        {lesson?.title || spotlightCourse?.title || "Your next lesson"}
                      </h3>

                      <p className="mt-1.5 text-[12.5px] text-text-muted">
                        with {instructor}
                        {spotlightCourse?.category?.name
                          ? ` · ${spotlightCourse.category.name}`
                          : ""}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="text-[12px] text-text-muted">
                          <span className="font-medium text-text-primary">
                            {doneLessons} of {totalLessons}
                          </span>{" "}
                          lessons complete
                        </p>
                        <p className="text-[15px] font-semibold tabular-nums text-text-primary">
                          {progress}%
                        </p>
                      </div>

                      <ProgressBar value={progress} className="mt-2" />

                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <Button
                          as={Link}
                          to={
                            spotlightCourse?._id
                              ? `/learning/${spotlightCourse._id}`
                              : "/learning"
                          }
                          size="sm"
                          iconLeft={Play}
                        >
                          Resume lesson
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          iconLeft={Bookmark}
                          loading={saveMutation.isPending}
                          onClick={() => saveMutation.mutate(spotlight._id)}
                          aria-pressed={Boolean(spotlight.saved)}
                          className={
                            spotlight.saved
                              ? "!border-primary/30 !bg-sage !text-primary"
                              : ""
                          }
                        >
                          {spotlight.saved ? "Saved" : "Save"}
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          iconLeft={NotebookPen}
                          onClick={() =>
                            setNotesFor({
                              enrollmentId: spotlight._id,
                              lesson,
                              courseTitle: spotlightCourse?.title,
                            })
                          }
                          disabled={!lesson?._id}
                        >
                          Notes
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Media preview with duration pill */}
                  <div className="relative m-3 min-h-[190px] overflow-hidden rounded-[18px] bg-forest-deep lg:m-4">
                    {media ? (
                      <img
                        src={media}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(169,204,184,0.28),transparent_58%)]" />
                        <div className="absolute -right-10 -top-8 h-40 w-40 rounded-full border border-white/10" />
                        <div className="absolute -bottom-14 -left-10 h-48 w-48 rounded-full border border-white/10" />
                        <div className="relative flex h-full flex-col justify-between p-5">
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/45">
                            {spotlightCourse?.category?.name || "Track"}
                          </span>
                          <div>
                            <p className="font-mono text-[34px] leading-none tracking-[-0.03em] text-white/20">
                              M{String(
                                lesson?.sectionOrder ?? lesson?.index ?? 1,
                              ).padStart(2, "0")}
                            </p>
                            <p className="mt-2 line-clamp-2 text-[13px] font-medium leading-snug text-white/80">
                              {lesson?.sectionTitle || spotlightCourse?.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-forest-deep/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                      <Play size={10} aria-hidden="true" />
                      {minutesLeftLabel(lesson?.duration ?? spotlight?.minutesRemaining)}
                    </span>
                  </div>
                </div>
              </article>
            ) : (
              <EmptyState
                icon={BookOpen}
                title="No active track yet"
                description="Enrol in a course and your next lesson will wait here."
                action={
                  <Button as={Link} to="/courses" size="sm" iconRight={ArrowUpRight}>
                    Explore catalog
                  </Button>
                }
              />
            )}
          </section>

          {/* Curated for you */}
          <section>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="section-label">Curated for you</h2>
              <Link
                to="/courses"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-primary"
              >
                View all
                <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            </div>

            {coursesQuery.isLoading ? (
              <CuratedSkeleton />
            ) : curated.length > 0 ? (
              <div className="overflow-hidden rounded-[16px] border border-line bg-white">
                <div className="divide-y divide-line">
                  {curated.map((course) => {
                    const badge = badgeFor(course);

                    return (
                      <Link
                        key={course._id}
                        to={`/courses/${course._id}`}
                        className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-sage/60"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-[13.5px] font-medium tracking-[-0.01em] text-text-primary">
                              {course.title}
                            </p>
                            {badge && (
                              <Badge
                                size="sm"
                                variant={badge === "POPULAR" ? "forest" : "sage"}
                                className="shrink-0 uppercase tracking-[0.08em]"
                              >
                                {badge}
                              </Badge>
                            )}
                          </div>

                          <p className="mt-1 truncate text-[11.5px] text-text-muted">
                            {[
                              course.lessonCount
                                ? `${course.lessonCount} lessons`
                                : null,
                              course.duration
                                ? formatMinutes(course.duration)
                                : null,
                              course.category?.name,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        </div>

                        <ArrowRight
                          size={15}
                          className="shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4 rounded-[16px] border border-line bg-white px-5 py-4">
                <p className="text-[12.5px] text-text-secondary">
                  {catalog.length > 0
                    ? "You are enrolled in every published course."
                    : "New courses will appear here once published."}
                </p>
                <Button as={Link} to="/courses" size="sm" variant="secondary">
                  Catalog
                </Button>
              </div>
            )}
          </section>
        </div>

        {/* Upcoming events rail */}
        <aside className="min-w-0">
          <section>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="section-label">Upcoming events</h2>
              <Link
                to="/events"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-primary"
              >
                Open calendar
                <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            </div>

            <div className="overflow-hidden rounded-[16px] border border-line bg-white">
              <div className="divide-y divide-line">
                {eventsQuery.isLoading &&
                  [0, 1, 2].map((item) => (
                    <div key={item} className="px-4 py-4">
                      <Skeleton className="h-16 w-full rounded-[12px]" />
                    </div>
                  ))}

                {!eventsQuery.isLoading &&
                  events.map((event) => (
                    <Link
                      key={event._id}
                      to={`/events/${event._id}`}
                      className="group block px-4 py-3.5 transition-colors hover:bg-sage/60"
                    >
                      <p className="truncate text-[12.5px] font-medium text-text-primary group-hover:text-primary">
                        {event.title}
                      </p>

                      <p className="mt-1 truncate text-[11px] text-text-muted">
                        {[
                          event.duration ? `${event.duration} min` : null,
                          event.host?.fullname
                            ? `with ${event.host.fullname}`
                            : null,
                          event.location,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>

                      <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-sage px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.06em] text-primary">
                        <CalendarDays size={10} aria-hidden="true" />
                        {scheduleLabel(event.date)}
                      </span>
                    </Link>
                  ))}

                {!eventsQuery.isLoading &&
                  !eventsQuery.isError &&
                  events.length === 0 && (
                    <div className="px-4 py-5">
                      <p className="inline-flex items-center gap-1.5 text-[12px] text-text-muted">
                        <CalendarDays size={13} aria-hidden="true" />
                        No upcoming sessions yet.
                      </p>
                      <Link
                        to="/events"
                        className="mt-2 flex items-center gap-1 text-[12px] font-medium text-primary"
                      >
                        Browse the calendar
                        <ArrowUpRight size={12} aria-hidden="true" />
                      </Link>
                    </div>
                  )}

                {eventsQuery.isError && (
                  <div className="px-4 py-5">
                    <p className="text-[12px] text-text-muted">
                      The calendar could not be loaded.
                    </p>
                    <button
                      type="button"
                      onClick={() => eventsQuery.refetch()}
                      className="mt-1.5 text-[12px] font-medium text-primary hover:underline"
                    >
                      Try again
                    </button>
                  </div>
                )}
              </div>
            </div>

            <Link
              to="/events"
              className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-primary"
            >
              View all events
              <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </section>
        </aside>
      </div>

      <NotesDialog
        open={Boolean(notesFor)}
        onClose={() => setNotesFor(null)}
        enrollmentId={notesFor?.enrollmentId}
        lesson={notesFor?.lesson}
        courseTitle={notesFor?.courseTitle}
      />
    </div>
  );
};

export default DashboardPage;
