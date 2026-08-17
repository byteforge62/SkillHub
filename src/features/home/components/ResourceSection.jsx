import { motion } from "framer-motion";

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
];

export const ResourceSection = () => {
  return (
    <section id="resources" className="relative">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16">

        {/* Intro */}

        <motion.div
          className="max-w-[620px]"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <h2 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
            Resources
          </h2>

          <p className="mt-4 max-w-[560px] text-base leading-7 text-text-secondary sm:text-[17px]">
            There is always something worth exploring. Find documentation,
            articles, projects, and technical knowledge that can help you
            understand what you're learning.
          </p>
        </motion.div>

        {/* Resource list */}

        <div className="mt-16 border-t border-border">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.title}
              href="#"
              className="group grid gap-5 border-b border-border py-8 transition-colors duration-200 hover:bg-surface/40 sm:grid-cols-[1fr_1.2fr_auto] sm:items-center sm:px-4"
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.07,
              }}
            >
              {/* Resource */}

              <div>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-text-primary">
                  {resource.title}
                </h3>

                <div className="mt-2 flex items-center gap-3">
                  <span className="text-xs text-text-muted">
                    {resource.type}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-border" />

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

              <span className="flex h-8 w-8 items-center justify-center text-text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary">
                →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Bottom */}

        <motion.div
          className="mt-7 flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.25,
            duration: 0.5,
          }}
        >
          <span className="text-xs text-text-muted">
            Documentation · Articles · Projects
          </span>

          <a
            href="#"
            className="text-sm font-medium text-text-primary transition-colors hover:text-primary"
          >
            Browse all resources →
          </a>
        </motion.div>
      </div>
    </section>
  );
};