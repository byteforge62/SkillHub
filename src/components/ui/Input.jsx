import { forwardRef, useId } from "react";

import { cn } from "@/lib/cn";

/**
 * Fields are ruled, not boxed: a single 2px baseline in sage that inks in
 * forest on focus. No rings, no floating grey containers.
 */
export const fieldStyles = (error) =>
  cn(
    "w-full border-0 border-b-2 bg-transparent px-0 pb-2 pt-1 text-[15px] text-text-primary",
    "placeholder:text-text-muted/70",
    "transition-[border-color,color] duration-200",
    "focus:outline-none disabled:cursor-not-allowed disabled:text-text-tertiary",
    error
      ? "border-b-error/70 hover:border-b-error focus:border-b-error"
      : "border-b-sage-muted hover:border-b-primary/45 focus:border-b-primary",
  );

const textareaStyles = (error) =>
  cn(
    "w-full rounded-[10px] border border-[color:var(--color-line)] bg-sage/45 px-3.5 py-3 text-[14px] leading-6 text-text-primary",
    "placeholder:text-text-muted/80",
    "transition-[border-color,background-color] duration-200",
    "focus:bg-white focus:outline-none",
    error
      ? "border-error/60 bg-error-soft/40 focus:border-error"
      : "hover:border-primary/30 focus:border-primary/60",
    "disabled:cursor-not-allowed disabled:text-text-tertiary",
  );

const FieldShell = ({ id, label, error, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label
        htmlFor={id}
        className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted"
      >
        <span>{label}</span>
        <span
          className="h-px flex-1 bg-[color:var(--color-line)]"
          aria-hidden="true"
        />
      </label>
    )}

    {children}

    {error ? (
      <p
        id={`${id}-error`}
        className="text-[12px] leading-snug text-error"
        role="alert"
      >
        {error}
      </p>
    ) : (
      hint && (
        <p
          id={`${id}-hint`}
          className="text-[12px] leading-snug text-text-muted"
        >
          {hint}
        </p>
      )
    )}
  </div>
);

export const Input = forwardRef(function Input(
  {
    id,
    label,
    error,
    hint,
    className,
    containerClassName,
    icon: Icon,
    disabled,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <FieldShell id={inputId} label={label} error={error} hint={hint}>
      <div className={cn("relative", containerClassName)}>
        {Icon && (
          <Icon
            size={16}
            strokeWidth={1.9}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-text-muted"
          />
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          className={cn(fieldStyles(error), "h-11", Icon && "pl-7", className)}
          {...props}
        />
      </div>
    </FieldShell>
  );
});

export const Textarea = forwardRef(function Textarea(
  {
    id,
    label,
    error,
    hint,
    className,
    containerClassName,
    rows = 4,
    disabled,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <FieldShell id={inputId} label={label} error={error} hint={hint}>
      <div className={cn("relative", containerClassName)}>
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          className={cn(textareaStyles(error), "min-h-28 resize-y", className)}
          {...props}
        />
      </div>
    </FieldShell>
  );
});

export default Input;
