import { cn } from "@/lib/cn";

const sizes = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-2xl",
};

export const initialsOf = (name, email) =>
  (name || email || "User")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const Avatar = ({
  src,
  name,
  email,
  size = "md",
  className,
  ring = false,
}) => {
  const sizeClass = sizes[size] ?? sizes.md;

  if (src) {
    return (
      <img
        src={src}
        alt={`${name || "User"} avatar`}
        className={cn(
          "shrink-0 rounded-full object-cover",
          sizeClass,
          ring && "ring-2 ring-white/80",
          className,
        )}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-sage font-semibold text-primary",
        sizeClass,
        ring && "ring-2 ring-white/70",
        className,
      )}
    >
      {initialsOf(name, email)}
    </span>
  );
};

export default Avatar;
