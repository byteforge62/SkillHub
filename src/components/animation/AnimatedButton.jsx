import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

/**
 * Animated button built on the shared Button component.
 * Provides subtle scale and lift feedback on interaction.
 * Respects prefers-reduced-motion.
 */
export const AnimatedButton = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "inline-block" }}
    >
      <Button {...props}>{children}</Button>
    </motion.div>
  );
};

export default AnimatedButton;