import { Loader2 } from "lucide-react";

import { cn } from "@/lib/cn";

const sizes = {
  sm: 14,
  md: 18,
  lg: 24,
};

export const Spinner = ({ size = "md", className, label = "Loading" }) => (
  <span
    role="status"
    aria-label={label}
    className={cn("inline-flex items-center justify-center text-primary", className)}
  >
    <Loader2
      size={sizes[size] ?? sizes.md}
      className="animate-spin"
      aria-hidden="true"
    />
  </span>
);

export default Spinner;
