import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getMyEnrollments } from "../api/enrollmentApi";

const statusLabel = (status) => {
  if (status === "completed") return "Completed";
  if (status === "active") return "In progress";
  if (status === "dropped") return "Dropped";
  return "Unavailable";
};

export const MyLearningPage = () => {
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
  const activeCount = enrollments.filter(
    (enrollment) => enrollment.status === "active",
  ).length;
  const completedCount = enrollments.filter(
    (enrollment) => enrollment.status === "completed",
  ).length;

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Your courses
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          My learning
        </h1>
        <p className="mt-3 text-sm leading-6 text-text-muted">
          Continue where you left off and review your completed courses.
        </p>
      </header>

      {!isLoading && !isError && (
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-text-secondary">
          <p>
            <span className="font-semibold text-text-primary">{activeCount}</span>{" "}
            in progress
          </p>
          <p>
            <span className="font-semibold text-text-primary">
              {completedCount}
            </span>{" "}
            completed
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2" role="status">
          {[0, 1].map((item) => (
            <div
              key={item}
              className="h-52 animate-pulse rounded-xl bg-surface-hover"
            />
          ))}
          <span className="sr-only">Loading your enrollments...</span>
        </div>
      ) : isError ? (
        <Card className="mt-6">
          <p className="text-sm text-error" role="alert">
            Your courses could not be loaded.
          </p>
          <Button
            className="mt-4"
            variant="secondary"
            size="sm"
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </Card>
      ) : enrollments.length === 0 ? (
        <Card className="mt-6">
          <p className="text-sm text-text-muted">
            You have not enrolled in a course yet.
          </p>
          <Link
            to="/courses"
            className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            Explore courses
          </Link>
        </Card>
      ) : (
        <section
          className="mt-6 grid gap-4 sm:grid-cols-2"
          aria-label="Enrolled courses"
        >
          {enrollments.map((enrollment) => {
            const course = enrollment.courseId;
            const progress = Math.min(100, Math.max(0, enrollment.progress || 0));

            return (
              <Card key={enrollment._id} className="flex h-full flex-col">
                {course?.imageUrl && (
                  <img
                    src={course.imageUrl}
                    alt=""
                    className="mb-4 h-40 w-full rounded-lg object-cover"
                  />
                )}
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold">
                    {course?.title || "Course unavailable"}
                  </h2>
                  <span className="shrink-0 rounded-full bg-surface-hover px-2.5 py-1 text-xs font-medium text-text-secondary">
                    {statusLabel(enrollment.status)}
                  </span>
                </div>
                {enrollment.status !== "dropped" && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-text-muted">
                      <span>Course progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div
                      className="mt-2 h-2 overflow-hidden rounded-full bg-surface-hover"
                      role="progressbar"
                      aria-label={`${course?.title || "Course"} progress`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={progress}
                    >
                      <div
                        className="h-full rounded-full bg-primary transition-[width]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {course?._id && enrollment.status !== "dropped" && (
                  <Link
                    to={`/learning/${course._id}`}
                    className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline"
                  >
                    {enrollment.status === "completed"
                      ? "Review course"
                      : "Continue learning"}
                  </Link>
                )}
              </Card>
            );
          })}
        </section>
      )}
    </div>
  );
};
