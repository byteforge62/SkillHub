const lessons = [
  { number: "01", title: "Components", status: "complete" },
  { number: "02", title: "Props", status: "complete" },
  { number: "03", title: "State", status: "active" },
  { number: "04", title: "Hooks", status: "upcoming" },
  { number: "05", title: "API Integration", status: "upcoming" },
];


export const LearningPathSection = () => {
  return (
    <section
      id="learning"
      className="border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              02 / Learning
            </p>

            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
              Your progress should feel visible.
            </h2>

            <p className="mt-5 max-w-md leading-7 text-text-secondary">
              Follow structured learning paths, complete lessons,
              test your understanding, and always know what comes next.
            </p>

            <div className="mt-10">
              <p className="font-mono text-xs text-text-muted">
                REACT / FUNDAMENTALS
              </p>

              <div className="mt-3 h-1 overflow-hidden bg-surface-hover">
                <div className="h-full w-[72%] bg-primary" />
              </div>

              <div className="mt-3 flex justify-between font-mono text-xs">
                <span className="text-text-secondary">
                  12 / 18 lessons
                </span>

                <span className="text-primary">72%</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[11px] top-4 bottom-4 w-px bg-border" />

            <div className="space-y-2">
              {lessons.map((lesson) => (
                <div
                  key={lesson.number}
                  className="relative grid grid-cols-[24px_50px_1fr] items-center gap-4 py-4"
                >
                  <span
                    className={[
                      "relative z-10 h-2.5 w-2.5 rounded-full",
                      lesson.status === "complete"
                        ? "bg-success"
                        : lesson.status === "active"
                          ? "bg-primary"
                          : "bg-border",
                    ].join(" ")}
                  />

                  <span className="font-mono text-xs text-text-muted">
                    {lesson.number}
                  </span>

                  <span
                    className={[
                      "text-lg",
                      lesson.status === "active"
                        ? "font-semibold text-text-primary"
                        : "text-text-secondary",
                    ].join(" ")}
                  >
                    {lesson.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
