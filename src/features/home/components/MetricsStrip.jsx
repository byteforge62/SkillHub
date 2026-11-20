import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

/**
 * Frosted horizontal strip under the hero.
 * Values are supplied by the page from real endpoints.
 */
export const MetricsStrip = ({ items = [], className }) => {
  const visibleItems = items.filter((item) => item && item.value != null);

  if (visibleItems.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.4 }}
      className={cn(
        "glass-surface mx-auto grid w-full gap-px overflow-hidden rounded-[24px] shadow-[var(--shadow-lg)] sm:rounded-full",
        visibleItems.length === 2 && "sm:grid-cols-2",
        visibleItems.length === 3 && "sm:grid-cols-3",
        visibleItems.length >= 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {visibleItems.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="flex items-center gap-3.5 px-5 py-4 sm:px-6"
          >
            {Icon && (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage text-primary">
                <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
              </span>
            )}

            <div className="min-w-0">
              <p className="text-[18px] font-semibold leading-none tracking-[-0.02em] text-text-primary">
                {item.value}
              </p>
              <p className="mt-1 truncate text-[11.5px] text-text-secondary">
                {item.label}
              </p>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default MetricsStrip;
