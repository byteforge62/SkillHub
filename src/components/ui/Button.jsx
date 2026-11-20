import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * Buttons follow design.md §4.01:
 * - pill (9999px) for standard hero/form actions
 * - 12px radius for compact toolbar and destructive variants
 * Labels are Plus Jakarta Sans, 13.5px, medium.
 */
const baseStyles =
  "group/button inline-flex select-none items-center justify-center whitespace-nowrap font-display text-[13.5px] font-medium leading-none tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const variantStyles = {
  primary:
    "border border-primary bg-primary text-white hover:bg-primary-hover disabled:border-[#9ba8a1] disabled:bg-[#9ba8a1] disabled:text-white/80",
  secondary:
    "border border-transparent bg-sage text-text-primary hover:bg-sage-soft disabled:bg-[#f3f6f4] disabled:text-[#9ba8a1]",
  outline:
    "border border-line bg-white text-text-primary hover:border-[#c5d3ca] hover:bg-sage/70 disabled:border-[#eaefea] disabled:text-[#b0bcb5]",
  ghost:
    "border border-transparent bg-transparent text-text-secondary hover:bg-sage hover:text-text-primary disabled:text-[#b0bcb5]",
  danger:
    "border border-error bg-error text-white hover:bg-[#b91c1c] disabled:border-[#f5a5a5] disabled:bg-[#f5a5a5] disabled:text-white",
  onDark:
    "border border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15",
  link: "h-auto border-0 bg-transparent p-0 text-primary underline-offset-4 hover:underline",
};

const sizeStyles = {
  sm: "h-9 gap-2 rounded-[12px] px-3.5 text-[13px]",
  md: "h-11 gap-2 rounded-full px-5",
  lg: "h-12 gap-2.5 rounded-full px-6 text-[14px]",
  icon: "h-10 w-10 rounded-full p-0",
};

/**
 * Single button primitive for the whole application.
 * - `as` renders any component (e.g. react-router's Link) with the same styling.
 * - Use `className` only for layout; shape and states live here.
 */
const Button = forwardRef(function Button(
  {
    children,
    className,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    iconLeft: IconLeft,
    iconRight: IconRight,
    as,
    type = "button",
    ...props
  },
  ref,
) {
  const Component = as || "button";
  const isNativeButton = Component === "button";
  const isCompact = size === "sm" || variant === "danger";
  const rounded = variant === "link" ? "rounded-none" : isCompact ? "rounded-[12px]" : "rounded-full";

  return (
    <Component
      ref={ref}
      {...(isNativeButton ? { type, disabled: disabled || loading } : {})}
      aria-busy={loading || undefined}
      aria-disabled={!isNativeButton && (disabled || loading) ? true : undefined}
      className={cn(
        baseStyles,
        rounded,
        variantStyles[variant] ?? variantStyles.primary,
        sizeStyles[size] ?? sizeStyles.md,
        variant === "link" && "h-auto p-0",
        fullWidth && "w-full",
        (disabled || loading) && "pointer-events-none",
        className,
      )}
      {...props}
    >
      {loading ? (
        <Loader2 size={15} className="animate-spin" aria-hidden="true" />
      ) : (
        IconLeft && <IconLeft size={15} strokeWidth={1.9} aria-hidden="true" />
      )}

      <span>{children}</span>

      {!loading && IconRight && (
        <IconRight
          size={15}
          strokeWidth={1.9}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover/button:translate-x-0.5"
        />
      )}
    </Component>
  );
});

export default Button;
export { Button };
