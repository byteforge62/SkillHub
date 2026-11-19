import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? value : 0);

  useEffect(() => {
    if (!inView || prefersReduced || !Number.isFinite(value)) return undefined;

    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, prefersReduced, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
};

/**
 * Frosted horizontal strip that overlaps the hero.
 * Values are supplied by the page from real endpoints.
 */
export const MetricsStrip = ({ items = [], className }) => {
  const visibleItems = items.filter((item) => item && item.value != null);

  if (visibleItems.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.5 }}
      className={cn(
        "glass-surface mx-auto grid w-full gap-px overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(20,46,33,0.10)] sm:rounded-full",
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
            className="flex items-center gap-3.5 px-5 py-4 sm:px-6 sm:py-5"
          >
            {Icon && (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage text-primary">
                <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
              </span>
            )}

            <div className="min-w-0">
              <p className="text-[20px] font-bold leading-none tracking-[-0.03em] text-text-primary">
                <Counter value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-1 truncate text-[11.5px] font-medium text-text-secondary">
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
