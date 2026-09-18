import { CourseCard } from "./CourseCard";


export const CourseGrid = ({ courses = [] }) => {
  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
        <div className="text-4xl">📚</div>

        <h3 className="mt-4 text-lg font-semibold text-white">
          No courses found
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          There are no published courses available right now.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

