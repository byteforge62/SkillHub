import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/cn";

export const PageHeader = ({
  title,
  description,
  action,
  backTo,
  backLabel = "Back",
  className,
}) => (
  <header className={cn("flex flex-col gap-5 sm:gap-6", className)}>
    {backTo && (
      <Link
        to={backTo}
        className="inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        {backLabel}
      </Link>
    )}

    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h1 className="text-[clamp(1.9rem,3.4vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-text-primary">
          {title}
        </h1>

        {description && (
          <p className="mt-3 text-[15px] leading-7 text-text-secondary">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  </header>
);

export default PageHeader;
