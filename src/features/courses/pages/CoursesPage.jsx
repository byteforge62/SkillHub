import { CourseGrid } from "../components/CourseGrid";
import useCourses from "../hooks/useCourses";

export const CoursesPage = () => {
  const { data, isLoading, isError, error } = useCourses();

  const courses = data?.data?.courses || [];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
            SkillHub Learning
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Courses
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
            Learn practical skills through structured courses, lessons,
            resources, quizzes, and hands-on learning.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="aspect-video animate-pulse bg-white/5" />

                <div className="space-y-3 p-5">
                  <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-full animate-pulse rounded bg-white/10" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6">
            <h2 className="text-lg font-semibold text-red-300">
              Unable to load courses
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {error?.response?.data?.message ||
                error?.message ||
                "Something went wrong while loading courses."}
            </p>
          </div>
        )}

        {!isLoading && !isError && <CourseGrid courses={courses} />}
      </div>
    </div>
  );
};

