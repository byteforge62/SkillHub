export const spring = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.9,
};

export const softSpring = {
  type: "spring",
  stiffness: 180,
  damping: 26,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: spring },
};

export const stagger = (delayChildren = 0.08, staggerChildren = 0.07) => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren } },
});

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
};

export const dropdownMotion = {
  hidden: { opacity: 0, y: 6, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 4,
    scale: 0.98,
    transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
};
