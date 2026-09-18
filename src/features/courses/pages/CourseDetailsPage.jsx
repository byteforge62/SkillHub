import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "../api/courseApi";

import useMyEnrollments from "@/features/enrollment/hooks/useEnrollment";
import useEnrollInCourse from "@/features/enrollment/hooks/useErollInCourse";

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
      <div className="min-h-screen bg-slate-950 px-5 py-10 text-white">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-10 w-2/3 rounded bg-white/10" />
          <div className="h-5 w-1/2 rounded bg-white/10" />
          <div className="h-64 rounded-2xl bg-white/10" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-950 px-5 py-10 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
          <h1 className="text-xl font-semibold text-red-300">
            Unable to load course
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            {error?.response?.data?.message ||
              error?.message ||
              "Something went wrong while loading this course."}
          </p>

          <Link
            to="/courses"
            className="mt-5 inline-flex rounded-lg bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/15"
          >
            ← Back to Courses
          </Link>
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
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10">
        {/* Back */}
        <Link
          to="/courses"
          className="mb-8 inline-flex items-center text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to Courses
        </Link>

        {/* Hero */}
        <section className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          {/* Course information */}
          <div>
            {categoryName && (
              <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
                {categoryName}
              </p>
            )}

            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              {course.title}
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-400">
              {course.description}
            </p>

            {/* Metadata */}
            <div className="mt-6 flex flex-wrap gap-3">
              {course.level && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                  {course.level}
                </span>
              )}

              {course.language && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                  {course.language}
                </span>
              )}

              {course.duration !== undefined && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                  {course.duration} min
                </span>
              )}
            </div>
          </div>

          {/* Course Card */}
          <aside className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="aspect-video overflow-hidden bg-slate-900">
              {course.imageUrl ? (
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                  <span className="text-5xl">📚</span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-slate-500">Course price</p>

                  <p className="mt-1 text-3xl font-bold">
                    ${course.price}
                  </p>
                </div>

                <span className="text-sm text-slate-500">
                  {course.duration} min
                </span>
              </div>

              {enrollmentsLoading ? (
                <button
                  type="button"
                  disabled
                  className="mt-6 w-full cursor-not-allowed rounded-xl bg-white/10 px-5 py-3 font-semibold text-slate-400"
                >
                  Checking enrollment...
                </button>
              ) : isEnrolled ? (
                <Link
                  to={`/learning/${courseId}`}
                  className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
                >
                  Continue Learning
                </Link>
              ) : isCompleted ? (
                <Link
                  to={`/learning/${courseId}`}
                  className="mt-6 flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-3 font-semibold transition hover:bg-green-500"
                >
                  Review Course
                </Link>
              ) : (
                <button
                  type="button"
                  disabled={enrollMutation.isPending}
                  onClick={() => enrollMutation.mutate(courseId)}
                  className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {enrollMutation.isPending
                    ? "Enrolling..."
                    : "Enroll & Start Learning"}
                </button>
              )}
            </div>
          </aside>
        </section>

        {/* Overview */}
        {course.overview && (
          <section className="mt-12 max-w-4xl">
            <h2 className="text-2xl font-bold">
              Course Overview
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              {course.overview}
            </p>
          </section>
        )}

        {/* Tags */}
        {Array.isArray(course.tags) && course.tags.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-semibold">
              What you'll learn
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

