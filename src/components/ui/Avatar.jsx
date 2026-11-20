import { cn } from "@/lib/cn";

const sizes = {
  xs: "h-6 w-6 text-[9px]",
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-[12px]",
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
          ring && "ring-2 ring-white",
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
        ring && "ring-2 ring-white",
        className,
      )}
    >
      {initialsOf(name, email)}
    </span>
  );
};

/**
 * Overlapping avatar group ending in a +N sage counter (design.md §4.05).
 * People are plain objects: { _id, fullname, name, avatar, email }.
 */
export const AvatarStack = ({
  people = [],
  max = 3,
  size = "sm",
  label,
  className,
}) => {
  const members = people.filter(Boolean);
  const visible = members.slice(0, max);
  const overflow = Math.max(members.length - visible.length, 0);
  const sizeClass = sizes[size] ?? sizes.sm;
  const counterSize = size === "xs" ? "h-6 min-w-6 text-[9px]" : "h-7 min-w-7 text-[10px]";

  if (visible.length === 0 && overflow === 0) return null;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex items-center">
        {visible.map((person, index) => (
          <Avatar
            key={person?._id || person?.fullname || index}
            src={person?.avatar}
            name={person?.fullname || person?.name}
            email={person?.email}
            size={size}
            ring
            className={cn(
              sizeClass,
              "border-2 border-white",
              index > 0 && "-ml-2",
            )}
          />
        ))}

        {overflow > 0 && (
          <span
            className={cn(
              "-ml-2 flex items-center justify-center rounded-full border-2 border-white bg-sage px-1.5 font-semibold text-primary",
              counterSize,
            )}
          >
            +{overflow}
          </span>
        )}
      </div>

      {label && (
        <span className="truncate text-[11.5px] text-text-muted">{label}</span>
      )}
    </div>
  );
};

export default Avatar;
