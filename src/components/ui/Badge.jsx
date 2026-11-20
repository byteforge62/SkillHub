import { cn } from "@/lib/cn";

const variantStyles = {
  sage: "bg-sage text-primary",
  forest: "bg-primary text-white",
  outline: "border border-line bg-white text-text-secondary",
  glass: "glass-surface text-primary",
  soft: "bg-sage-soft text-primary",
  warning: "bg-warning-soft text-warning",
  success: "bg-success-soft text-success",
  danger: "bg-error-soft text-error",
  neutral: "bg-white text-text-secondary border border-border",
  live: "bg-success-soft text-success",
};

const sizeStyles = {
  sm: "gap-1.5 px-2 py-0.5 text-[11px]",
  md: "gap-1.5 px-2.5 py-0.5 text-[11.5px]",
  lg: "gap-2 px-3 py-1 text-[12px]",
};

/**
 * Status pill — always rounded-full, 11.5px medium (design.md §4.03).
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
      "inline-flex items-center rounded-full border border-transparent font-medium leading-[1.4]",
      variantStyles[variant] ?? variantStyles.sage,
      sizeStyles[size] ?? sizeStyles.md,
      className,
    )}
    {...props}
  >
    {dot && (
      <span
        className="h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden="true"
      />
    )}
    {Icon && <Icon size={11} strokeWidth={2} aria-hidden="true" />}
    {children}
  </span>
);

export const PillBadge = Badge;

export default Badge;
