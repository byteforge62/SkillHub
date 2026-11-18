import { motion } from "framer-motion";

/**
 * A meaningful product preview showing actual SkillHub interface elements:
 * - Course card with progress
 * - Learning path sidebar
 * - Code/quiz snippet
 * This represents real functionality, not fake analytics.
 */
export const CoursePreview = () => {
  const currentCourse = {
    title: "React Fundamentals",
    instructor: "Sarah Chen",
    progress: 68,
    lessons: 24,
    completed: 16,
  };

  const learningPath = [
    { name: "JavaScript Essentials", status: "completed", progress: 100 },
    { name: "React Fundamentals", status: "in-progress", progress: 68 },
    { name: "Advanced React Patterns", status: "locked", progress: 0 },
    { name: "Full-Stack Project", status: "locked", progress: 0 },
  ];

  return (
    <div className="relative aspect-[4/3] max-w-[640px] mx-auto">
      <motion.div
        className="relative rounded-2xl border border-border bg-surface overflow-hidden shadow-[0_20px_50px_rgba(26,31,30,0.12)]"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <CourseHeader />
        <CourseInfo course={currentCourse} />
        <LearningPathSidebar items={learningPath} />
      </motion.div>
      <FloatingCodePreview />
    </div>
  );
};

const CourseHeader = () => (
  <div className="relative aspect-video overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
    <div className="relative h-full flex items-center justify-center">
      <div className="text-center p-8">
        <motion.div
          className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm p-3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </motion.div>
      </div>
    </div>
  </div>
);

const CourseInfo = ({ course }) => (
  <div className="p-5 sm:p-6">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div>
        <p className="text-eyebrow text-primary">In progress</p>
        <h3 className="mt-1.5 text-xl font-semibold text-text-primary">{course.title}</h3>
        <p className="mt-1 text-sm text-text-secondary">with {course.instructor}</p>
      </div>
      <div className="flex items-center gap-4 text-sm text-text-muted">
        <span>{course.lessons} lessons</span>
        <span className="h-4 w-px bg-border" />
        <span>{course.completed} completed</span>
      </div>
    </div>
    <div className="mt-5">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-medium text-text-primary">Your progress</span>
        <span className="font-mono text-primary">{course.progress}%</span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${course.progress}%` }}
          transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
    <motion.button
      className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
      </svg>
      Continue lesson 17
    </motion.button>
  </div>
);

const LearningPathSidebar = ({ items }) => (
  <div className="border-t border-border bg-surface-hover">
    <div className="p-4">
      <p className="text-eyebrow text-text-muted mb-3">Your learning path</p>
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            className="flex items-center gap-3 p-3 rounded-lg transition-colors group"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.08, duration: 0.4 }}
            whileHover={{ backgroundColor: "var(--color-surface)" }}
          >
            <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
              item.status === "completed" ? "bg-success/10 text-success"
              : item.status === "in-progress" ? "bg-primary/10 text-primary"
              : "bg-border text-text-muted"}`}>
              {item.status === "completed" && (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {item.status === "in-progress" && (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              )}
              {item.status === "locked" && (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">{item.name}</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${item.progress}%` }} />
                </div>
                <span className="font-mono text-xs text-text-muted w-12 text-right">{item.progress}%</span>
              </div>
            </div>
            {item.status === "in-progress" && (
              <span className="text-xs font-medium text-primary px-2 py-0.5 rounded bg-primary/10">Current</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const FloatingCodePreview = () => (
  <motion.div
    className="absolute bottom-0 right-0 w-full sm:w-[280px] -translate-y-1/2 translate-x-1/2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-[0_12px_30px_rgba(26,31,30,0.1)]">
      <div className="p-3 border-b border-border bg-surface-hover flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded bg-red-500/20" />
          <div className="h-3 w-3 rounded bg-yellow-500/20" />
          <div className="h-3 w-3 rounded bg-green-500/20" />
        </div>
        <div className="flex-1 px-2 py-1 bg-surface rounded text-[10px] font-mono text-text-muted">lesson-17-state-management.jsx</div>
      </div>
      <pre className="p-3 overflow-x-auto"><code className="font-mono text-[11px] leading-relaxed text-text-secondary">{`const [state, setState] = useState(initialValue);

const updateState = (updater) => {
  setState(prev => 
    typeof updater === 'function' 
      ? updater(prev) 
      : updater
  );
};

const derived = useMemo(() => 
  computeExpensive(state), [state]
);`}</code></pre>
      <div className="px-3 py-2 border-t border-border bg-surface-hover flex items-center justify-between text-xs">
        <span className="text-text-muted">Lesson 17 of 24</span>
        <span className="text-primary font-medium">12:34 min</span>
      </div>
    </div>
  </motion.div>
);

export default CoursePreview;
