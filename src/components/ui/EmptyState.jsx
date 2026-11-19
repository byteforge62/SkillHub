import { cn } from "@/lib/cn";

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  className,
  tone = "default",
}) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center rounded-3xl border border-dashed border-[color:var(--color-line)] bg-white/60 px-6 py-14 text-center",
      tone === "error" && "border-error/25 bg-error-soft/30",
      className,
    )}
  >
    {Icon && (
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-primary",
          tone === "error" && "bg-error/10 text-error",
        )}
      >
        <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
      </span>
    )}

    {title && (
      <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-text-primary">
        {title}
      </h3>
    )}

    {description && (
      <p className="mt-2 max-w-md text-sm leading-6 text-text-secondary">
        {description}
      </p>
    )}

    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
