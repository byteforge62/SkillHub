import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedReveal } from "@/components/animation/AnimatedReveal";
import { AnimatedButton } from "@/components/animation/AnimatedButton";
import { SectionBackground } from "./SectionBackground";

const featuredCourse = {
  title: "React Fundamentals",
  instructor: "Sarah Chen",
  level: "Beginner",
  duration: "12 hours",
  lessons: 24,
  students: "12.4k",
  rating: 4.9,
  progress: 68,
  currentLesson: "State Management Patterns",
  nextLesson: "Performance Optimization",
  skills: ["React", "Hooks", "State", "Effects"],
};

const learningStages = [
  { id: 1, name: "Foundations", status: "completed", courses: 3 },
  { id: 2, name: "Core Skills", status: "in-progress", courses: 4, current: true },
  { id: 3, name: "Advanced", status: "locked", courses: 3 },
  { id: 4, name: "Mastery", status: "locked", courses: 2 },
];

export const HeroSection = () => {
  return (
    <SectionBackground variant="forest-deep" showDepth depthPosition="center" showBorder borderPosition="bottom">
      <div className="absolute inset-0 -z-10 bg-grid-dark opacity-30" aria-hidden="true" />
      <div className="container-wide grid min-h-[calc(100vh-5.5rem)] items-start gap-10 lg:gap-16 py-16 lg:py-24 xl:py-32 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative z-20 max-w-[680px] pt-8 lg:pt-16">
          <HeroCopy featuredCourse={featuredCourse} />
        </div>
        <div className="relative">
          <HeroShowcase featuredCourse={featuredCourse} learningStages={learningStages} />
        </div>
      </div>
    </SectionBackground>
  );
};

const HeroCopy = ({ featuredCourse }) => (
  <>
    <AnimatedReveal delay={0.1} distance={16}>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-medium tracking-wide">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-40" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        Featured Learning Path
      </div>
    </AnimatedReveal>
    <AnimatedReveal delay={0.2} distance={20}>
      <h1 className="mt-6 max-w-[720px] display-2 text-on-dark">
        <span className="block">Learn React.</span>
        <span className="block text-primary-light">Build production apps.</span>
      </h1>
    </AnimatedReveal>
    <AnimatedReveal delay={0.3} distance={16}>
      <p className="mt-6 max-w-[600px] text-lead-on-dark">
        SkillHub guides you from first component to deployed application.
        Structured paths, hands-on practice, and a community that keeps you moving forward.
      </p>
    </AnimatedReveal>
    <AnimatedReveal delay={0.35} distance={12}>
      <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8 text-sm">
        <div className="flex items-center gap-2 text-text-on-dark-muted">
          <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{featuredCourse.duration} of content</span>
        </div>
        <div className="flex items-center gap-2 text-text-on-dark-muted">
          <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span>{featuredCourse.students} students</span>
        </div>
        <div className="flex items-center gap-2 text-text-on-dark-muted">
          <svg className="h-4 w-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
          <span>{featuredCourse.rating} rating</span>
        </div>
      </div>
    </AnimatedReveal>
    <AnimatedReveal delay={0.4} distance={16}>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <AnimatedButton variant="primary" size="lg" asChild className="relative overflow-hidden group">
          <Link to="/register">Start Learning Free <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">→</span></Link>
        </AnimatedButton>
        <AnimatedButton variant="ghost" size="lg" asChild><Link to="/courses">Browse Courses</Link></AnimatedButton>
      </div>
    </AnimatedReveal>
    <AnimatedReveal delay={0.5} distance={12}>
      <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-text-on-dark-muted">
        <div className="flex items-center gap-2"><svg className="h-4 w-4 text-success" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg><span>No credit card required</span></div>
        <div className="flex items-center gap-2"><svg className="h-4 w-4 text-success" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg><span>Cancel anytime</span></div>
        <div className="flex items-center gap-2"><svg className="h-4 w-4 text-success" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg><span>Lifetime access</span></div>
      </div>
    </AnimatedReveal>
  </>
);

const HeroShowcase = ({ featuredCourse, learningStages }) => (
  <div className="relative max-w-[720px] mx-auto lg:mx-0">
    <motion.div
      className="card-dark border-border-dark/50 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="hidden lg:flex lg:w-1/2 flex-col p-6 lg:p-8 border-r border-border-dark bg-surface-dark/50">
        <div className="mb-6">
          <span className="text-eyebrow text-primary">Current Lesson</span>
          <h3 className="mt-2 text-xl font-semibold text-on-dark">{featuredCourse.currentLesson}</h3>
          <p className="mt-1 text-sm text-text-on-dark-muted">Lesson 17 of {featuredCourse.lessons} • {featuredCourse.duration} total</p>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-surface-dark-raised border border-border-dark">
            <p className="text-sm text-text-on-dark-secondary leading-relaxed">
              Learn how to manage complex state in React applications using <code className="text-mono text-primary bg-surface-dark px-1.5 py-0.5 rounded">useReducer</code> and <code className="text-mono text-primary bg-surface-dark px-1.5 py-0.5 rounded">Context</code>. We\'ll build a realistic form handler with validation, async submission, and optimistic updates.
            </p>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
            <svg className="h-5 w-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <p className="font-medium text-on-dark">Video: 18:42</p>
              <p className="text-sm text-text-on-dark-muted">Interactive playback with chapter markers</p>
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border-dark">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-sm font-medium text-on-dark">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-text-on-dark-muted">{featuredCourse.progress}%</span>
            <div className="w-32 h-2 bg-border-dark rounded-full overflow-hidden">
              <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} animate={{ width: `{featuredCourse.progress}%` }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 lg:w-1/2 p-6 lg:p-8 min-h-[420px] flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded bg-red-500/60" />
            <div className="w-3 h-3 rounded bg-yellow-500/60" />
            <div className="w-3 h-3 rounded bg-green-500/60" />
          </div>
          <span className="text-xs font-mono text-text-on-dark-muted ml-2">lesson-17-state-management.jsx</span>
        </div>
        <pre className="flex-1 overflow-auto bg-surface-dark rounded-lg border border-border-dark p-4 text-sm leading-relaxed">
          <code className="text-text-on-dark-secondary">
{`import { useReducer, createContext, useContext } from 'react';

const FormContext = createContext(null);

function formReducer(state, action) {
  switch (action.type) {
    case 'FIELD_CHANGE':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: validate(action.field, action.value) },
      };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, submitError: null };
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, isSubmitted: true };
    case 'SUBMIT_ERROR':
      return { ...state, isSubmitting: false, submitError: action.error };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}`}
          </code>
        </pre>
        <div className="mt-4 flex items-center justify-between text-xs text-text-on-dark-muted">
          <span>Line 17 of 84</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span>No errors</span>
          </span>
        </div>
      </div>
    </motion.div>

    <div className="lg:hidden mt-6 space-y-4">
      <motion.div
        className="card-dark border-border-dark/50 backdrop-blur-sm p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <h4 className="font-semibold text-on-dark">{featuredCourse.currentLesson}</h4>
        <p className="mt-2 text-sm text-text-on-dark-muted">Lesson 17 of 24 • Interactive video + live code editor</p>
      </motion.div>
      <motion.div
        className="card-dark border-border-dark/50 backdrop-blur-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2 mb-3 px-4 pt-4">
          <div className="flex gap-1.5"><div className="w-3 h-3 rounded bg-red-500/60" /><div className="w-3 h-3 rounded bg-yellow-500/60" /><div className="w-3 h-3 rounded bg-green-500/60" /></div>
          <span className="text-xs font-mono text-text-on-dark-muted ml-2">state-management.jsx</span>
        </div>
        <pre className="px-4 pb-4 overflow-auto"><code className="text-text-on-dark-secondary text-xs leading-relaxed">{`const [state, dispatch] = useReducer(formReducer, initialState);

function handleChange(field, value) {
  dispatch({ type: 'FIELD_CHANGE', field, value });
}

const handleSubmit = async (e) => {
  e.preventDefault();
  dispatch({ type: 'SUBMIT_START' });
  try {
    await api.submit(state.values);
    dispatch({ type: 'SUBMIT_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SUBMIT_ERROR', error: err.message });
  }
};`}</code></pre>
      </motion.div>
    </div>

    <div className="hidden lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-[-360px] lg:w-[320px]">
      <LearningPathStages learningStages={learningStages} />
    </div>
  </div>
);

const LearningPathStages = ({ learningStages }) => (
  <motion.div
    className="card-dark border-border-dark/50 backdrop-blur-sm"
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="p-5 border-b border-border-dark">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-on-dark">Your Learning Path</h3>
        <span className="text-xs font-mono text-primary">4 stages</span>
      </div>
    </div>
    <div className="p-5 space-y-4">
      {learningStages.map((stage) => (
        <motion.div
          key={stage.id}
          className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
            stage.status === "completed"
              ? "bg-primary/10 border border-primary/20"
              : stage.status === "in-progress"
              ? "bg-accent/10 border border-accent/20"
              : "bg-white/5 border border-white/10 opacity-50"
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + stage.id * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium">
            {stage.status === "completed" && (
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            )}
            {stage.status === "in-progress" && (
              <div className="w-full h-full rounded-full border-2 border-accent border-t-transparent animate-spin" />
            )}
            {stage.status === "locked" && (
              <svg className="h-5 w-5 text-text-on-dark-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h4 className={`font-medium ${stage.status === "locked" ? "text-text-on-dark-muted" : "text-on-dark"}`}>{stage.name}</h4>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                stage.status === "completed" ? "bg-primary/20 text-primary" :
                stage.status === "in-progress" ? "bg-accent/20 text-accent" :
                "bg-white/10 text-text-on-dark-muted"
              }`}>
                {stage.status === "completed" && "Completed"}
                {stage.status === "in-progress" && "In Progress"}
                {stage.status === "locked" && "Locked"}
              </span>
              {stage.current && (
                <span className="text-xs font-medium text-accent px-2 py-0.5 rounded-full bg-accent/20">Current</span>
              )}
            </div>
            <p className="mt-1 text-sm text-text-on-dark-muted">
              {stage.courses} course{stage.courses !== 1 ? "s" : ""} • {stage.status === "in-progress" ? "Continue learning" : stage.status === "completed" ? "Ready for next stage" : "Complete previous stage"}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
    <div className="px-5 pb-5">
      <div className="flex flex-wrap gap-2">
        {featuredCourse.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-text-on-dark-muted hover:border-primary/30 hover:text-on-dark transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

export default HeroSection;