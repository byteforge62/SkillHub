import { motion } from "framer-motion";
import { AnimatedReveal } from "@/components/animation/AnimatedReveal";
import { SectionBackground } from "./SectionBackground";
import { AnimatedButton } from "@/components/animation/AnimatedButton";
import { Link } from "react-router-dom";

const tools = [
  {
    number: "01",
    name: "JSON Formatter",
    description: "Clean, validate, and inspect structured data.",
    preview: (
      <div className="font-mono text-[11px] leading-6 text-text-secondary">
        <span className="text-primary">&#123;</span>
        <br />
        <span className="pl-4">
          <span className="text-text-muted">"status"</span>
          <span className="text-text-muted">: </span>
          <span className="text-success">"active"</span>
        </span>
        <br />
        <span className="text-primary">&#125;</span>
      </div>
    ),
    link: "/tools/json",
  },
  {
    number: "02",
    name: "Regex Tester",
    description: "Experiment with patterns before putting them into code.",
    preview: (
      <div className="font-mono text-[11px]">
        <span className="text-primary">/</span>
        <span className="text-text-primary">react</span>
        <span className="text-primary">/gi</span>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span className="text-text-muted">3 matches found</span>
        </div>
      </div>
    ),
    link: "/tools/regex",
  },
  {
    number: "03",
    name: "Timestamp Converter",
    description: "Move between Unix timestamps and readable dates.",
    preview: (
      <div className="font-mono">
        <p className="text-xl tracking-[-0.04em] text-text-primary">1723829200</p>
        <div className="mt-3 h-px w-16 bg-border" />
        <p className="mt-3 text-[10px] text-text-muted">16 AUG 2026 &middot; 11:26</p>
      </div>
    ),
    link: "/tools/timestamp",
  },
  {
    number: "04",
    name: "Color Converter",
    description: "Convert between HEX, RGB, HSL, and other formats.",
    preview: (
      <div className="flex items-center gap-4">
        <span className="h-12 w-12 rounded-lg bg-primary" />
        <div className="font-mono text-[10px]">
          <p className="text-text-primary">#4F46E5</p>
          <p className="mt-1 text-text-muted">79 &middot; 70 &middot; 229</p>
        </div>
      </div>
    ),
    link: "/tools/color",
  },
  {
    number: "05",
    name: "Base64 Encoder",
    description: "Encode and decode Base64 strings instantly.",
    preview: (
      <div className="font-mono text-[11px] leading-6 text-text-secondary">
        <span className="text-text-primary">Input:</span> <span className="text-text-muted">"SkillHub"</span>
        <br />
        <span className="text-text-primary">Output:</span> <span className="text-success">U2tpbGxIdWI=</span>
      </div>
    ),
    link: "/tools/base64",
  },
  {
    number: "06",
    name: "JWT Decoder",
    description: "Inspect and validate JSON Web Tokens.",
    preview: (
      <div className="font-mono text-[10px] leading-5 text-text-secondary">
        <span className="text-text-primary">Header:</span> <span className="text-text-muted">&#123; "alg": "HS256" &#125;</span>
        <br />
        <span className="text-text-primary">Payload:</span> <span className="text-text-muted">&#123; "sub": "user123" &#125;</span>
      </div>
    ),
    link: "/tools/jwt",
  },
];

export const ToolsSection = () => {
  return (
    <SectionBackground variant="surface" showDepth depthPosition="bottom-right">
      <div className="container-narrow py-16 lg:py-24 xl:py-32">
        <AnimatedReveal delay={0.1} distance={16}>
          <span className="text-eyebrow text-primary">Developer Utilities</span>
        </AnimatedReveal>
        <AnimatedReveal delay={0.2} distance={20}>
          <h2 id="tools" className="mt-4 max-w-[700px]">Practical tools for daily workflows</h2>
        </AnimatedReveal>
        <AnimatedReveal delay={0.3} distance={16}>
          <p className="mt-6 max-w-[640px] text-lead">
            Stop context-switching to external sites. Common utilities &mdash; formatting, testing, converting &mdash;
            are built into SkillHub so you stay in your learning flow.
          </p>
        </AnimatedReveal>
        <ToolsGrid />
        <AnimatedReveal delay={0.5} distance={16}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-text-muted">
              More utilities can be added as the platform grows.
            </span>
            <span className="text-sm text-text-secondary">
              Learn &rarr; experiment &rarr; keep going.
            </span>
          </div>
        </AnimatedReveal>
      </div>
    </SectionBackground>
  );
};

const ToolsGrid = () => (
  <AnimatedReveal delay={0.4} distance={16}>
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool, index) => (
        <motion.article
          key={tool.name}
          className="group relative rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-hover"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="p-6">
            <span className="font-mono text-[9px] tracking-[0.16em] text-text-muted">{tool.number}</span>

            <div className="mt-8 flex min-h-[140px] items-center border border-border bg-background p-5 transition-colors duration-300 group-hover:border-primary/40">
              {tool.preview}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-text-primary">{tool.name}</h3>
              <p className="mt-3 max-w-[260px] text-sm leading-6 text-text-secondary">{tool.description}</p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-surface-hover flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-text-muted">Available in SkillHub</span>
            <AnimatedButton
              variant="primary"
              size="sm"
              asChild
            >
              <Link to={tool.link}>
                Try it <span aria-hidden="true">&rarr;</span>
              </Link>
            </AnimatedButton>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-px bg-primary"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.4 }}
          />
        </motion.article>
      ))}
    </div>
  </AnimatedReveal>
);

export default ToolsSection;
