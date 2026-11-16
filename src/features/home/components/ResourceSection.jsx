import { Link } from "react-router-dom";

const resources = [
  {
    title: "React Documentation",
    description:
      "Official references and guides for understanding and building with React.",
    type: "Documentation",
    technology: "React",
  },
  {
    title: "Understanding CSS Architecture",
    description:
      "Practical approaches to structuring styles as a project grows.",
    type: "Article",
    technology: "CSS",
  },
  {
    title: "Open Source Projects",
    description:
      "Explore real repositories and see how developers structure working projects.",
    type: "Repository",
    technology: "Open Source",
  },
  {
    title: "JavaScript Event Loop Explained",
    description:
      "A practical explanation of the call stack, queues, and asynchronous execution.",
    type: "Article",
    technology: "JavaScript",
  },
];

export const ResourceSection = () => {
  return (
    <section id="resources" className="relative">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16">

        {/* Intro */}

        <div className="max-w-[620px]">
          <h2 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
            Resources
          </h2>

          <p className="mt-4 max-w-[560px] text-base leading-7 text-text-secondary sm:text-[17px]">
            There is always something worth exploring. Find documentation,
            articles, projects, and technical knowledge that can help you
            understand what you're learning.
          </p>
        </div>

        {/* Resource list */}

        <div className="mt-16 border-t border-border">
          {resources.map((resource) => (
            <Link
              key={resource.title}
              to="#"
              className="group grid gap-5 border-b border-border py-8 transition-colors duration-200 hover:bg-surface/40 sm:grid-cols-[1fr_1.2fr_auto] sm:items-center sm:px-4"
            >
              {/* Resource */}

              <div>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-text-primary transition-colors duration-200 group-hover:text-primary">
                  {resource.title}
                </h3>

                <div className="mt-2 flex items-center gap-3">
                  <span className="text-xs text-text-muted">
                    {resource.type}
                  </span>

                  <span
                    className="h-1 w-1 rounded-full bg-border"
                    aria-hidden="true"
                  />

                  <span className="text-xs text-text-muted">
                    {resource.technology}
                  </span>
                </div>
              </div>

              {/* Description */}

              <p className="max-w-[500px] text-sm leading-6 text-text-secondary">
                {resource.description}
              </p>

              {/* Arrow */}

              <span
                aria-hidden="true"
                className="flex h-8 w-8 items-center justify-center text-text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
              >
                →
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom */}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-text-muted">
            Documentation · Articles · Projects · Guides
          </span>

          <Link
            to="#"
            className="text-sm font-medium text-text-primary transition-colors hover:text-primary"
          >
            Browse all resources →
          </Link>
        </div>
      </div>
    </section>
  );
};