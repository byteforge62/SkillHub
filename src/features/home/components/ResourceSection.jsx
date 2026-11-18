import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedReveal } from "@/components/animation/AnimatedReveal";
import { SectionBackground } from "./SectionBackground";

// Featured resource (larger card)
const featuredResource = {
  title: "React Documentation",
  description: "Official references and guides for understanding and building with React. From hooks to server components, everything you need to master the library.",
  type: "Documentation",
  technology: "React",
  readTime: "15 min read",
  featured: true,
};

// Supporting resources
const resources = [
  {
    title: "Understanding CSS Architecture",
    description: "Practical approaches to structuring styles as a project grows. Learn methodologies like BEM, ITCSS, and modern CSS-in-JS patterns.",
    type: "Article",
    technology: "CSS",
    readTime: "8 min read",
  },
  {
    title: "Open Source Projects to Study",
    description: "Explore real repositories and see how experienced developers structure working projects. Curated list with explanations.",
    type: "Repository",
    technology: "Open Source",
    readTime: "12 min read",
  },
  {
    title: "JavaScript Event Loop Explained",
    description: "A practical explanation of the call stack, queues, and asynchronous execution. Visual diagrams included.",
    type: "Article",
    technology: "JavaScript",
    readTime: "10 min read",
  },
  {
    title: "TypeScript Handbook",
    description: "Comprehensive guide to TypeScript's type system and best practices. From basics to advanced patterns.",
    type: "Documentation",
    technology: "TypeScript",
    readTime: "20 min read",
  },
  {
    title: "Designing Accessible Components",
    description: "Patterns for building inclusive UI that works for everyone. WCAG guidelines applied to real components.",
    type: "Article",
    technology: "Accessibility",
    readTime: "12 min read",
  },
];

const typeIcons = {
  Documentation: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  ),
  Article: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  ),
  Repository: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
};

const typeColors = {
  Documentation: "bg-primary/10 text-primary",
  Article: "bg-accent/10 text-accent",
  Repository: "bg-success/10 text-success",
};

export const ResourceSection = () => {
  return (
    <SectionBackground variant="editorial" showDepth depthPosition="bottom-right">
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

        <AnimatedReveal delay={0.35} distance={16}>
          <FeaturedResourceCard resource={featuredResource} />
        </AnimatedReveal>

        <AnimatedReveal delay={0.4} distance={16}>
          <ResourceGrid resources={resources} />
        </AnimatedReveal>

        <AnimatedReveal delay={0.5} distance={16}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-text-muted">Documentation &middot; Articles &middot; Projects &middot; Guides</span>
            <Link to="#" className="inline-flex items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-primary">
              Browse all resources
              <span aria-hidden="true" className="transition-transform hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </AnimatedReveal>
      </div>
    </SectionBackground>
  );
};
const FeaturedResourceCard = ({ resource }) => (
  <article className="relative overflow-hidden rounded-2xl border border-border bg-surface hover:border-primary/30 transition-all duration-300">
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-success" />
    
    <div className="p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${typeColors[resource.type]}`}>
              {typeIcons[resource.type]}
              {resource.type}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-border" aria-hidden="true" />
            <span className="text-xs text-text-muted">{resource.technology}</span>
          </div>
          
          <h3 className="mt-3 text-2xl lg:text-3xl font-semibold leading-tight text-text-primary">
            {resource.title}
          </h3>
          
          <p className="mt-4 text-lg leading-7 text-text-secondary max-w-2xl">
            {resource.description}
          </p>
          
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5 font-mono">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {resource.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Official reference
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 mt-4 lg:mt-0">
          <Link
            to="#"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors duration-200 group"
          >
            Read now
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  </article>
);

const ResourceGrid = ({ resources }) => (
  <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {resources.map((resource, index) => (
      <motion.article
        key={resource.title}
        className="group relative overflow-hidden rounded-2xl border border-border bg-surface hover:border-primary/30 hover:shadow-hover transition-all duration-300"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-success opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[resource.type]}`}>
              {typeIcons[resource.type]}
              {resource.type}
            </span>
            <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
            <span className="text-xs text-text-muted">{resource.technology}</span>
          </div>
          
          <h3 className="mt-3 text-lg font-semibold leading-tight text-text-primary group-hover:text-primary transition-colors">
            {resource.title}
          </h3>
          
          <p className="mt-3 text-sm leading-6 text-text-secondary line-clamp-2">
            {resource.description}
          </p>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted">{resource.readTime}</span>
            <Link
              to="#"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-primary transition-colors hover:text-primary group"
            >
              Read
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>
      </motion.article>
    ))}
  </div>
);

export default ResourceSection;
