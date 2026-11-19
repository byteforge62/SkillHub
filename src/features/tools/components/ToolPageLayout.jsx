import { Link } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";

import Badge from "@/components/ui/Badge";

export const ToolPageLayout = ({
  title,
  description,
  category,
  usefulFor = [],
  children,
}) => (
  <main>
    <section className="sage-mesh relative overflow-hidden border-b border-[color:var(--color-line)]">
      <div className="architectural-grid absolute inset-0" aria-hidden="true" />

      <div className="container-wide relative py-10 sm:py-14">
        <Link
          to="/tools"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-text-muted transition-colors hover:text-primary"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          All tools
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Badge variant="forest" size="sm" icon={Wrench}>
            {category}
          </Badge>
          <Badge variant="outline" size="sm">
            Runs in your browser
          </Badge>
        </div>

        <h1 className="mt-4 max-w-3xl text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.05] tracking-[-0.04em]">
          {title}
        </h1>

        <p className="text-lead mt-4 max-w-2xl">{description}</p>

        {usefulFor.length > 0 && (
          <div className="mt-5">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Useful for
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {usefulFor.map((item) => (
                <Badge key={item} variant="outline" size="sm">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>

    <section className="container-wide py-10 sm:py-14">{children}</section>
  </main>
);

export default ToolPageLayout;
