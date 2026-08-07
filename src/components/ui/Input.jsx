import { forwardRef } from "react";
import clsx from "clsx";

const Input = forwardRef((
    { 
        id,
        label,
        type = "text",
        error,
        className,
        ...props
    },
    ref
) => {
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
                className={clsx(
                    "h-11 rounded-xl border border-border bg-surface",
                    "px-4 outline-none transition-all",
                    "focus:border-primary",
                    "focus:ring-2 focus:ring-primary/20",
                    error && "border-error",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-sm text-error">
                    {error}
                </p>
            )}
        </div>
    );
}
);

Input.displayName = "Input";

export default Input;