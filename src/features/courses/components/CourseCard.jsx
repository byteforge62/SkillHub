import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock3, Languages } from "lucide-react";

import Badge from "@/components/ui/Badge";

export const CourseCard = ({ course }) => {
  if (!course) return null;

  const { _id, title, description, imageUrl, level, category, duration, language } = course;

  const categoryName = typeof category === "object" ? category?.name : category;

  return (
    <Link
      to={`/courses/${_id}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-white shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-hover)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-sage">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-primary/50">
            <BookOpen size={34} strokeWidth={1.4} aria-hidden="true" />
          </span>
        )}

        {level && (
          <span className="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-primary backdrop-blur-sm">
            {level}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {categoryName && (
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary">
            {categoryName}
          </p>
        )}

        <h3 className="mt-2 line-clamp-2 text-[16px] font-bold leading-6 tracking-[-0.025em] text-text-primary">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-6 text-text-secondary">
          {description || "Start learning with this course."}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 border-t border-border-subtle pt-3.5 text-[11.5px] text-text-muted">
          {duration !== undefined && duration !== null && (
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={12} strokeWidth={1.9} aria-hidden="true" />
              {duration} min
            </span>
          )}

          {language && (
            <span className="inline-flex items-center gap-1.5">
              <Languages size={12} strokeWidth={1.9} aria-hidden="true" />
              {language}
            </span>
          )}

          <span className="ml-auto inline-flex items-center gap-1 font-semibold text-primary">
            View
            <ArrowRight
              size={12}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
