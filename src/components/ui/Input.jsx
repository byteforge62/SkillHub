import { forwardRef, useId } from "react";

import { cn } from "@/lib/cn";

/**
 * Form controls per design.md §4.02: 44px tall, 12px radius, white fill,
 * sage hairline border, forest focus border + soft ring.
 */
export const fieldStyles = (error) =>
  cn(
    "w-full rounded-[12px] border bg-white px-3.5 text-[14px] text-text-primary",
    "placeholder:text-text-muted",
    "transition-[border-color,box-shadow] duration-200",
    "focus:outline-none disabled:cursor-not-allowed disabled:bg-background-subtle disabled:text-text-muted",
    error
      ? "border-error focus:border-error focus:ring-2 focus:ring-error/15"
      : "border-line hover:border-[#c5d3ca] focus:border-primary focus:ring-2 focus:ring-primary/15",
  );

const textareaStyles = (error) =>
  cn(
    "w-full rounded-[12px] border bg-white px-3.5 py-2.5 text-[14px] leading-6 text-text-primary",
    "placeholder:text-text-muted",
    "transition-[border-color,box-shadow] duration-200",
    "focus:outline-none disabled:cursor-not-allowed disabled:bg-background-subtle disabled:text-text-muted",
    error
      ? "border-error focus:border-error focus:ring-2 focus:ring-error/15"
      : "border-line hover:border-[#c5d3ca] focus:border-primary focus:ring-2 focus:ring-primary/15",
  );

const FieldShell = ({ id, label, error, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label
        htmlFor={id}
        className="text-[11.5px] font-medium text-text-secondary"
      >
        {label}
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
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
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
          className={cn(fieldStyles(error), "h-11", Icon && "pl-10", className)}
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
