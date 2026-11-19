import { cn } from "@/lib/cn";

const tones = {
  canvas: "bg-background",
  transparent: "bg-transparent",
  surface: "bg-white",
  sage: "bg-sage",
  forest: "bg-forest-deep text-text-on-dark",
};

/**
 * Section wrapper: one place defines vertical rhythm and band colour.
 */
export const Section = ({
  children,
  id,
  className,
  tone = "canvas",
  bordered = false,
  ...props
}) => (
  <section
    id={id}
    className={cn(
      "relative",
      tones[tone] ?? tones.canvas,
      bordered && "border-y border-[color:var(--color-line)]",
      className,
    )}
    {...props}
  >
    {children}
  </section>
);

export const SectionHeading = ({
  title,
  description,
  action,
  align = "left",
  tone = "light",
  className,
  titleClassName,
}) => (
  <div
    className={cn(
      "flex flex-col gap-5 sm:gap-6",
      align === "center" && "items-center text-center",
      action && "sm:flex-row sm:items-end sm:justify-between",
      className,
    )}
  >
    <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
      <h2
        className={cn(
          "display-3",
          tone === "dark" ? "text-text-on-dark" : "text-text-primary",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-3 text-[15px] leading-7 sm:text-base",
            tone === "dark"
              ? "text-text-on-dark-secondary"
              : "text-text-secondary",
          )}
        >
          {description}
        </p>
      )}
    </div>

    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default Section;
