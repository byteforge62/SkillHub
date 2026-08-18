import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Logo from "@/components/ui/Logo";

const navigation = [
  {
    label: "Resources",
    href: "#resources",
  },
  {
    label: "Learning",
    href: "#learning",
  },
  {
    label: "Workspace",
    href: "#workspace",
  },
];

export const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="relative z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center px-6 sm:px-8 lg:px-12 xl:px-16">

        {/* Brand */}

        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="SkillHub home"
          onClick={closeMenu}
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}

        <nav className="ml-12 hidden items-center gap-7 md:flex lg:ml-16">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-secondary transition-colors duration-150 hover:text-text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}

        <div className="ml-auto hidden items-center gap-5 md:flex">
          <Link
            to="/login"
            className="text-sm font-medium text-text-secondary transition-colors duration-150 hover:text-text-primary"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="inline-flex h-10 items-center gap-2 border border-primary bg-primary px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-primary-hover"
          >
            Enter SkillHub
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}

        <button
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((previous) => !previous)}
          className="ml-auto flex h-10 w-10 items-center justify-center border border-border text-text-primary transition-colors hover:border-primary md:hidden"
        >
          {isOpen ? (
            <X size={19} aria-hidden="true" />
          ) : (
            <Menu size={19} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}

      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex w-full max-w-[1440px] flex-col px-6 py-5 sm:px-8">

            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-border py-4 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {item.label}
              </a>
            ))}

            <div className="flex flex-col gap-3 pt-5">

              <Link
                to="/login"
                onClick={closeMenu}
                className="flex h-11 items-center justify-center border border-border text-sm font-medium text-text-primary transition-colors hover:border-primary"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="flex h-11 items-center justify-center gap-2 border border-primary bg-primary text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                Enter SkillHub
                <span aria-hidden="true">→</span>
              </Link>

            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;