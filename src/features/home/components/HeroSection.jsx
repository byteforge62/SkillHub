import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedReveal } from "@/components/animation/AnimatedReveal";
import { AnimatedButton } from "@/components/animation/AnimatedButton";
import { SectionBackground } from "./SectionBackground";
import { HeroLearningIllustration } from "../illustrations/HeroLearningIllustration";

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
      <div className="absolute inset-0 -z-10 bg-grid-dark opacity-50" aria-hidden="true" />
      <div className="container-wide grid min-h-[calc(100vh-5.5rem)] gap-10 lg:gap-0 py-16 lg:py-24 xl:py-32 lg:grid-cols-[1fr_1fr] items-start">
        {/* Left column - Editorial headline */}
        <div className="relative z-20 lg:pr-12 pt-16 lg:pt-24 xl:pt-32">
          <div className="absolute -top-20 -left-20 lg:-left-32 xl:-left-40 w-[400px] h-[400px] opacity-5 pointer-events-none" aria-hidden="true">
            <div className="editorial-number-on-dark">01</div>
          </div>
          <HeroCopy featuredCourse={featuredCourse} />
        </div>

        {/* Right column - Showcase panel on paper */}
        <div className="relative lg:pl-8 pt-8 lg:pt-16">
          <motion.div
            className="relative bg-paper rounded-3xl shadow-2xl border border-paper-muted overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-30" aria-hidden="true" />
            <HeroShowcase featuredCourse={featuredCourse} learningStages={learningStages} />
          </motion.div>
        </div>
      </div>
    </SectionBackground>
  );
};

const HeroCopy = ({ featuredCourse }) => (
  <>
    <AnimatedReveal delay={0.1} distance={20}>
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-ink/10 border border-ink/20 text-sm font-medium tracking-wide text-on-dark">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-40" />
          <span className="relative h-2 w-2 rounded-full bg-accent" />
        </span>
        Featured Learning Path
      </div>
    </AnimatedReveal>
    <AnimatedReveal delay={0.2} distance={30}>
      <h1 className="mt-8 max-w-[800px] display-1 text-on-dark font-bold leading-[0.92]">
        <span className="block">Learn</span>
        <span className="block">React.</span>
      </h1>
    </AnimatedReveal>
    <AnimatedReveal delay={0.28} distance={24}>
      <p className="mt-6 max-w-[540px] editorial-accent-on-dark text-xl leading-relaxed font-medium">
        Build production applications. Ship with confidence.
      </p>
    </AnimatedReveal>
    <AnimatedReveal delay={0.36} distance={20}>
      <p className="mt-10 max-w-[600px] text-lead-on-dark leading-[1.8]">
        SkillHub guides you from first component to deployed application.
        Structured paths, hands-on practice, and a community that keeps you moving forward.
      </p>
    </AnimatedReveal>
    <AnimatedReveal delay={0.44} distance={16}>
      <div className="mt-12 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-on-dark/70">
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{featuredCourse.duration} of content</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span>{featuredCourse.students} students</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="h-4 w-4 text-tan" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
          <span>{featuredCourse.rating} rating</span>
        </div>
      </div>
    </AnimatedReveal>
    <AnimatedReveal delay={0.5} distance={20}>
      <div className="mt-14 flex flex-wrap items-center gap-4">
        <AnimatedButton variant="primary" size="lg" asChild className="relative overflow-hidden group bg-accent hover:bg-accent-hover border-0">
          <Link to="/register" className="relative z-10">Start Learning Free <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">?</span></Link>
        </AnimatedButton>
        <AnimatedButton variant="ghost" size="lg" asChild className="text-on-dark hover:bg-ink/5">
          <Link to="/courses">Browse Courses</Link>
        </AnimatedButton>
      </div>
    </AnimatedReveal>
    <AnimatedReveal delay={0.58} distance={16}>
      <div className="mt-16 flex flex-wrap items-center gap-6 text-sm text-on-dark/60">
        <div className="flex items-center gap-2"><svg className="h-4 w-4 text-success" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg><span>No credit card required</span></div>
        <div className="flex items-center gap-2"><svg className="h-4 w-4 text-success" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg><span>Cancel anytime</span></div>
      </div>
    </AnimatedReveal>
  </>
);

const HeroShowcase = ({ featuredCourse, learningStages }) => (
  <div className="relative p-6 lg:p-8 xl:p-10">
    {/* Course header */}
    <div className="mb-8 lg:mb-10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-label-on-dark">In Progress</span>
        <div className="h-6 w-px bg-paper-muted" />
        <span className="text-sm font-medium text-on-dark/70">{featuredCourse.lessons} lessons • {featuredCourse.duration}</span>
      </div>
      <h2 className="text-2xl lg:text-3xl font-bold text-ink leading-tight max-w-[400px]">{featuredCourse.title}</h2>
      <p className="mt-3 text-on-dark/70">with {featuredCourse.instructor} • {featuredCourse.level}</p>
    </div>

    {/* Progress bar */}
    <div className="mb-8 lg:mb-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-ink">Your Progress</span>
        <span className="text-sm font-mono text-accent">{featuredCourse.progress}%</span>
      </div>
      <div className="h-2 bg-paper-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${featuredCourse.progress}%` }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="mt-3 text-sm text-on-dark/60">Lesson 17 of {featuredCourse.lessons} • {featuredCourse.duration} total</p>
    </div>

    {/* Current lesson */}
    <div className="mb-8 lg:mb-10 p-5 lg:p-6 bg-ink rounded-2xl border border-ink/20">
      <span className="text-label-on-dark text-tan">Current Lesson</span>
      <h3 className="mt-2 text-lg lg:text-xl font-semibold text-paper">{featuredCourse.currentLesson}</h3>
      <p className="mt-2 text-sm text-paper/70">Next: {featuredCourse.nextLesson}</p>
    </div>

    {/* Learning stages */}
    <div className="mb-8 lg:mb-10">
      <div className="flex items-center justify-between mb-6">
        <span className="text-label-on-dark">Your Path</span>
        <span className="text-xs font-mono text-accent">4 stages</span>
      </div>
      <div className="space-y-3">
        {learningStages.map((stage) => (
          <motion.div
            key={stage.id}
            className={`flex items-center gap-4 p-4 lg:p-5 rounded-2xl transition-all ${
              stage.status === "completed"
                ? "bg-accent/10 border border-accent/20"
                : stage.status === "in-progress"
                ? "bg-accent/15 border border-accent/30 shadow-lg shadow-accent/10"
                : "bg-ink/5 border border-ink/10 opacity-60"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + stage.id * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-sm font-medium">
              {stage.status === "completed" && (
                <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              )}
              {stage.status === "in-progress" && (
                <div className="w-full h-full rounded-xl border-3 border-accent border-t-transparent animate-spin" />
              )}
              {stage.status === "locked" && (
                <svg className="h-6 w-6 text-on-dark/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h4 className={`font-medium ${stage.status === "locked" ? "text-on-dark/50" : "text-ink"}`}>{stage.name}</h4>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  stage.status === "completed" ? "bg-accent/20 text-accent" :
                  stage.status === "in-progress" ? "bg-accent/20 text-accent" :
                  "bg-ink/10 text-on-dark/50"
                }`}>
                  {stage.status === "completed" && "Completed"}
                  {stage.status === "in-progress" && "In Progress"}
                  {stage.status === "locked" && "Locked"}
                </span>
                {stage.current && (
                  <span className="text-xs font-medium text-tan px-2.5 py-1 rounded-full bg-tan/20">Current</span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-on-dark/60">
                {stage.courses} course{stage.courses !== 1 ? "s" : ""} • {stage.status === "in-progress" ? "Continue learning" : stage.status === "completed" ? "Ready for next stage" : "Complete previous stage"}
              </p>
            </div>
            {stage.status === "completed" && (
              <motion.div
                className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6 + stage.id * 0.1, type: "spring", stiffness: 200, damping: 15 }}
              >
                <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>

    {/* Skills */}
    <div className="pt-6 border-t border-paper-muted">
      <div className="flex flex-wrap gap-2">
        {featuredCourse.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ink/5 border border-ink/10 text-sm font-medium text-on-dark/70 hover:border-accent/40 hover:text-ink hover:bg-accent/5 transition-all"
          >
            <span className="h-2 w-2 rounded-full bg-accent" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default HeroSection;