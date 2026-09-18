import { Link } from "react-router-dom";

export const CourseCard = ({ course }) => {
  if (!course) return null;

  const {
    _id,
    title,
    description,
    imageUrl,
    level,
    category,
    duration,
    language,
    price,
  } = course;

  const categoryName =
    typeof category === "object" ? category?.name : category;

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.05]">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            <span className="text-4xl">📚</span>
          </div>
        )}

        {level && (
          <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur">
            {level}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {categoryName && (
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-blue-400">
            {categoryName}
          </p>
        )}

        <h2 className="line-clamp-2 text-lg font-semibold text-white">
          {title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
          {description || "Start learning with this course."}
        </p>

        {/* Course Meta */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          {duration !== undefined && duration !== null && (
            <span>{duration} min</span>
          )}

          {language && (
            <>
              <span>•</span>
              <span>{language}</span>
            </>
          )}

          {price !== undefined && price !== null && (
            <>
              <span>•</span>
              <span>${price}</span>
            </>
          )}
        </div>

        {/* Action */}
        <div className="mt-5 border-t border-white/10 pt-4">
          <Link
            to={`/courses/${_id}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            View Course
          </Link>
        </div>
      </div>
    </article>
  );
};

