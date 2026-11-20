import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

const toneStyles = {
  primary: "bg-primary",
  accent: "bg-accent",
  light: "bg-white/80",
};

/**
 * Linear progress: 6px track, pill ends, forest fill (design.md §4.05).
 */
export const ProgressBar = ({
  value = 0,
  label,
  showValue = false,
  size = "md",
  tone = "primary",
  className,
  barClassName,
}) => {
  const clamped = Math.min(100, Math.max(0, Math.round(Number(value) || 0)));

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          {label && (
            <span className="text-[12.5px] font-medium text-text-secondary">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-[12.5px] font-semibold tabular-nums text-text-primary">
              {clamped}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-label={label || "Progress"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        className={cn(
          "overflow-hidden rounded-full bg-sage",
          size === "sm" ? "h-1" : size === "lg" ? "h-2" : "h-1.5",
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "h-full rounded-full",
            toneStyles[tone] ?? toneStyles.primary,
            barClassName,
          )}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
