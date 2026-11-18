import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedReveal } from "@/components/animation/AnimatedReveal";
import { SectionBackground } from "./SectionBackground";

const learningPaths = [
  {
    title: "Frontend Development",
    description: "Master modern frontend from fundamentals to advanced patterns.",
    courses: ["JavaScript Essentials", "React Fundamentals", "Advanced React Patterns", "Next.js Applications"],
    current: 2,
    total: 4,
    color: "#2D5A3D",
    icon: "code",
  },
  {
    title: "Full-Stack Engineering",
    description: "Build complete applications with frontend, backend, and database.",
    courses: ["Node.js Foundations", "Database Design", "API Development", "Deployment & DevOps"],
    current: 1,
    total: 4,
    color: "#3A7A55",
    icon: "server",
  },
  {
    title: "TypeScript Mastery",
    description: "Type-safe development from basics to advanced type gymnastics.",
    courses: ["TypeScript Basics", "Advanced Types", "Generics & Utility Types", "Real-World Patterns"],
    current: 0,
    total: 4,
    color: "#4ADE80",
    icon: "typescript",
  },
];

const pathCourses = [
  { name: "JavaScript Essentials", status: "completed", progress: 100 },
  { name: "React Fundamentals", status: "in-progress", progress: 68 },
  { name: "Advanced React Patterns", status: "locked", progress: 0 },
  { name: "Next.js Applications", status: "locked", progress: 0 },
];

const icons = {
  code: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  server: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  typescript: (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
};

export const LearningPathSection = () => {
  return (
    <SectionBackground variant="green-tint" showDepth depthPosition="top-left">
      <div className="container-narrow py-16 lg:py-24 xl:py-32">
        {/* Intro */}
        <AnimatedReveal delay={0.1} distance={16}>
          <span className="text-eyebrow text-primary">Structured Progress</span>
        </AnimatedReveal>
        <AnimatedReveal delay={0.2} distance={20}>
          <h2 id="learning" className="mt-4 max-w-[700px]">Learning paths that guide you forward</h2>
        </AnimatedReveal>
        <AnimatedReveal delay={0.3} distance={16}>
          <p className="mt-6 max-w-[640px] text-lead">
            Stop wondering what to learn next. SkillHub learning paths sequence courses,
            projects, and assessments into a clear progression. Track your progress,
            unlock new content, and build a portfolio as you go.
          </p>
        </AnimatedReveal>

        {/* Progression Illustration */}
        <AnimatedReveal delay={0.35} distance={20}>
          <LearningPathIllustration />
        </AnimatedReveal>

        {/* Learning Path Cards */}
        <AnimatedReveal delay={0.4} distance={16}>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {learningPaths.map((path, index) => (
              <LearningPathCard key={path.title} path={path} index={index} />
            ))}
          </div>
        </AnimatedReveal>

        {/* Featured Path Detail */}
        <AnimatedReveal delay={0.5} distance={16}>
          <FeaturedPathDetail courses={pathCourses} />
        </AnimatedReveal>
      </div>
    </SectionBackground>
  );
};

const LearningPathCard = ({ path, index }) => (
  <motion.article
    className="group relative rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-hover"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 text-primary">
          {path.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-text-primary">{path.title}</h3>
          <p className="mt-2 text-sm leading-6 text-text-secondary">{path.description}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {path.courses.map((course, i) => (
          <div key={course} className="flex items-center gap-3 p-3 rounded-lg bg-surface-hover transition-colors group-hover:bg-surface">
            <div className={`flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center ${
              i < path.current ? "bg-success/10 text-success"
              : i === path.current ? "bg-primary/10 text-primary"
              : "bg-border text-text-muted"
            }`}>
              {i < path.current ? (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : i === path.current ? (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                </svg>
              )}
            </div>
            <span className="text-sm font-medium text-text-primary truncate">{course}</span>
            {i === path.current && (
              <span className="ml-auto text-xs font-medium text-primary px-2 py-0.5 rounded bg-primary/10">Current</span>
            )}
            {i < path.current && (
              <span className="ml-auto text-xs font-medium text-success px-2 py-0.5 rounded bg-success/10">Done</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-muted">Progress</span>
          <span className="font-mono text-primary">{Math.round((path.current / path.total) * 100)}%</span>
        </div>
        <div className="mt-2 h-2 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(path.current / path.total) * 100}%` }}
            transition={{ delay: 0.6 + index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  </motion.article>
);

const FeaturedPathDetail = ({ courses }) => (
  <motion.div
    className="mt-12 rounded-2xl border border-border bg-surface overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay: 0.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="p-6 border-b border-border bg-surface-hover">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-eyebrow text-text-muted">Featured path</p>
          <h3 className="mt-1 text-xl font-semibold text-text-primary">Frontend Development</h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-text-muted">
          <span>{courses.length} courses</span>
          <span className="h-4 w-px bg-border" />
          <span className="font-mono text-primary">58% complete</span>
        </div>
      </div>
    </div>

    <div className="p-6">
      <div className="space-y-3">
        {courses.map((course, index) => (
          <motion.div
            key={course.name}
            className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
              course.status === "completed" ? "bg-success/5"
              : course.status === "in-progress" ? "bg-primary/5"
              : "hover:bg-surface-hover"
            }`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
          >
            <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
              course.status === "completed" ? "bg-success/10 text-success"
              : course.status === "in-progress" ? "bg-primary/10 text-primary"
              : "bg-border text-text-muted"}`}>
              {course.status === "completed" && (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {course.status === "in-progress" && (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              )}
              {course.status === "locked" && (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{course.name}</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${course.progress}%` }} />
                </div>
                <span className="font-mono text-xs text-text-muted w-12 text-right">{course.progress}%</span>
              </div>
            </div>
            {course.status === "in-progress" && (
              <span className="text-xs font-medium text-primary px-2 py-0.5 rounded bg-primary/10">Current</span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span className="text-sm text-text-muted">
          Start anywhere and explore at your own pace.
        </span>
        <Link to="/learning" className="inline-flex items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-primary">
          View all paths <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  </motion.div>
);

export default LearningPathSection;

// Inline Learning Path Illustration
const LearningPathIllustration = () => (
  <div className="relative w-full max-w-4xl mx-auto" aria-hidden="true">
    <svg viewBox="0 0 520 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="Learning path progression diagram">
      <defs>
        <linearGradient id="pathGradLP" x1="0" y1="280" x2="520" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2D5A3D" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#3A7A55" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.6" />
        </linearGradient>
        <filter id="nodeGlowLP" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connecting path */}
      <motion.path
        d="M60,200 C100,160 150,100 180,80 C210,60 280,90 340,120 C400,150 440,200 460,220"
        stroke="url(#pathGradLP)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Stage nodes */}
      <StageNode cx={60} cy={200} r={28} color="#2D5A3D" progress={100} label="Foundations" icon={<BookIcon />} />
      <StageNode cx={180} cy={80} r={24} color="#3A7A55" progress={75} label="Core Skills" icon={<CodeIcon />} />
      <StageNode cx={340} cy={120} r={26} color="#4ADE80" progress={30} label="Advanced" icon={<ArrowIcon />} />
      <StageNode cx={460} cy={220} r={22} color="#C1734A" progress={0} label="Mastery" icon={<StarIcon />} />
    </svg>
  </div>
);

const StageNode = ({ cx, cy, r, color, progress, label, icon }) => (
  <g className="stage-node">
    <motion.circle
      cx={cx}
      cy={cy}
      r={r + 4}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeDasharray={`${progress * 2.01}, 201`}
      strokeDashoffset="0"
      strokeLinecap="round"
      filter="url(#nodeGlowLP)"
      initial={{ strokeDashoffset: 201, opacity: 0 }}
      animate={{ strokeDashoffset: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="#FBF8F3"
      stroke={color}
      strokeWidth="2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.circle
      cx={cx}
      cy={cy}
      r={r * 0.5}
      fill={progress > 0 ? color : "transparent"}
      stroke={progress > 0 ? "none" : color}
      strokeWidth={progress > 0 ? 0 : 2}
      strokeDasharray={progress > 0 ? "0" : `${progress * 0.75}, 75`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    />
    <g transform={"translate(" + (cx - 10) + ", " + (cy - 10) + ")"}>{icon}</g>
    <motion.text
      x={cx}
      y={cy + r + 24}
      textAnchor="middle"
      fontFamily="Space Grotesk, sans-serif"
      fontSize="11"
      fontWeight="600"
      fill="#1A1F1E"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {label}
    </motion.text>
    <motion.text
      x={cx}
      y={cy + r + 38}
      textAnchor="middle"
      fontFamily="JetBrains Mono, monospace"
      fontSize="9"
      fill={color}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.6 }}
    >
      {progress > 0 ? `${progress}%` : "Locked"}
    </motion.text>
  </g>
);

const BookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D5A3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 17H20" />
    <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20" />
  </svg>
);

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3A7A55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 16l4 4 6-6" />
    <path d="M16 16l-4 4-6-6" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 15l-6-6-6 6" />
    <path d="M12 3v18" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#C1734A" stroke="#C1734A" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
