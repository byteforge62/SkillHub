import { forwardRef,useState } from "react"
import { Eye,EyeOff } from "lucide-react"
import clsx from "clsx"

const PasswordInput = forwardRef((
    {
        id,
        label,
        error,
        className,
        ...props
    },
    ref
) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-text-primary">
                    {label}
                </label>
            )}

            <div className="relative">
              <input 
                ref={ref}
                id={id}
                type={showPassword ? "text" : "password"}
                className={clsx(
                    "h-11 w-full rounded-xl border border-border bg-surface",
                    "px-4 pr-12 outline-none transition-all",
                    "focus:border-primary",
                    "focus:ring-2 focus:ring-primary/20",
                    error && "border-error",
                    className
                )}
                {...props}
              />
              <button
                type="button"
                aria-label={
                    showPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-text-secondary hover:text-text-primary"
              >
                {showPassword ? (
                    <EyeOff size={18}/>
                ) : (
                    <Eye size={18}/>
                )}
              </button>
            </div>

            {error && (
                <p className="text-sm text-error">
                    {error}
                </p>
            )}
        </div>
    )
});

PasswordInput.displayName = "Password";
export default PasswordInput;