import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * Workspace page heading: 18–22px semibold (design.md §2) with an optional
 * muted eyebrow, keeping internal pages quieter than the public landing.
 */
export const PageHeader = ({
  eyebrow,
  title,
  description,
  action,
  backTo,
  backLabel = "Back",
  className,
}) => (
  <header className={cn("flex flex-col gap-4", className)}>
    {backTo && (
      <Link
        to={backTo}
        className="inline-flex w-fit items-center gap-1.5 text-[12.5px] font-medium text-text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        {backLabel}
      </Link>
    )}

    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="section-label mb-2">{eyebrow}</p>
        )}

        <h1 className="text-[22px] font-semibold leading-[1.3] tracking-[-0.02em] text-text-primary">
          {title}
        </h1>

        {description && (
          <p className="mt-1.5 text-[14px] leading-[1.55] text-text-secondary">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  </header>
);

export default PageHeader;
