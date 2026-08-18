import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

const PasswordInput = forwardRef(
  (
    {
      id,
      label,
      error,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputClassName = clsx(
      "h-11 w-full rounded-xl border bg-surface px-4 pr-12",
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

        <div className="relative">
          <input
            ref={ref}
            id={id}
            type={showPassword ? "text" : "password"}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={inputClassName}
            {...props}
          />

          <button
            type="button"
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((previous) => !previous)}
            className={clsx(
              "absolute inset-y-0 right-3 flex items-center",
              "text-text-secondary transition-colors duration-200",
              "hover:text-text-primary",
              "focus:outline-none focus-visible:text-text-primary",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            {showPassword ? (
              <EyeOff size={18} aria-hidden="true" />
            ) : (
              <Eye size={18} aria-hidden="true" />
            )}
          </button>
        </div>

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

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;