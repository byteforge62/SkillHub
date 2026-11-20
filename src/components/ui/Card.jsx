import { cn } from "@/lib/cn";

const variantStyles = {
  surface: "bg-surface border border-[color:var(--color-line)]",
  glass: "glass-surface",
  sage: "bg-sage border border-transparent",
  sageSoft: "bg-sage-soft/70 border border-transparent",
  forest: "bg-forest-deep text-text-on-dark border border-white/10",
  plain: "bg-transparent",
};

/**
 * Bento container used for every raised surface in the product.
 * Keeps radius, hairline and padding consistent instead of re-declaring them.
 */
export const Card = ({
  children,
  className,
  variant = "surface",
  as: Component = "div",
  padded = true,
  ...props
}) => (
  <Component
    className={cn(
      "relative rounded-[24px]",
      padded && "p-6 sm:p-7",
      variantStyles[variant] ?? variantStyles.surface,
      variant !== "forest" && variant !== "plain" && "shadow-[var(--shadow-card)]",
      className,
    )}
    {...props}
  >
    {children}
  </Component>
);

export const GlassCard = (props) => <Card {...props} variant="glass" />;
export const BentoCard = (props) => <Card {...props} />;
export const ForestCard = (props) => <Card {...props} variant="forest" />;

export default Card;
