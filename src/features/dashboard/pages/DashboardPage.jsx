import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Sparkles,
  Target,
  Trophy,
  Wrench,
} from "lucide-react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import ProgressBar from "@/components/ui/ProgressBar";
import Skeleton from "@/components/ui/Skeleton";
import { formatEventDate } from "@/features/events/utils/eventDate";
import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
import useMyEnrollments from "@/features/enrollment/hooks/useEnrollment";
import useCourses from "@/features/courses/hooks/useCourses";
import { getEvents } from "@/features/events/api/eventsApi";
import toolRegistry from "@/features/tools/toolRegistry";

const greetingFor = (hour) => {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const courseOf = (enrollment) =>
  typeof enrollment.courseId === "object" ? enrollment.courseId : null;

const StatTile = ({ icon: Icon, value, label, hint }) => (
  <div className="rounded-3xl border border-[color:var(--color-line)] bg-white p-5 shadow-[var(--shadow-card)]">
    <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sage text-primary">
      <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
    </span>
    <p className="mt-4 text-[26px] font-bold leading-none tracking-[-0.04em] text-text-primary">
      {value}
    </p>
    <p className="mt-1.5 text-[12.5px] font-medium text-text-secondary">{label}</p>
    {hint && <p className="mt-0.5 text-[11.5px] text-text-muted">{hint}</p>}
  </div>
);

export const DashboardPage = () => {
  const { data: user } = useCurrentUser();
  const enrollmentsQuery = useMyEnrollments();
  const coursesQuery = useCourses({ page: 1, limit: 6 });
  const eventsQuery = useQuery({
    queryKey: ["events", "dashboard"],
    queryFn: () => getEvents({ page: 1, limit: 3 }),
  });

  const enrollments = enrollmentsQuery.data?.data || [];
  const active = enrollments.filter((item) => item.status === "active");
  const completed = enrollments.filter((item) => item.status === "completed");
  const averageProgress = active.length
    ? Math.round(
        active.reduce((total, item) => total + (item.progress || 0), 0) / active.length,
      )
    : 0;

  const continueLearning = [...active]
    .sort((a, b) => (b.progress || 0) - (a.progress || 0))
    .slice(0, 3);

  const enrolledCourseIds = new Set(
    enrollments.map((item) => String(courseOf(item)?._id ?? item.courseId ?? "")),
  );
  const catalog = coursesQuery.data?.data?.courses ?? [];
  const recommended = catalog
    .filter((course) => !enrolledCourseIds.has(String(course._id)))
    .slice(0, 3);

  const events = eventsQuery.data?.data || [];
  const tools = toolRegistry.slice(0, 4);
  const firstName = (user?.fullname || "").split(" ")[0];
  const today = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
            {today}
          </p>
          <h1 className="mt-3 text-[clamp(1.9rem,3.4vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.04em]">
            {greetingFor(new Date().getHours())}
            {firstName ? `, ${firstName}` : ""}
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-7 text-text-secondary">
            Your courses, progress and what's coming up next — all in one place.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Button as={Link} to="/courses" size="sm" iconRight={ArrowRight}>
            Browse courses
          </Button>
          <Button as={Link} to="/learning" variant="secondary" size="sm">
            My learning
          </Button>
        </div>
      </header>

      <section aria-label="Your numbers" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          icon={BookOpen}
          value={active.length}
          label="Courses in progress"
          hint={active.length ? "Keep the momentum" : "Nothing started yet"}
        />
        <StatTile
          icon={GraduationCap}
          value={completed.length}
          label="Courses completed"
          hint={completed.length ? "Nice work" : "Finish your first course"}
        />
        <StatTile
          icon={Target}
          value={`${averageProgress}%`}
          label="Average progress"
          hint="Across active courses"
        />
        <StatTile
          icon={Trophy}
          value={user?.points ?? 0}
          label="Points earned"
          hint={`${user?.achievements?.length || 0} achievements`}
        />
      </section>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <section aria-label="Continue learning">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[17px] font-bold tracking-[-0.025em]">Continue learning</h2>
            <Link
              to="/learning"
              className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-primary hover:underline"
            >
              All courses
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-3.5 space-y-2.5">
            {enrollmentsQuery.isLoading &&
              [0, 1, 2].map((item) => (
                <Skeleton key={item} className="h-[92px] w-full rounded-3xl" />
              ))}

            {enrollmentsQuery.isError && (
              <Card>
                <p className="text-[13.5px] text-error" role="alert">
                  Your enrollments could not be loaded.
                </p>
                <Button
                  className="mt-3"
                  variant="secondary"
                  size="sm"
                  onClick={() => enrollmentsQuery.refetch()}
                >
                  Try again
                </Button>
              </Card>
            )}

            {!enrollmentsQuery.isLoading &&
              !enrollmentsQuery.isError &&
              continueLearning.length === 0 && (
                <EmptyState
                  icon={Sparkles}
                  title="No course in progress"
                  description="Enrol in a course from the catalog and it will show up here with your progress."
                  className="px-6 py-10"
                  action={
                    <Button as={Link} to="/courses" size="sm">
                      Explore the catalog
                    </Button>
                  }
                />
              )}

            {continueLearning.map((enrollment) => {
              const course = courseOf(enrollment);
              const progress = Math.min(100, Math.max(0, enrollment.progress || 0));

              return (
                <Link
                  key={enrollment._id}
                  to={course?._id ? `/learning/${course._id}` : "/learning"}
                  className="group flex items-center gap-4 rounded-3xl border border-[color:var(--color-line)] bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-[var(--shadow-card)]"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-sage">
                    {course?.imageUrl ? (
                      <img
                        src={course.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-primary">
                        <BookOpen size={20} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[14.5px] font-semibold tracking-[-0.01em] text-text-primary">
                      {course?.title || "Course unavailable"}
                    </h3>

                    <div className="mt-2 flex items-center gap-3">
                      <ProgressBar value={progress} size="sm" className="max-w-[220px]" />
                      <span className="shrink-0 text-[11.5px] font-semibold text-primary">
                        {progress}%
                      </span>
                    </div>
                  </div>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-line)] text-text-muted transition-colors group-hover:border-primary/30 group-hover:bg-sage group-hover:text-primary">
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section aria-label="Upcoming events">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[17px] font-bold tracking-[-0.025em]">Upcoming events</h2>
            <Link
              to="/events"
              className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-primary hover:underline"
            >
              All events
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-3.5 space-y-2.5">
            {eventsQuery.isLoading && <Skeleton className="h-40 w-full rounded-3xl" />}

            {!eventsQuery.isLoading && events.length === 0 && (
              <Card variant="sage">
                <CalendarDays
                  size={20}
                  className="text-primary"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
                <p className="mt-3 text-[14px] font-semibold text-primary">
                  Nothing scheduled
                </p>
                <p className="mt-1 text-[12.5px] leading-6 text-text-secondary">
                  Workshops appear here once a host publishes them.
                </p>
              </Card>
            )}

            {events.map((event) => (
              <Link
                key={event._id}
                to={`/events/${event._id}`}
                className="group block rounded-3xl border border-[color:var(--color-line)] bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-[var(--shadow-card)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
                  {formatEventDate(event.date)}
                </p>
                <h3 className="mt-1.5 line-clamp-2 text-[14px] font-semibold leading-6 tracking-[-0.01em] text-text-primary">
                  {event.title}
                </h3>
                <p className="mt-1 truncate text-[11.5px] text-text-muted">{event.location}</p>
              </Link>
            ))}
          </div>

          <Card variant="forest" className="mt-3 rounded-3xl p-5">
            <h3 className="text-[13.5px] font-semibold tracking-[-0.01em] text-text-on-dark">
              Practice what you learn
            </h3>
            <p className="mt-1 text-[12px] leading-5 text-text-on-dark-secondary">
              Seven browser tools, no setup required.
            </p>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    to={`/tools/${tool.id}`}
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11.5px] font-medium text-text-on-dark transition-colors hover:bg-white/15"
                  >
                    <Wrench size={10} aria-hidden="true" />
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>

      <section aria-label="Recommended courses">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[17px] font-bold tracking-[-0.025em]">Recommended next</h2>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-primary hover:underline"
          >
            Course catalog
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-3.5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {coursesQuery.isLoading &&
            [0, 1, 2].map((item) => <Skeleton key={item} className="h-32 rounded-3xl" />)}

          {!coursesQuery.isLoading && recommended.length === 0 && (
            <p className="text-[13px] text-text-muted sm:col-span-2 xl:col-span-3">
              {catalog.length
                ? "You're already enrolled in every available course."
                : "No courses are published right now."}
            </p>
          )}

          {recommended.map((course) => {
            const categoryName =
              typeof course.category === "object" ? course.category?.name : course.category;

            return (
              <Link
                key={course._id}
                to={`/courses/${course._id}`}
                className="group flex flex-col rounded-3xl border border-[color:var(--color-line)] bg-white p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-hover)]"
              >
                {categoryName && (
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary">
                    {categoryName}
                  </p>
                )}
                <h3 className="mt-2 line-clamp-2 text-[15px] font-semibold leading-6 tracking-[-0.02em] text-text-primary">
                  {course.title}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-[12.5px] leading-6 text-text-muted">
                  {course.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-primary">
                  View course
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
