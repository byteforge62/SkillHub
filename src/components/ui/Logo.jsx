import { cn } from "@/lib/cn";

/**
 * SkillHub sapling mark: two leaves opening from a single stem.
 * One geometric idea, reused at every size.
 */
export const BrandMark = ({ className }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-9 w-9 shrink-0", className)}
    aria-hidden="true"
  >
    <rect width="40" height="40" rx="12" fill="#1E563F" />

    <path
      d="M19.4 31V19.6"
      stroke="#9DC0AC"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M19.4 23.4C13.9 23.4 9.8 19.6 9.8 13.6C15.2 13.6 19.4 17.3 19.4 23.4Z"
      fill="#F3F8F4"
    />
    <path
      d="M20.6 27.4C20.6 21.3 24.8 17.6 30.2 17.6C30.2 23.6 26.1 27.4 20.6 27.4Z"
      fill="#9DC0AC"
    />
  </svg>
);

export const Logo = ({
  className,
  markClassName,
  showWordmark = true,
  tone = "dark",
}) => (
  <span className={cn("inline-flex items-center gap-2.5", className)}>
    <BrandMark className={markClassName} />

    {showWordmark && (
      <span
        className={cn(
          "text-[21px] font-bold leading-none tracking-[-0.045em]",
          tone === "light" ? "text-white" : "text-ink",
        )}
      >
        SkillHub
      </span>
    )}
  </span>
);

export default Logo;
