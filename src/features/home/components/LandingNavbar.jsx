
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

import { AnimatedButton } from "@/components/animation/AnimatedButton";
import Logo from "@/components/ui/Logo";

const navigation = [
  { label: "Resources", href: "#resources" },
  { label: "Learning", href: "#learning" },
  { label: "Workspace", href: "#workspace" },
  { label: "Events", href: "#events" },
  { label: "Tools", href: "#tools" },
];

const menuVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -8,
  },
  visible: {
    opacity: 1,
    height: "auto",
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4">
      <div className="container-narrow mx-auto">
        <motion.div
          animate={{
            boxShadow: isScrolled
              ? "0 8px 30px rgba(0, 0, 0, 0.06)"
              : "0 0 0 rgba(0, 0, 0, 0)",
          }}
          transition={{ duration: 0.25 }}
          className={`relative rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? "border-border bg-background/95 backdrop-blur-xl"
              : "border-border/60 bg-background/80 backdrop-blur-lg"
          }`}
        >
          {/* Main navbar */}
          <div className="flex h-[68px] items-center px-4 sm:px-5 lg:px-6">
            {/* Brand */}
            <Link
              to="/"
              onClick={closeMenu}
              aria-label="SkillHub home"
              className="group flex shrink-0 items-center"
            >
              <Logo className="text-2xl font-bold tracking-tight sm:text-[26px]" />
            </Link>

            {/* Brand separator */}
            <div
              className="mx-5 hidden h-7 w-px bg-border md:block"
              aria-hidden="true"
            />

            {/* Brand description */}
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted lg:block">
              Learning Studio
            </span>

            {/* Desktop navigation */}
            <nav
              className="ml-auto hidden items-center gap-1 lg:flex"
              aria-label="Main navigation"
            >
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-text-secondary transition-colors duration-200 hover:bg-surface-hover hover:text-text-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="ml-auto hidden items-center gap-2.5 lg:flex">
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
              >
                Sign in
              </Link>

              <AnimatedButton
                variant="primary"
                size="md"
                asChild
                className="group"
              >
                <Link to="/register" className="inline-flex items-center gap-2">
                  Get started
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </AnimatedButton>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-primary transition-colors hover:bg-surface-hover lg:hidden"
            >
              {isOpen ? (
                <X size={19} />
              ) : (
                <Menu size={19} />
              )}
            </button>
          </div>

          {/* Mobile navigation panel */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id="mobile-navigation"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="overflow-hidden lg:hidden"
              >
                <div className="border-t border-border px-4 pb-4 pt-3 sm:px-5">
                  <nav
                    className="flex flex-col gap-1"
                    aria-label="Mobile navigation"
                  >
                    {navigation.map((item, index) => (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={closeMenu}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.035,
                          duration: 0.2,
                        }}
                        className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
                      >
                        {item.label}
                        <ArrowRight
                          size={15}
                          className="text-text-muted"
                          aria-hidden="true"
                        />
                      </motion.a>
                    ))}
                  </nav>

                  {/* Mobile actions */}
                  <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-4">
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="flex h-11 items-center justify-center rounded-xl border border-border text-sm font-medium text-text-primary transition-colors hover:bg-surface-hover"
                    >
                      Sign in
                    </Link>

                    <AnimatedButton
                      variant="primary"
                      size="md"
                      fullWidth
                      asChild
                    >
                      <Link
                        to="/register"
                        onClick={closeMenu}
                        className="inline-flex items-center justify-center gap-2"
                      >
                        Get started
                        <ArrowRight size={15} />
                      </Link>
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
};

export default LandingNavbar;
