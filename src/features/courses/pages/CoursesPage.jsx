import { CourseGrid } from "../components/CourseGrid";
import useCourses from "../hooks/useCourses";

export const CoursesPage = () => {
  const { data, isLoading, isError, error } = useCourses();

  const courses = data?.data?.courses ?? [];

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {/* Header */}
        <section className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            SkillHub Learning
          </p>

          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Explore Courses
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-text-muted">
            Learn practical skills through structured courses, lessons,
            resources, quizzes, and hands-on learning.
          </p>
        </section>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
              >
                <div className="aspect-video animate-pulse bg-surface-hover" />

                <div className="space-y-3 p-6">
                  <div className="h-3 w-20 animate-pulse rounded bg-border" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-border" />
                  <div className="h-4 w-full animate-pulse rounded bg-border" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-border" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-2xl border border-error/20 bg-surface p-6 shadow-card">
            <h2 className="text-lg font-semibold text-error">
              Unable to load courses
            </h2>

            <p className="mt-2 text-sm text-text-muted">
              {error?.response?.data?.message ||
                error?.message ||
                "Something went wrong while loading courses."}
            </p>
          </div>
        )}

        {/* Courses */}
        {!isLoading && !isError && <CourseGrid courses={courses} />}

        {/* Empty state */}
        {!isLoading && !isError && courses.length === 0 && (
          <div className="rounded-2xl border border-border bg-surface p-10 text-center shadow-card">
            <h2 className="text-xl font-semibold">
              No courses available
            </h2>

            <p className="mt-2 text-sm text-text-muted">
              There are no published courses available right now.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

