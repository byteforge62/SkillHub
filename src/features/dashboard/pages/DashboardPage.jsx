import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ProgressBar from "@/components/ui/ProgressBar";
import Skeleton from "@/components/ui/Skeleton";

import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import useMyEnrollments from "@/features/enrollment/hooks/useEnrollment";
import useCourses from "@/features/courses/hooks/useCourses";
import { getEvents, rsvpEvent } from "@/features/events/api/eventsApi";
import toolRegistry from "@/features/tools/toolRegistry";

const greetingFor = (hour) => {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const courseOf = (enrollment) =>
  enrollment?.courseId && typeof enrollment.courseId === "object"
    ? enrollment.courseId
    : null;

const eventDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return { weekday: "—", day: "—", time: "" };
  }

  return {
    weekday: new Intl.DateTimeFormat(undefined, { weekday: "short" })
      .format(date)
      .toUpperCase(),
    day: new Intl.DateTimeFormat(undefined, { day: "2-digit" }).format(date),
    time: new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date),
  };
};

const formatMinutes = (minutes) => {
  if (!minutes || minutes <= 0) return "Ready to start";

  if (minutes < 60) return `${minutes} min left`;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  return rest > 0 ? `${hours}h ${rest}m left` : `${hours}h left`;
};

const RailSection = ({ label, action, children }) => (
  <section>
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h2 className="section-label">{label}</h2>
      {action}
    </div>
    {children}
  </section>
);

const SpotlightSkeleton = () => (
  <div className="rounded-[24px] border border-line bg-white p-7">
    <div className="h-3 w-28 rounded bg-sage" />
    <div className="mt-4 h-6 w-2/3 rounded bg-sage" />
    <div className="mt-3 h-3 w-1/2 rounded bg-sage" />
    <div className="mt-6 h-1.5 w-full rounded-full bg-sage" />
    <div className="mt-6 h-10 w-36 rounded-full bg-sage" />
  </div>
);

export const DashboardPage = () => {
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();
  const enrollmentsQuery = useMyEnrollments();
  const coursesQuery = useCourses({ page: 1, limit: 8 });
  const eventsQuery = useQuery({
    queryKey: ["events", "dashboard"],
    queryFn: () => getEvents({ page: 1, limit: 6 }),
  });

  const rsvpMutation = useMutation({
    mutationFn: rsvpEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
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
  const spotlightTotal =
    spotlight?.totalLessons ?? spotlightCourse?.lessonCount ?? 0;
  const spotlightDone = spotlight?.completedLessonsCount ?? 0;
  const spotlightProgress = Math.min(
    100,
    Math.max(0, Math.round(spotlight?.progress ?? 0)),
  );
  const currentLesson =
    spotlight?.currentLesson ?? spotlight?.lastAccessedLesson;
  const instructor =
    spotlightCourse?.createdBy?.fullname || "SkillHub instructor";
  const resumeTo = spotlightCourse?._id
    ? `/learning/${spotlightCourse._id}`
    : "/learning";

  const lessonsComplete = enrollments.reduce(
    (total, item) => total + (item.completedLessonsCount ?? 0),
    0,
  );
  const minutesRemaining = active.reduce(
    (total, item) => total + (item.minutesRemaining ?? 0),
    0,
  );
  const averageProgress = active.length
    ? Math.round(
        active.reduce((total, item) => total + (item.progress || 0), 0) /
          active.length,
      )
    : 0;

  const enrolledCourseIds = new Set(
    enrollments.map((item) =>
      String(courseOf(item)?._id ?? item.courseId ?? ""),
    ),
  );
  const catalog = coursesQuery.data?.data?.courses ?? [];
  const curated = catalog
    .filter((course) => !enrolledCourseIds.has(String(course._id)))
    .slice(0, 4);

  const events = (eventsQuery.data?.data ?? [])
    .filter((event) => new Date(event.date) > new Date())
    .slice(0, 4);

  const tools = toolRegistry.slice(0, 4);
  const firstName = (user?.fullname || "").split(" ")[0];
  const today = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div className="pb-4">
      <header className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-label">{today}</p>
          <h1 className="mt-2 text-[22px] font-semibold leading-[1.3] tracking-[-0.02em]">
            {greetingFor(new Date().getHours())}, {firstName || "Learner"}
          </h1>
        </div>

        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-text-muted">
          <span>
            <span className="font-medium text-text-primary">{active.length}</span>{" "}
            active
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <span className="font-medium text-text-primary">
              {lessonsComplete}
            </span>{" "}
            lessons complete
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <span className="font-medium text-text-primary">
              {completed.length}
            </span>{" "}
            finished
          </span>
          <span aria-hidden="true">·</span>
          <span>{averageProgress}% average</span>
        </p>
      </header>

      <div className="editorial-split mt-8">
        {/* 65% — main column */}
        <div className="min-w-0 space-y-10">
          <section>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="section-label">Continue learning</h2>
              {spotlight && (
                <Badge variant="success" size="sm" dot>
                  In progress
                </Badge>
              )}
            </div>

            {enrollmentsQuery.isLoading ? (
              <SpotlightSkeleton />
            ) : spotlight ? (
              <article className="rounded-[24px] border border-line bg-white p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[11.5px] text-text-muted">
                      {spotlightCourse?.category?.name || "Track"}
                      {spotlightCourse?.level
                        ? ` · ${spotlightCourse.level}`
                        : ""}
                    </p>

                    <h3 className="mt-1.5 text-[19px] font-semibold leading-[1.3] tracking-[-0.02em]">
                      {spotlightCourse?.title || "Your current course"}
                    </h3>

                    <p className="mt-1.5 text-[13px] text-text-secondary">
                      {currentLesson
                        ? `Chapter ${currentLesson.index} · ${
                            currentLesson.sectionTitle || currentLesson.title
                          }`
                        : "Pick up where you left off"}
                      <span className="text-text-muted"> · {instructor}</span>
                    </p>
                  </div>

                  <Button as={Link} to={resumeTo} size="sm" iconRight={ArrowRight}>
                    Resume lesson
                  </Button>
                </div>

                <div className="mt-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[12.5px] text-text-secondary">
                      <span className="font-medium text-text-primary">
                        {spotlightDone} of {spotlightTotal}
                      </span>{" "}
                      lessons complete
                    </p>
                    <p className="text-[12.5px] font-semibold tabular-nums text-text-primary">
                      {spotlightProgress}%
                    </p>
                  </div>

                  <ProgressBar value={spotlightProgress} className="mt-2.5" />

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12} aria-hidden="true" />
                      {formatMinutes(spotlight.minutesRemaining)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen size={12} aria-hidden="true" />
                      {spotlightCourse?.sectionCount ?? 0} sections
                    </span>
                    {currentLesson?.title && (
                      <span className="truncate">
                        Next:{" "}
                        <span className="text-text-secondary">
                          {currentLesson.title}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ) : (
              <EmptyState
                icon={BookOpen}
                title="No active track yet"
                description="Enrol in a course and your next chapter will wait here."
                action={
                  <Button
                    as={Link}
                    to="/courses"
                    size="sm"
                    iconRight={ArrowUpRight}
                  >
                    Explore catalog
                  </Button>
                }
              />
            )}
          </section>

          {active.length > 1 && (
            <section>
              <RailSection
                label="My tracks"
                action={
                  <Link
                    to="/learning"
                    className="inline-flex items-center gap-1 text-[12px] font-medium text-primary"
                  >
                    All tracks
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </Link>
                }
              />

              <div className="overflow-hidden rounded-[16px] border border-line bg-white">
                <div className="divide-y divide-line">
                  {active.slice(1, 5).map((enrollment) => {
                    const course = courseOf(enrollment);
                    const progress = Math.min(
                      100,
                      Math.max(0, Math.round(enrollment.progress || 0)),
                    );

                    return (
                      <Link
                        key={enrollment._id}
                        to={
                          course?._id ? `/learning/${course._id}` : "/learning"
                        }
                        className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-sage/60"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13.5px] font-medium text-text-primary">
                            {course?.title || "Course"}
                          </p>
                          <p className="mt-0.5 truncate text-[11.5px] text-text-muted">
                            {enrollment.completedLessonsCount ?? 0} of{" "}
                            {enrollment.totalLessons ??
                              course?.lessonCount ??
                              0}{" "}
                            lessons
                            {course?.createdBy?.fullname
                              ? ` · ${course.createdBy.fullname}`
                              : ""}
                          </p>
                        </div>

                        <span className="hidden w-28 shrink-0 sm:block">
                          <ProgressBar value={progress} size="sm" />
                        </span>

                        <span className="w-10 shrink-0 text-right text-[12px] font-medium tabular-nums text-text-secondary">
                          {progress}%
                        </span>

                        <ArrowRight
                          size={14}
                          className="shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden="true"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          <section>
            <RailSection
              label="Curated for your path"
              action={
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-primary"
                >
                  View all
                  <ArrowUpRight size={12} aria-hidden="true" />
                </Link>
              }
            />

            {coursesQuery.isLoading ? (
              <div className="space-y-2">
                {[0, 1, 2].map((item) => (
                  <Skeleton key={item} className="h-16 rounded-[12px]" />
                ))}
              </div>
            ) : curated.length > 0 ? (
              <div className="overflow-hidden rounded-[16px] border border-line bg-white">
                <div className="divide-y divide-line">
                  {curated.map((course) => (
                    <Link
                      key={course._id}
                      to={`/courses/${course._id}`}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-sage/60"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13.5px] font-medium text-text-primary">
                          {course.title}
                        </p>
                        <p className="mt-0.5 truncate text-[11.5px] text-text-muted">
                          {[
                            course.createdBy?.fullname,
                            course.level,
                            course.duration ? `${course.duration} min` : null,
                          ]
                            .filter(Boolean)
                            .join(" · ") || "Self-paced track"}
                        </p>
                      </div>

                      <span className="hidden shrink-0 text-[11.5px] text-text-muted sm:block">
                        {course.lessonCount ?? 0} lessons
                      </span>

                      <span className="shrink-0 text-[12px] font-medium text-primary">
                        View
                      </span>
                    </Link>
                  ))}
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

        {/* 35% — context rail */}
        <aside className="min-w-0 space-y-9 lg:sticky lg:top-[96px]">
          <RailSection
            label="Upcoming events"
            action={
              <Link
                to="/events"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-primary"
              >
                Calendar
                <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            }
          >
            <div className="overflow-hidden rounded-[16px] border border-line bg-white">
              <div className="divide-y divide-line">
                {eventsQuery.isLoading &&
                  [0, 1, 2].map((item) => (
                    <div key={item} className="px-4 py-4">
                      <Skeleton className="h-10 w-full rounded-[12px]" />
                    </div>
                  ))}

                {!eventsQuery.isLoading &&
                  events.map((event) => {
                    const date = eventDate(event.date);
                    const isRegistered = Boolean(
                      event.isRegistered ||
                        (rsvpMutation.data?.data?._id === event._id &&
                          rsvpMutation.data?.data?.isRegistered),
                    );

                    return (
                      <div
                        key={event._id}
                        className="flex items-start gap-3 px-4 py-3.5"
                      >
                        <span className="flex h-11 w-10 shrink-0 flex-col items-center justify-center rounded-[12px] bg-sage text-primary">
                          <span className="text-[9px] font-medium leading-none">
                            {date.weekday}
                          </span>
                          <span className="mt-0.5 text-[14px] font-semibold leading-none tracking-[-0.02em]">
                            {date.day}
                          </span>
                        </span>

                        <div className="min-w-0 flex-1">
                          <Link
                            to={`/events/${event._id}`}
                            className="block truncate text-[12.5px] font-medium text-text-primary hover:text-primary"
                          >
                            {event.title}
                          </Link>
                          <p className="mt-0.5 truncate text-[11px] text-text-muted">
                            {date.time}
                            {event.host?.fullname
                              ? ` · ${event.host.fullname}`
                              : ""}
                            {event.duration ? ` · ${event.duration} min` : ""}
                          </p>

                          {event.seatsLeft !== null &&
                            event.seatsLeft !== undefined && (
                              <p className="mt-0.5 text-[10.5px] text-text-muted">
                                {event.seatsLeft} seats left
                              </p>
                            )}
                        </div>

                        <button
                          type="button"
                          onClick={() => rsvpMutation.mutate(event._id)}
                          disabled={rsvpMutation.isPending}
                          className={[
                            "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors disabled:opacity-60",
                            isRegistered
                              ? "bg-success-soft text-success"
                              : "bg-sage text-primary hover:bg-sage-soft",
                          ].join(" ")}
                        >
                          {isRegistered ? "Going" : "RSVP"}
                        </button>
                      </div>
                    );
                  })}

                {!eventsQuery.isLoading && events.length === 0 && (
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
              </div>
            </div>

            {rsvpMutation.isError && (
              <p className="mt-2 inline-flex items-center gap-1.5 text-[11.5px] text-error">
                <RefreshCw size={11} aria-hidden="true" />
                {rsvpMutation.error?.response?.data?.message ||
                  "Could not update your RSVP."}
              </p>
            )}
          </RailSection>

          <RailSection
            label="Quick tools"
            action={
              <span className="text-[11px] text-text-muted">
                <kbd className="rounded border border-line bg-white px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </span>
            }
          >
            <div className="grid grid-cols-2 gap-2">
              {tools.map((tool) => (
                <Link
                  key={tool.id}
                  to={`/tools/${tool.id}`}
                  className="group flex flex-col gap-1 rounded-[12px] border border-line bg-white px-3 py-3 transition-colors hover:border-primary/30 hover:bg-sage/60"
                >
                  <span className="truncate text-[12.5px] font-medium text-text-primary">
                    {tool.name}
                  </span>
                  <span className="flex items-center justify-between text-[10.5px] text-text-muted">
                    Open
                    <ArrowUpRight
                      size={11}
                      className="transition-transform group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </RailSection>

          <section className="rounded-[16px] bg-sage px-5 py-5">
            <h2 className="section-label">Weekly rhythm</h2>
            <p className="mt-2 text-[13px] leading-[1.55] text-text-secondary">
              {active.length > 0 ? (
                <>
                  <span className="font-medium text-text-primary">
                    {lessonsComplete} lessons
                  </span>{" "}
                  completed across {active.length}{" "}
                  {active.length === 1 ? "track" : "tracks"}
                  {minutesRemaining > 0
                    ? `, ${formatMinutes(minutesRemaining).replace(
                        " left",
                        " of material remaining",
                      )}.`
                    : "."}
                </>
              ) : (
                <>
                  Start a track and this rail will track your pace, lessons and
                  remaining reading time.
                </>
              )}
            </p>

            {active.length > 0 && (
              <div className="mt-4 flex items-center gap-2 text-[11.5px] text-text-muted">
                <CheckCircle2
                  size={13}
                  className="text-success"
                  aria-hidden="true"
                />
                {averageProgress}% average across active tracks
              </div>
            )}

            <Link
              to="/learning"
              className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-primary"
            >
              <Sparkles size={12} aria-hidden="true" />
              Open my learning
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default DashboardPage;
