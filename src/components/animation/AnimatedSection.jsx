import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";

/**
 * Section-level animation wrapper.
 * Wraps children with a staggered entrance animation.
 * Respects prefers-reduced-motion.
 */
export const AnimatedSection = ({
  children,
  stagger = 0.08,
  delay = 0,
  once = true,
  amount = 0.2,
  className,
  ...props
}) => {
  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  const getServerSnapshot = () => false;

  const subscribe = (callback) => {
    if (typeof window === "undefined") return () => {};
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  };

  const shouldReduce = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (shouldReduce) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;