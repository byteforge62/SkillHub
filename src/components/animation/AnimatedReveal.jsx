import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";

/**
 * Reusable entrance/reveal animation.
 * Fades in and slides up when entering the viewport.
 * Respects prefers-reduced-motion.
 */
export const AnimatedReveal = ({
  children,
  as = "div",
  delay = 0,
  duration = 0.6,
  distance = 12,
  once = true,
  amount = 0.3,
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

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export default AnimatedReveal;