import clsx from "clsx";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className,
  ...props
}) => {
  const baseStyles = [
    "inline-flex items-center justify-center",
    "rounded-xl",
    "font-semibold",
    "transition-colors duration-200",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-primary/40",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
  ];

  const variantStyles = {
    primary: [
      "bg-primary text-white",
      "hover:bg-primary-hover",
    ],

    secondary: [
      "border border-border",
      "bg-surface text-text-primary",
      "hover:bg-surface-hover",
    ],

    danger: [
      "bg-red-600 text-white",
      "hover:bg-red-700",
    ],
  };

  const sizeStyles = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      type={type}
      disabled={loading || disabled}
      aria-busy={loading}
      className={clsx(
        baseStyles,
        variantStyles[variant] ?? variantStyles.primary,
        sizeStyles[size] ?? sizeStyles.md,
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;