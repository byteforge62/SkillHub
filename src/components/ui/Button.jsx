import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * Buttons are letterpress stamps, not pills: a cut 10px corner, a hairline
 * border and a hard offset edge that collapses when pressed.
 */
const variantStyles = {
  primary:
    "border border-primary bg-primary text-white shadow-[2px_2px_0_0_rgba(22,66,48,0.32)] hover:-translate-x-px hover:-translate-y-px hover:bg-primary-hover hover:shadow-[3px_3px_0_0_rgba(22,66,48,0.34)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  secondary:
    "border border-[color:var(--color-line)] bg-white text-ink shadow-[2px_2px_0_0_rgba(30,86,63,0.12)] hover:-translate-x-px hover:-translate-y-px hover:border-primary/40 hover:bg-sage/60 hover:shadow-[3px_3px_0_0_rgba(30,86,63,0.16)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  outline:
    "border border-primary/35 bg-transparent text-primary hover:border-primary hover:bg-sage/60",
  ghost:
    "border border-transparent bg-transparent text-text-secondary hover:bg-sage/60 hover:text-primary",
  onDark:
    "border border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15",
  danger:
    "border border-error bg-error text-white shadow-[2px_2px_0_0_rgba(186,60,60,0.28)] hover:-translate-x-px hover:-translate-y-px hover:bg-[#a33333] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  link: "h-auto rounded-none border-0 bg-transparent p-0 text-primary underline-offset-4 hover:underline",
};

const sizeStyles = {
  sm: "h-9 gap-2 px-3.5 text-[10.5px]",
  md: "h-11 gap-2 px-5 text-[11.5px]",
  lg: "h-12 gap-2.5 px-6 text-[12px]",
  icon: "h-10 w-10 p-0",
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

  return (
    <Component
      ref={ref}
      {...(isNativeButton ? { type, disabled: disabled || loading } : {})}
      aria-busy={loading || undefined}
      aria-disabled={!isNativeButton && (disabled || loading) ? true : undefined}
      className={cn(
        "group/button inline-flex select-none items-center justify-center whitespace-nowrap rounded-[10px] font-semibold uppercase leading-none tracking-[0.1em]",
        "transition-[background-color,border-color,color,box-shadow,transform] duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variantStyles[variant] ?? variantStyles.primary,
        variant === "link" && "normal-case tracking-normal",
        sizeStyles[size] ?? sizeStyles.md,
        fullWidth && "w-full",
        (disabled || loading) && "pointer-events-none opacity-55",
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
