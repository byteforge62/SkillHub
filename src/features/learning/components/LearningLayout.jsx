import { useState } from "react";

export const LearningLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:bg-white/10"
              aria-label="Toggle course navigation"
            >
              ☰
            </button>

            <div>
              <p className="text-xs text-slate-400">Currently learning</p>

              <h1 className="max-w-[260px] truncate text-sm font-semibold sm:max-w-[500px]">
                React Fundamentals
              </h1>
            </div>
          </div>

          {/* Right */}
          <div className="hidden items-center gap-4 sm:flex">
            <div className="text-right">
              <p className="text-xs text-slate-400">Course progress</p>
              <p className="text-sm font-semibold">0%</p>
            </div>

            <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-0 rounded-full bg-blue-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Learning Area */}
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-slate-950 lg:block">
            <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="border-b border-white/10 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Course content
                </p>

                <h2 className="mt-2 text-lg font-semibold">
                  React Fundamentals
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  0 of 1 lessons completed
                </p>
              </div>

              {/* Temporary section */}
              <div className="p-3">
                <div className="mb-2 px-2 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Section 1
                </div>

                <button
                  type="button"
                  className="w-full rounded-xl bg-blue-500/10 px-3 py-3 text-left transition hover:bg-blue-500/15"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-400/30 text-xs">
                      1
                    </span>

                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        Understanding React Components
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        25 min
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </aside>
        )}

        {/* Content */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 lg:px-12">
            {/* Breadcrumb */}
            <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
              <span>React Fundamentals</span>
              <span>/</span>
              <span className="text-slate-300">
                Understanding React Components
              </span>
            </div>

            {/* Lesson Header */}
            <div className="mb-8">
              <div className="mb-3 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-300">
                Lesson 1
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Understanding React Components
              </h2>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-400">
                Learn how React components work and how to build reusable UI.
              </p>
            </div>

            {/* Lesson Content Placeholder */}
            <section className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="leading-7 text-slate-300">
                  React components are reusable building blocks of a React
                  application.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <div className="border-b border-white/10 px-4 py-3">
                  <span className="text-xs font-medium text-slate-400">
                    JSX
                  </span>
                </div>

                <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-300">
                  <code>{`function Welcome() {
  return <h1>Hello React</h1>;
}`}</code>
                </pre>
              </div>

              <div className="rounded-2xl border border-blue-400/20 bg-blue-400/5 p-5">
                <p className="text-sm font-semibold text-blue-300">
                  Remember
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Keep components small and focused on one responsibility.
                </p>
              </div>
            </section>

            {/* Bottom Navigation */}
            <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6">
              <button
                type="button"
                disabled
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-600"
              >
                ← Previous
              </button>

              <button
                type="button"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
              >
                Mark Complete →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

