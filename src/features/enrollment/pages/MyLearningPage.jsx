import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, RefreshCw, Sparkles } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
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

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: getMyEnrollments,
  });

  const enrollments = response?.data || [];

  const activeCount = enrollments.filter((item) => item.status === "active").length;
  const completedCount = enrollments.filter((item) => item.status === "completed").length;

  const visible = useMemo(
    () => (filter === "all" ? enrollments : enrollments.filter((item) => item.status === filter)),
    [enrollments, filter],
  );

  return (
    <div>
      <PageHeader
        title="My learning"
        description="Every course you've enrolled in, with the progress the platform has recorded."
        action={
          <Button as={Link} to="/courses" variant="secondary" size="sm">
            Find another course
          </Button>
        }
      />

      {!isLoading && !isError && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <div className="flex gap-1 rounded-full border border-[color:var(--color-line)] bg-white p-1">
            {FILTERS.map((item) => {
              const isActive = filter === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(item.value)}
                  className={[
                    "relative h-8 rounded-full px-3.5 text-[12px] font-medium transition-colors",
                    isActive ? "text-white" : "text-text-secondary hover:text-primary",
                  ].join(" ")}
                >
                  {isActive && (
                    <motion.span
                      layoutId="learning-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          <span className="text-[12px] text-text-muted">
            {activeCount} in progress · {completedCount} completed
          </span>
        </div>
      )}

      <div className="mt-6">
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2" role="status">
            {[0, 1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-56 rounded-3xl" />
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
          <section
            className="grid gap-4 sm:grid-cols-2"
            aria-label="Enrolled courses"
          >
            {visible.map((enrollment) => {
              const course =
                typeof enrollment.courseId === "object" ? enrollment.courseId : null;
              const progress = Math.min(100, Math.max(0, enrollment.progress || 0));
              const badge = statusBadge(enrollment.status);
              const isDropped = enrollment.status === "dropped";

              return (
                <Card key={enrollment._id} className="flex h-full flex-col">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-sage">
                      {course?.imageUrl ? (
                        <img
                          src={course.imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-primary">
                          <BookOpen size={18} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <Badge variant={badge.variant} size="sm">
                        {badge.label}
                      </Badge>
                      <h3 className="mt-2 line-clamp-2 text-[15px] font-semibold leading-6 tracking-[-0.02em] text-text-primary">
                        {course?.title || "Course unavailable"}
                      </h3>
                    </div>
                  </div>

                  {!isDropped && (
                    <div className="mt-5 flex-1">
                      <ProgressBar value={progress} label="Progress" showValue size="sm" />
                    </div>
                  )}

                  {course?._id && !isDropped && (
                    <Button
                      as={Link}
                      to={`/learning/${course._id}`}
                      variant="secondary"
                      size="sm"
                      className="mt-4 w-fit"
                      iconRight={ArrowRight}
                    >
                      {enrollment.status === "completed" ? "Review course" : "Continue"}
                    </Button>
                  )}
                </Card>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
};

export default MyLearningPage;
