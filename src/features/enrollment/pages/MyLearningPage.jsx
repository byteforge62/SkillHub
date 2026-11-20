import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight, BookOpen, RefreshCw, Sparkles } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import ProgressBar from "@/components/ui/ProgressBar";
import Skeleton from "@/components/ui/Skeleton";

import { getMyEnrollments } from "../api/enrollmentApi";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "In progress" },
  { value: "completed", label: "Completed" },
];

const statusBadge = (status) => {
  if (status === "completed") return { variant: "success", label: "Completed" };
  if (status === "active") return { variant: "sage", label: "In progress" };
  if (status === "dropped") return { variant: "neutral", label: "Dropped" };
  return { variant: "neutral", label: "Unavailable" };
};

export const MyLearningPage = () => {
  const [filter, setFilter] = useState("all");

  const { data: response, isLoading, isError, refetch } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: getMyEnrollments,
  });

  const enrollments = response?.data ?? [];

  const activeCount = enrollments.filter((item) => item.status === "active").length;
  const completedCount = enrollments.filter(
    (item) => item.status === "completed",
  ).length;
  const lessonsComplete = enrollments.reduce(
    (total, item) => total + (item.completedLessonsCount ?? 0),
    0,
  );

  const visible = useMemo(
    () =>
      filter === "all"
        ? enrollments
        : enrollments.filter((item) => item.status === filter),
    [enrollments, filter],
  );

  return (
    <div>
      <PageHeader
        eyebrow="Workspace"
        title="My learning"
        description="Every track you have joined, with the progress the platform has recorded."
        action={
          <Button as={Link} to="/courses" variant="secondary" size="sm">
            Find a course
          </Button>
        }
      />

      <div className="editorial-split mt-7">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex gap-1 rounded-full border border-line bg-white p-1">
              {FILTERS.map((item) => {
                const isActive = filter === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setFilter(item.value)}
                    className={[
                      "h-8 rounded-full px-3.5 text-[12.5px] font-medium transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:bg-sage hover:text-primary",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {!isLoading && !isError && (
              <span className="text-[11.5px] text-text-muted">
                {activeCount} in progress · {completedCount} completed
              </span>
            )}
          </div>

          <div className="mt-5">
            {isLoading && (
              <div className="space-y-2" role="status">
                {[0, 1, 2, 3].map((item) => (
                  <Skeleton key={item} className="h-20 rounded-[16px]" />
                ))}
                <span className="sr-only">Loading your enrollments...</span>
              </div>
            )}

            {isError && (
              <EmptyState
                tone="error"
                icon={RefreshCw}
                title="Your courses couldn't be loaded"
                description="We could not reach your enrollments. Try again in a moment."
                action={
                  <Button variant="secondary" onClick={() => refetch()}>
                    Try again
                  </Button>
                }
              />
            )}

            {!isLoading && !isError && enrollments.length === 0 && (
              <EmptyState
                icon={Sparkles}
                title="You haven't enrolled yet"
                description="Pick a course from the catalog and your progress will be tracked here, lesson by lesson."
                action={
                  <Button as={Link} to="/courses">
                    Explore courses
                  </Button>
                }
              />
            )}

            {!isLoading && !isError && enrollments.length > 0 && visible.length === 0 && (
              <EmptyState
                icon={BookOpen}
                title="Nothing in this view"
                description="No course matches this filter yet."
                action={
                  <Button variant="secondary" onClick={() => setFilter("all")}>
                    Show all courses
                  </Button>
                }
              />
            )}

            {!isLoading && !isError && visible.length > 0 && (
              <div className="overflow-hidden rounded-[16px] border border-line bg-white">
                <div className="divide-y divide-line">
                  {visible.map((enrollment) => {
                    const course =
                      typeof enrollment.courseId === "object"
                        ? enrollment.courseId
                        : null;
                    const progress = Math.min(
                      100,
                      Math.max(0, enrollment.progress || 0),
                    );
                    const badge = statusBadge(enrollment.status);
                    const isDropped = enrollment.status === "dropped";
                    const total =
                      enrollment.totalLessons ?? course?.lessonCount ?? 0;
                    const done = enrollment.completedLessonsCount ?? 0;
                    const current = enrollment.currentLesson;

                    return (
                      <div
                        key={enrollment._id}
                        className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-sage/60 sm:flex-row sm:items-center"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="truncate text-[14px] font-semibold tracking-[-0.01em] text-text-primary">
                              {course?.title || "Course unavailable"}
                            </h2>
                            <Badge variant={badge.variant} size="sm">
                              {badge.label}
                            </Badge>
                          </div>

                          <p className="mt-1 truncate text-[11.5px] text-text-muted">
                            {[
                              course?.createdBy?.fullname,
                              course?.level,
                              current?.sectionTitle
                                ? `Chapter ${current.index} · ${current.sectionTitle}`
                                : null,
                            ]
                              .filter(Boolean)
                              .join(" · ") || "Course record"}
                          </p>

                          {!isDropped && (
                            <div className="mt-3 flex items-center gap-3 sm:max-w-md">
                              <ProgressBar value={progress} size="sm" className="flex-1" />
                              <span className="shrink-0 text-[11.5px] tabular-nums text-text-muted">
                                {done}/{total || "—"}
                              </span>
                            </div>
                          )}
                        </div>

                        {course?._id && !isDropped && (
                          <Button
                            as={Link}
                            to={`/learning/${course._id}`}
                            variant="secondary"
                            size="sm"
                            className="w-fit shrink-0"
                            iconRight={ArrowRight}
                          >
                            {enrollment.status === "completed"
                              ? "Review"
                              : "Continue"}
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="space-y-8">
          <section className="rounded-[16px] border border-line bg-white px-5 py-5">
            <h2 className="section-label">This workspace</h2>

            <dl className="mt-4 space-y-3">
              {[
                { label: "Active tracks", value: activeCount },
                { label: "Completed tracks", value: completedCount },
                { label: "Lessons finished", value: lessonsComplete },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline justify-between gap-3 border-b border-line pb-2.5 last:border-0 last:pb-0"
                >
                  <dt className="text-[12.5px] text-text-secondary">{stat.label}</dt>
                  <dd className="text-[15px] font-semibold tabular-nums text-text-primary">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-[16px] bg-sage px-5 py-5">
            <h2 className="section-label">Keep the rhythm</h2>
            <p className="mt-2 text-[13px] leading-[1.55] text-text-secondary">
              Short sittings beat long gaps. Finish one chapter, then step into a
              tool to put the idea to work.
            </p>
            <Link
              to="/courses"
              className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-primary"
            >
              Browse the catalogue
              <ArrowUpRight size={12} aria-hidden="true" />
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default MyLearningPage;
