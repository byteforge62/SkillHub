import { motion } from "framer-motion";

/**
 * Reusable full-width section background wrapper.
 * Provides consistent background bands with optional decorative depth.
 */
export const SectionBackground = ({
  children,
  variant = "background",
  className,
  showDepth = false,
  depthPosition = "top-center",
}) => {
  const variantClasses = {
    background: "section-band section-band--background",
    surface: "section-band section-band--surface",
    "surface-hover": "section-band section-band--surface-hover",
    embedded: "section-band section-band--embedded",
  };

  const depthPositions = {
    "top-center": "top-0 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {showDepth && (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className={`absolute rounded-full bg-primary/5 blur-[150px] ${
              depthPositions[depthPosition]
            }`}
            style={{
              height: depthPosition.includes("top") ? "400px" : "300px",
              width: depthPosition.includes("center") ? "600px" : "500px",
            }}
          />
          <div
            className={`absolute rounded-full bg-accent/5 blur-[150px] ${
              depthPosition.includes("top") ? "bottom-0 right-0" : "top-0 left-0"
            }`}
            style={{
              height: depthPosition.includes("top") ? "300px" : "250px",
              width: depthPosition.includes("center") ? "500px" : "400px",
            }}
          />
        </div>
      )}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SectionBackground;