import { Link } from "react-router-dom";

import Logo from "@/components/ui/Logo";

export const LandingNavbar = () => {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* Brand */}
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label="SkillHub home"
        >
          <Logo />
        </Link>

        {/* Navigation */}
        <nav className="ml-12 hidden items-center gap-7 md:flex lg:ml-16">
          <a
            href="#resources"
            className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-secondary transition-colors duration-150 hover:text-text-primary"
          >
            Resources
          </a>

          <a
            href="#learning"
            className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-secondary transition-colors duration-150 hover:text-text-primary"
          >
            Learning
          </a>

          <a
            href="#workspace"
            className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-secondary transition-colors duration-150 hover:text-text-primary"
          >
            Workspace
          </a>
        </nav>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-5">
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
      </div>
    </header>
  );
};