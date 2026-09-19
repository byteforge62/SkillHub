import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getCourseById } from "../api/courseApi";

import useMyEnrollments from "@/features/enrollment/hooks/useEnrollment";
import useEnrollInCourse from "@/features/enrollment/hooks/useErollInCourse";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
export const CourseDetailsPage = () => {
  const { courseId } = useParams();

  const {
    data: enrollmentData,
    isLoading: enrollmentsLoading,
  } = useMyEnrollments();

  const enrollMutation = useEnrollInCourse();

  const enrollments = enrollmentData?.data || [];

  const enrollment = enrollments.find(
    (item) =>
      item.courseId?._id === courseId ||
      item.courseId === courseId
  );

  const isEnrolled = enrollment?.status === "active";
  const isCompleted = enrollment?.status === "completed";

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: Boolean(courseId),
  });

  const course = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-6xl animate-pulse space-y-8">
          <div className="h-4 w-32 rounded bg-border" />
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-5">
              <div className="h-5 w-32 rounded bg-border" />
              <div className="h-14 w-4/5 rounded bg-border" />
              <div className="h-20 w-full rounded bg-border" />
            </div>

            <div className="h-96 rounded-2xl bg-surface shadow-card" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Card className="border-error/20">
            <p className="text-sm font-medium text-error">
              Unable to load course
            </p>

            <h1 className="mt-2 text-2xl text-text-primary">
              Something went wrong
            </h1>

            <p className="mt-3 text-sm text-text-muted">
              {error?.response?.data?.message ||
                error?.message ||
                "Something went wrong while loading this course."}
            </p>

            <Link
              to="/courses"
              className="mt-6 inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              ← Back to Courses
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  const categoryName =
    typeof course.category === "object"
      ? course.category?.name
      : course.category;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">

        {/* Back */}
        <Link
          to="/courses"
          className="inline-flex items-center text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
        >
          ← Back to Courses
        </Link>

        {/* Hero */}
        <section className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">

          {/* Course information */}
          <div className="flex flex-col justify-center">
            {categoryName && (
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                {categoryName}
              </p>
            )}

            <h1 className="mt-3 max-w-3xl text-4xl text-text-primary sm:text-5xl lg:text-6xl">
              {course.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-text-muted">
              {course.description}
            </p>

            {/* Metadata */}
            <div className="mt-7 flex flex-wrap gap-3">
              {course.level && (
                <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary">
                  {course.level}
                </span>
              )}

              {course.language && (
                <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary">
                  {course.language}
                </span>
              )}

              {course.duration !== undefined &&
                course.duration !== null && (
                  <span className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-secondary">
                    {course.duration} min
                  </span>
                )}
            </div>
          </div>

          {/* Course card */}
          <Card className="overflow-hidden p-0">
            <div className="aspect-video overflow-hidden bg-surface-hover">
              {course.imageUrl ? (
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-accent-light">
                  <span className="text-5xl">📚</span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-text-muted">
                    Course price
                  </p>

                  <p className="mt-1 text-3xl font-semibold text-text-primary">
                    ${course.price}
                  </p>
                </div>

                {course.duration !== undefined &&
                  course.duration !== null && (
                    <span className="text-sm text-text-muted">
                      {course.duration} min
                    </span>
                  )}
              </div>

              {enrollmentsLoading ? (
                <Button
                  fullWidth
                  disabled
                  className="mt-6"
                >
                  Checking enrollment...
                </Button>
              ) : isEnrolled ? (
                <Link
                  to={`/learning/${courseId}`}
                  className="mt-6 block"
                >
                  <Button fullWidth>
                    Continue Learning
                  </Button>
                </Link>
              ) : isCompleted ? (
                <Link
                  to={`/learning/${courseId}`}
                  className="mt-6 block"
                >
                  <Button
                    fullWidth
                    className="bg-success hover:bg-success/90"
                  >
                    Review Course
                  </Button>
                </Link>
              ) : (
                <Button
                  fullWidth
                  loading={enrollMutation.isPending}
                  disabled={enrollMutation.isPending}
                  onClick={() => enrollMutation.mutate(courseId)}
                  className="mt-6"
                >
                  Enroll & Start Learning
                </Button>
              )}
            </div>
          </Card>
        </section>

        {/* Overview */}
        {course.overview && (
          <section className="mt-14 max-w-4xl">
            <h2 className="text-2xl text-text-primary">
              Course Overview
            </h2>

            <p className="mt-4 leading-7 text-text-muted">
              {course.overview}
            </p>
          </section>
        )}

        {/* Tags */}
        {Array.isArray(course.tags) && course.tags.length > 0 && (
          <section className="mt-12 max-w-4xl">
            <h2 className="text-2xl text-text-primary">
              What you'll learn
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Instructor */}
        {course.createdBy && (
          <section className="mt-12 max-w-4xl">
            <h2 className="text-2xl text-text-primary">
              Instructor
            </h2>

            <Card className="mt-5">
              <p className="font-semibold text-text-primary">
                {course.createdBy.fullname}
              </p>

              {course.createdBy.email && (
                <p className="mt-1 text-sm text-text-muted">
                  {course.createdBy.email}
                </p>
              )}
            </Card>
          </section>
        )}
      </div>
    </div>
  );
};