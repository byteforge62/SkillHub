const resources = [
  {
    time: "14:32",
    title: "React Server Components",
    type: "Documentation",
    source: "react.dev",
    votes: "+24",
  },
  {
    time: "13:51",
    title: "TanStack Query Patterns",
    type: "Community Resource",
    source: "github.com",
    votes: "+17",
  },
  {
    time: "12:08",
    title: "Advanced CSS Architecture",
    type: "Article",
    source: "web.dev",
    votes: "+31",
  },
  {
    time: "11:42",
    title: "Understanding Node.js Streams",
    type: "Guide",
    source: "nodejs.org",
    votes: "+12",
  },
];

export const ResourceSection = () => {
  return (
    <section
      id="resources"
      className="border-b border-border"
    >
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              01 / Resources
            </p>

            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
              Find useful things without digging through noise.
            </h2>

            <p className="mt-5 max-w-md leading-7 text-text-secondary">
              A focused stream for courses, documentation, articles,
              repositories, and resources shared by the community.
            </p>
          </div>

          <div className="border-y border-border">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="group grid grid-cols-[70px_1fr_auto] items-center gap-4 border-b border-border py-5 last:border-b-0"
              >
                <span className="font-mono text-xs text-text-muted">
                  {resource.time}
                </span>

                <div>
                  <p className="font-medium text-text-primary transition-colors group-hover:text-primary">
                    {resource.title}
                  </p>

                  <p className="mt-1 text-xs text-text-muted">
                    {resource.type} · {resource.source}
                  </p>
                </div>

                <span className="font-mono text-xs text-text-secondary">
                  ↑ {resource.votes.replace("+", "")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
