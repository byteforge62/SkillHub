import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getCourseById } from "@/features/courses/api/courseApi";
import { getMyEnrollments } from "@/features/enrollment/api/enrollmentApi";

export const LearningPage = () => {
  const { courseId } = useParams();

  const [selectedLesson, setSelectedLesson] = useState(null);

  const {
    data: courseData,
    isLoading: courseLoading,
    isError: courseError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: Boolean(courseId),
  });

  const {
    data: enrollmentData,
    isLoading: enrollmentLoading,
    isError: enrollmentError,
  } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: getMyEnrollments,
  });

  const course = courseData?.data;

  const enrollments = enrollmentData?.data || [];

  const enrollment = useMemo(() => {
    return enrollments.find(
      (item) =>
        item.courseId?._id === courseId ||
        item.courseId === courseId
    );
  }, [enrollments, courseId]);

  useEffect(() => {
    if (!enrollment) return;

    // We will populate this from the course sections/lessons API next.
    setSelectedLesson(null);
  }, [enrollment]);

  if (courseLoading || enrollmentLoading) {
    return (
      <div className="min-h-screen bg-slate-950 px-5 py-10 text-white">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-8 w-64 rounded bg-white/10" />

          <div className="mt-8 grid min-h-[600px] gap-6 lg:grid-cols-[280px_1fr]">
            <div className="rounded-2xl bg-white/5" />
            <div className="rounded-2xl bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  if (courseError || enrollmentError) {
    return (
      <div className="min-h-screen bg-slate-950 px-5 py-10 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
          <h1 className="text-xl font-semibold text-red-300">
            Unable to load learning workspace
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Something went wrong while loading this course.
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

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-slate-950 px-5 py-10 text-white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <h1 className="text-2xl font-bold">
            Enrollment Required
          </h1>

          <p className="mt-3 text-slate-400">
            You need to enroll in this course before you can start
            learning.
          </p>

          <Link
            to={`/courses/${courseId}`}
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
          >
            Go to Course
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="min-w-0">
            <Link
              to="/courses"
              className="text-xs text-slate-500 transition hover:text-slate-300"
            >
              ← Courses
            </Link>

            <h1 className="mt-1 truncate text-lg font-semibold">
              {course.title}
            </h1>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-xs text-slate-500">
              Course Progress
            </p>

            <p className="text-sm font-semibold text-blue-400">
              {enrollment.progress || 0}%
            </p>
          </div>
        </div>
      </header>

      {/* Workspace */}
      <main className="mx-auto grid max-w-7xl gap-6 px-5 py-6 sm:px-8 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-blue-400">
              Course Content
            </p>

            <h2 className="mt-2 font-semibold">
              {course.title}
            </h2>
          </div>

          <div className="p-4">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <p className="text-sm font-medium text-slate-300">
                Sections & Lessons
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Course sections and lessons will appear here.
              </p>
            </div>
          </div>
        </aside>

        {/* Lesson Content */}
        <section className="min-h-[600px] rounded-2xl border border-white/10 bg-white/[0.03]">
          {!selectedLesson ? (
            <div className="flex min-h-[600px] items-center justify-center p-8 text-center">
              <div className="max-w-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl">
                  📚
                </div>

                <h2 className="mt-5 text-2xl font-bold">
                  Start Learning
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Select a lesson from the course content to begin
                  learning.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8">
              <h2 className="text-2xl font-bold">
                {selectedLesson.title}
              </h2>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

