import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AnimatedButton } from "@/components/animation/AnimatedButton";
import { AnimatedReveal } from "@/components/animation/AnimatedReveal";

import Logo from "@/components/ui/Logo";

const navigation = [
  { label: "Resources", href: "#resources" },
  { label: "Learning", href: "#learning" },
  { label: "Workspace", href: "#workspace" },
  { label: "Events", href: "#events" },
  { label: "Tools", href: "#tools" },
];

export const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"}`}>
      <div className={`absolute inset-0 transition-all duration-300 ${isScrolled ? "bg-background/95" : "bg-transparent"}`} aria-hidden="true" />
      
      <div className="relative container-narrow flex h-24 items-center">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="SkillHub home"
          onClick={closeMenu}
        >
          <AnimatedReveal delay={0.1} distance={8}>
            <Logo className="text-2xl sm:text-3xl font-bold tracking-tight" />
          </AnimatedReveal>
          <span className="hidden sm:block h-6 w-px bg-border/50" aria-hidden="true" />
          <AnimatedReveal delay={0.15} distance={8}>
            <span className="text-xs font-medium text-text-muted uppercase tracking-[0.15em] hidden md:inline">
              Learning Studio
            </span>
          </AnimatedReveal>
        </Link>

        <AnimatedReveal delay={0.2} distance={8}>
          <nav className="ml-8 hidden items-center gap-1 sm:flex lg:ml-12" role="navigation" aria-label="Main navigation">
            {navigation.map((item, index) => (
              <AnimatedReveal key={item.href} delay={0.05 * index} distance={6}>
                <a
                  href={item.href}
                  className="relative px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary hover:bg-surface-hover rounded-xl before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-primary before:transition-all before:duration-300 hover:before:w-3/4"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </AnimatedReveal>
            ))}
          </nav>
        </AnimatedReveal>

        <AnimatedReveal delay={0.3} distance={8}>
          <div className="ml-auto hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary hover:bg-surface-hover rounded-xl"
            >
              Sign in
            </Link>

            <AnimatedButton
              variant="primary"
              size="md"
              asChild
              className="relative overflow-hidden"
            >
              <Link to="/register" onClick={closeMenu}>
                Enter SkillHub
                <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </AnimatedButton>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.35} distance={8}>
          <button
            type="button"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="ml-auto flex h-11 w-11 items-center justify-center border border-border text-text-primary transition-colors hover:border-primary hover:bg-surface-hover rounded-xl md:hidden"
          >
            {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </AnimatedReveal>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="border-t border-border bg-background/95 backdrop-blur-md md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="container-narrow flex flex-col py-6" role="navigation" aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <AnimatedReveal key={item.href} delay={0.05 * index} distance={8}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="px-4 py-3.5 text-base font-medium text-text-secondary transition-colors hover:text-text-primary hover:bg-surface-hover rounded-xl border-l-4 border-transparent hover:border-primary"
                >
                  {item.label}
                </a>
              </AnimatedReveal>
            ))}

            <AnimatedReveal delay={0.3} distance={8}>
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <AnimatedButton
                  variant="tertiary"
                  size="md"
                  fullWidth
                  asChild
                >
                  <Link to="/login" onClick={closeMenu}>
                    Sign in
                  </Link>
                </AnimatedButton>
                <AnimatedButton
                  variant="primary"
                  size="md"
                  fullWidth
                  asChild
                >
                  <Link to="/register" onClick={closeMenu}>
                    Enter SkillHub
                    <span aria-hidden="true" className="ml-2">→</span>
                  </Link>
                </AnimatedButton>
              </div>
            </AnimatedReveal>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default LandingNavbar;