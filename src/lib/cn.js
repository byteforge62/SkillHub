import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional class names and resolve Tailwind conflicts.
 * Every UI primitive uses this so page-level overrides always win.
 */
export const cn = (...inputs) => twMerge(clsx(inputs));

export default cn;
