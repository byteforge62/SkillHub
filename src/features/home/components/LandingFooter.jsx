import { Link } from "react-router-dom";

export const LandingFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.4fr_2fr] lg:gap-20">

          {/* Brand */}

          <div>
            <Link
              to="/"
              className="inline-flex text-xl font-semibold tracking-[-0.04em] text-text-primary"
            >
              SkillHub
            </Link>

            <p className="mt-5 max-w-[340px] text-sm leading-7 text-text-secondary">
              A technical learning platform for discovering resources,
              practising skills, connecting with the community, and
              building knowledge.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-40" />
                <span className="relative h-2 w-2 rounded-full bg-success" />
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted">
                Platform active
              </span>
            </div>
          </div>

          {/* Navigation */}

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">

            {/* Explore */}

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">
                Explore
              </p>

              <nav className="mt-5 flex flex-col gap-3 text-sm">
                <a
                  href="#resources"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  Resources
                </a>

                <a
                  href="#learning"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  Learning
                </a>

                <a
                  href="#workspace"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  Workspace
                </a>

                <a
                  href="#events"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  Events
                </a>

                <a
                  href="#tools"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  Tools
                </a>
              </nav>
            </div>

            {/* Community */}

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">
                Community
              </p>

              <nav className="mt-5 flex flex-col gap-3 text-sm">
                <a
                  href="#resources"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  Discover
                </a>

                <a
                  href="#events"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  Events
                </a>

                <a
                  href="#"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  Discussions
                </a>

                <a
                  href="#"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  Contributions
                </a>
              </nav>
            </div>

            {/* Product */}

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">
                Product
              </p>

              <nav className="mt-5 flex flex-col gap-3 text-sm">
                <Link
                  to="/login"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  Create account
                </Link>

                <a
                  href="#"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  About
                </a>

                <a
                  href="#"
                  className="text-text-secondary transition-colors hover:text-text-primary"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* =====================================================
            LEGAL / SYSTEM BAR
        ====================================================== */}

        <div className="flex flex-col gap-4 border-t border-border py-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-text-primary">
              SkillHub
            </span>

            <span className="h-px w-6 bg-border" />

            <span>
              © {year}
            </span>

            <span className="hidden h-3 w-px bg-border sm:block" />

            <a
              href="#"
              className="transition-colors hover:text-text-primary"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition-colors hover:text-text-primary"
            >
              Terms
            </a>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em]">
              Learn
            </span>

            <span className="h-px w-5 bg-border" />

            <span className="font-mono text-[9px] uppercase tracking-[0.16em]">
              Practise
            </span>

            <span className="h-px w-5 bg-border" />

            <span className="font-mono text-[9px] uppercase tracking-[0.16em]">
              Connect
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};