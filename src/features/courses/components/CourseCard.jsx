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
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-surface-hover">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-accent-light">
            <span className="text-4xl">📚</span>
          </div>
        )}

        {level && (
          <span className="absolute left-3 top-3 rounded-full border border-border bg-surface/95 px-3 py-1 text-xs font-medium text-text-primary shadow-sm backdrop-blur">
            {level}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {categoryName && (
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
            {categoryName}
          </p>
        )}

        <h2 className="line-clamp-2 text-lg font-semibold text-text-primary">
          {title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-muted">
          {description || "Start learning with this course."}
        </p>

        {/* Course Meta */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-text-muted">
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
        <div className="mt-5 border-t border-border pt-4">
          <Link
            to={`/courses/${_id}`}
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            View Course
          </Link>
        </div>
      </div>
    </article>
  );
};