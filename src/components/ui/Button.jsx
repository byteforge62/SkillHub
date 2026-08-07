import clsx from "clsx";

const Button = ({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth=false,
    className,
    ...props
}) => {
    const base = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none";
    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover",
        secondary: "bg-surface border border-border text-text-primary",
        danger: "bg-red-600 text-white"
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5",
        lg: "h-22 px-6 text-base"
    };

    return (
    <button
        type={type}
        disabled={loading || disabled}
        className={clsx(
            base,
            variants[variant],
            sizes[size],
            fullWidth && "w-full",
            className,
        )}{...props}
    >
        {loading ? "Loading..." : children}
    </button>
    );
}

export default Button;