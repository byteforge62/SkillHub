import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedReveal } from "@/components/animation/AnimatedReveal";
import { SectionBackground } from "./SectionBackground";

const resources = [
  {
    title: "React Documentation",
    description: "Official references and guides for understanding and building with React.",
    type: "Documentation",
    technology: "React",
  },
  {
    title: "Understanding CSS Architecture",
    description: "Practical approaches to structuring styles as a project grows.",
    type: "Article",
    technology: "CSS",
  },
  {
    title: "Open Source Projects",
    description: "Explore real repositories and see how developers structure working projects.",
    type: "Repository",
    technology: "Open Source",
  },
  {
    title: "JavaScript Event Loop Explained",
    description: "A practical explanation of the call stack, queues, and asynchronous execution.",
    type: "Article",
    technology: "JavaScript",
  },
  {
    title: "TypeScript Handbook",
    description: "Comprehensive guide to TypeScript's type system and best practices.",
    type: "Documentation",
    technology: "TypeScript",
  },
  {
    title: "Designing Accessible Components",
    description: "Patterns for building inclusive UI that works for everyone.",
    type: "Article",
    technology: "Accessibility",
  },
];

export const ResourceSection = () => {
  return (
    <SectionBackground variant="surface" showDepth depthPosition="bottom-right">
      <div className="container-narrow py-16 lg:py-24 xl:py-32">
        <AnimatedReveal delay={0.1} distance={16}>
          <span className="text-eyebrow text-primary">Discover & Learn</span>
        </AnimatedReveal>
        <AnimatedReveal delay={0.2} distance={20}>
          <h2 id="resources" className="mt-4 max-w-[700px]">Curated resources for every step</h2>
        </AnimatedReveal>
        <AnimatedReveal delay={0.3} distance={16}>
          <p className="mt-6 max-w-[640px] text-lead">
            Documentation, articles, and real-world projects hand-picked to complement
            your learning path. Filter by technology or browse the full library.
          </p>
        </AnimatedReveal>
        <ResourceList />
        <AnimatedReveal delay={0.5} distance={16}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-text-muted">Documentation &middot; Articles &middot; Projects &middot; Guides</span>
            <Link to="#" className="text-sm font-medium text-text-primary transition-colors hover:text-primary">Browse all resources &rarr;</Link>
          </div>
        </AnimatedReveal>
      </div>
    </SectionBackground>
  );
};

const ResourceList = () => (
  <AnimatedReveal delay={0.4} distance={16}>
    <div className="mt-12 divide-y divide-border">
      {resources.map((resource, index) => (
        <motion.article
          key={resource.title}
          className="group py-8 sm:grid sm:grid-cols-[1fr_2fr_auto] sm:items-start sm:gap-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary">
                {resource.type === "Documentation" && (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                )}
                {resource.type === "Article" && (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                )}
                {resource.type === "Repository" && (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-eyebrow text-primary">{resource.type}</span>
                <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
                <span className="text-xs text-text-muted">{resource.technology}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                {resource.title}
              </h3>
            </div>
          </div>

          <p className="mt-4 max-w-[540px] text-base leading-7 text-text-secondary">
            {resource.description}
          </p>

          <div className="mt-4 flex items-center justify-start sm:justify-end">
            <Link to="#" className="inline-flex items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-primary">
              View resource
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  </AnimatedReveal>
);

export default ResourceSection;
