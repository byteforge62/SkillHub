import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AnimatedButton } from "@/components/animation/AnimatedButton";

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

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Full-width background bar */}
      <div className="absolute inset-0 bg-background/95" aria-hidden="true" />
      
      <div className="relative container-narrow flex h-22 items-center">
        {/* Brand */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="SkillHub home"
          onClick={closeMenu}
        >
          <Logo className="text-2xl sm:text-3xl" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-8 hidden items-center gap-1 sm:flex lg:ml-12" role="navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-text-secondary transition-colors duration-150 hover:text-text-primary hover:bg-surface-hover rounded-lg"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="ml-auto hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-text-secondary transition-colors duration-150 hover:text-text-primary hover:bg-surface-hover rounded-lg"
          >
            Sign in
          </Link>

          <AnimatedButton
            variant="primary"
            size="md"
            asChild
          >
            <Link to="/register" onClick={closeMenu}>
              Enter SkillHub
              <span aria-hidden="true">→</span>
            </Link>
          </AnimatedButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="ml-auto flex h-10 w-10 items-center justify-center border border-border text-text-primary transition-colors hover:border-primary hover:bg-surface-hover rounded-lg md:hidden"
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          className="border-t border-border bg-background md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="container-narrow flex flex-col py-6" role="navigation" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="px-3 py-3 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary hover:bg-surface-hover rounded-lg"
              >
                {item.label}
              </a>
            ))}

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
                  <span aria-hidden="true">→</span>
                </Link>
              </AnimatedButton>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default LandingNavbar;