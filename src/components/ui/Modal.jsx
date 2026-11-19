import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/cn";

const sizes = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
};

/**
 * Portal modal with backdrop, escape handling and scroll lock.
 * One implementation for search, confirmations and auth prompts.
 */
export const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  showClose = true,
  className,
  labelledBy,
}) => {
  const panelRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    const previouslyFocused = document.activeElement;
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    const focusTimer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector(
        "[data-autofocus], input, button",
      );
      target?.focus?.();
    }, 40);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center px-4 pb-8 pt-[12vh] sm:px-6">
          <motion.button
            type="button"
            aria-label="Close dialog"
            tabIndex={-1}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            className="absolute inset-0 h-full w-full cursor-default bg-[#0f221a]/35 backdrop-blur-[3px]"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={!title ? "Dialog" : undefined}
            aria-labelledby={title ? labelledBy || "modal-title" : undefined}
            initial={{ opacity: 0, y: prefersReduced ? 0 : -12, scale: prefersReduced ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -8, scale: prefersReduced ? 1 : 0.99 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className={cn(
              "relative z-10 w-full overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-white shadow-[0_40px_100px_rgba(15,34,26,0.22)]",
              sizes[size] ?? sizes.md,
              className,
            )}
          >
            {(title || showClose) && (
              <div className="flex items-start justify-between gap-6 border-b border-border-subtle px-6 py-5">
                <div className="min-w-0">
                  {title && (
                    <h2
                      id="modal-title"
                      className="text-lg font-semibold tracking-[-0.02em] text-text-primary"
                    >
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                      {description}
                    </p>
                  )}
                </div>

                {showClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-sage hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                )}
              </div>
            )}

            <div className="px-6 py-5">{children}</div>

            {footer && (
              <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border-subtle bg-[#fafbfa] px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
