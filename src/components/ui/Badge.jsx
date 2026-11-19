import { cn } from "@/lib/cn";

const variantStyles = {
  sage: "bg-sage text-primary",
  forest: "bg-primary text-white",
  outline:
    "border border-[color:var(--color-line)] bg-white/70 text-text-secondary",
  glass: "glass-surface text-primary",
  soft: "bg-sage-soft text-primary",
  warning: "bg-warning-soft text-warning",
  success: "bg-success-soft text-success",
  danger: "bg-error-soft text-error",
  neutral: "bg-white text-text-secondary border border-border-subtle",
};

const sizeStyles = {
  sm: "h-5 gap-1.5 px-1.5 text-[9px]",
  md: "h-6 gap-1.5 px-2 text-[9.5px]",
  lg: "h-7 gap-2 px-2.5 text-[10px]",
};

/**
 * Catalogue tags: square-cornered, micro-capped, set like an index label
 * rather than a rounded chip.
 */
export const Badge = ({
  children,
  className,
  variant = "sage",
  size = "md",
  dot = false,
  icon: Icon,
  ...props
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-[4px] border border-transparent font-semibold uppercase leading-none tracking-[0.1em]",
      variantStyles[variant] ?? variantStyles.sage,
      sizeStyles[size] ?? sizeStyles.md,
      className,
    )}
    {...props}
  >
    {dot && (
      <span
        className="h-1 w-1 rounded-[1px] bg-current opacity-80"
        aria-hidden="true"
      />
    )}
    {Icon && <Icon size={11} strokeWidth={2} aria-hidden="true" />}
    {children}
  </span>
);

export const PillBadge = Badge;

export default Badge;
