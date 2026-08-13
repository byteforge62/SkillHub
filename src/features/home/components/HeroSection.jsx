import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-xl">
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
            <span className="h-2 w-2 rounded-full bg-success" />
            Technical learning workspace
          </div>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Learn.
            <br />
            Build.
            <br />
            <span className="text-primary">Keep moving.</span>
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-text-secondary">
            Discover courses, technical resources, useful tools,
            interactive quizzes, and live events — all in one
            workspace built for people who love technology.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Enter SkillHub
            </Link>

            <a
              href="#resources"
              className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-hover"
            >
              Explore the workspace
            </a>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-border pt-6 font-mono text-xs text-text-muted">
            <span>COURSES</span>
            <span>RESOURCES</span>
            <span>QUIZZES</span>
            <span>EVENTS</span>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-px w-[80%] -translate-x-1/2 bg-border" />
            <div className="absolute left-1/2 top-1/2 h-[80%] w-px -translate-y-1/2 bg-border" />

            <div className="absolute left-[22%] top-[25%] h-2 w-2 rounded-full bg-primary" />
            <div className="absolute left-[68%] top-[31%] h-2 w-2 rounded-full bg-primary" />
            <div className="absolute left-[52%] top-[52%] h-3 w-3 rounded-full bg-primary" />
            <div className="absolute left-[28%] top-[68%] h-2 w-2 rounded-full bg-primary" />
            <div className="absolute left-[76%] top-[73%] h-2 w-2 rounded-full bg-primary" />

            <div className="absolute left-[22%] top-[25%] h-px w-[47%] origin-left rotate-[8deg] bg-border" />
            <div className="absolute left-[52%] top-[52%] h-px w-[28%] origin-left rotate-[-42deg] bg-border" />
            <div className="absolute left-[28%] top-[68%] h-px w-[30%] origin-left rotate-[-28deg] bg-border" />
          </div>

          <div className="absolute left-6 top-6 font-mono text-xs text-text-muted">
            / KNOWLEDGE_SPACE
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <p className="font-mono text-xs text-text-muted">
                ACTIVE NODE
              </p>

              <p className="mt-1 text-lg font-semibold">
                React Fundamentals
              </p>
            </div>

            <span className="font-mono text-xs text-success">
              ● CONNECTED
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
