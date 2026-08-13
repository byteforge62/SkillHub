import { Link } from "react-router-dom";

import Logo from "@/components/ui/Logo";

export const LandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#resources"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Resources
          </a>

          <a
            href="#learning"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Learning
          </a>

          <a
            href="#workspace"
            className="text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Workspace
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary sm:block"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Enter SkillHub
          </Link>
        </div>
      </div>
    </header>
  )
}
