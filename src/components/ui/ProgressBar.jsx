import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

export const ProgressBar = ({
  value = 0,
  label,
  showValue = false,
  size = "md",
  tone = "primary",
  className,
}) => {
  const clamped = Math.min(100, Math.max(0, Math.round(value)));

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-3 text-xs">
          {label && <span className="font-medium text-text-secondary">{label}</span>}
          {showValue && (
            <span className="font-semibold text-primary">{clamped}%</span>
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
          size === "sm" ? "h-1.5" : size === "lg" ? "h-2.5" : "h-2",
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "h-full rounded-full",
            tone === "light" ? "bg-white/80" : "bg-primary",
          )}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
