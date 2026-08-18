import { forwardRef } from "react";
import clsx from "clsx";

const Input = forwardRef(
  (
    {
      id,
      label,
      type = "text",
      error,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputClassName = clsx(
      "h-11 w-full rounded-xl border bg-surface px-4",
      "text-text-primary outline-none",
      "placeholder:text-text-muted",
      "transition-colors duration-200",
      "focus:border-primary",
      "focus:ring-2 focus:ring-primary/20",
      "disabled:cursor-not-allowed",
      "disabled:opacity-60",
      error ? "border-error" : "border-border",
      className
    );

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={inputClassName}
          {...props}
        />

        {error && (
          <p
            id={`${id}-error`}
            className="text-sm text-error"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;