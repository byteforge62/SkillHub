import { forwardRef, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/cn";
import { fieldStyles } from "./Input";

const PasswordInput = forwardRef(function PasswordInput(
  { id, label, error, hint, className, disabled, ...props },
  ref,
) {
  const [visible, setVisible] = useState(false);
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted"
        >
          <span>{label}</span>
          <span
            className="h-px flex-1 bg-[color:var(--color-line)]"
            aria-hidden="true"
          />
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={visible ? "text" : "password"}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          className={cn(fieldStyles(error), "h-11 pr-9", className)}
          {...props}
        />

        <button
          type="button"
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
          className={cn(
            "absolute inset-y-0 right-0 my-auto flex h-8 w-8 items-center justify-center rounded-[6px]",
            "text-text-muted transition-colors duration-200 hover:bg-sage hover:text-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          {visible ? (
            <EyeOff size={16} aria-hidden="true" />
          ) : (
            <Eye size={16} aria-hidden="true" />
          )}
        </button>
      </div>

      {error ? (
        <p
          id={`${inputId}-error`}
          className="text-[12px] leading-snug text-error"
          role="alert"
        >
          {error}
        </p>
      ) : (
        hint && (
          <p
            id={`${inputId}-hint`}
            className="text-[12px] leading-snug text-text-muted"
          >
            {hint}
          </p>
        )
      )}
    </div>
  );
});

export default PasswordInput;
