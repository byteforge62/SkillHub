import { motion } from "framer-motion";

/**
 * Reusable full-width section background wrapper.
 * Provides consistent background bands with optional decorative depth.
 * Supports editorial forest color palette with smooth transitions.
 */
export const SectionBackground = ({
  children,
  variant = "background",
  className,
  showDepth = false,
  depthPosition = "top-center",
  showBorder = false,
  borderPosition = "top",
}) => {
  const variantClasses = {
    background: "section-band section-band--background",
    surface: "section-band section-band--surface",
    "surface-hover": "section-band section-band--surface-hover",
    "surface-raised": "section-band section-band--surface-raised",
    embedded: "section-band section-band--embedded",
    "forest-deep": "section-band section-band--forest-deep",
    "forest-deep-soft": "section-band section-band--forest-deep-soft",
    "forest-mid": "section-band section-band--forest-mid",
    "forest-soft": "section-band section-band--forest-soft",
    editorial: "section-band section-band--editorial",
    "editorial-soft": "section-band section-band--editorial-soft",
    "editorial-muted": "section-band section-band--editorial-muted",
    sage: "section-band section-band--sage",
    "sage-soft": "section-band section-band--sage-soft",
    "sage-muted": "section-band section-band--sage-muted",
    "terracotta-soft": "section-band section-band--terracotta-soft",
    "terracotta-muted": "section-band section-band--terracotta-muted",
    "warm-neutral": "section-band section-band--warm-neutral",
    "warm-neutral-soft": "section-band section-band--warm-neutral-soft",
  };

  const depthPositions = {
    "top-center": "top-0 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  const borderPositions = {
    top: "border-t",
    bottom: "border-b",
    both: "border-y",
  };

  // Dark variants need different depth colors
  const isDarkVariant = ["forest-deep", "forest-deep-soft", "forest-mid", "forest-soft"].includes(variant);

  return (
    <div className={`${variantClasses[variant]} ${className} ${showBorder ? borderPositions[borderPosition] : ""} border-border`}>
      {showDepth && (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className={`absolute rounded-full blur-[150px] ${
              depthPositions[depthPosition]
            } ${isDarkVariant ? "bg-primary/20" : "bg-primary/5"}`}
            style={{
              height: depthPosition.includes("top") || depthPosition === "center" ? "400px" : "300px",
              width: depthPosition.includes("center") ? "600px" : "500px",
            }}
          />
          <div
            className={`absolute rounded-full blur-[150px] ${
              depthPosition.includes("top") || depthPosition === "center" ? "bottom-0 right-0" : "top-0 left-0"
            } ${isDarkVariant ? "bg-accent/20" : "bg-accent/5"}`}
            style={{
              height: depthPosition.includes("top") || depthPosition === "center" ? "300px" : "250px",
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