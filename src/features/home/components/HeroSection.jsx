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
      <div className="container-wide grid min-h-[calc(100vh-5.5rem)] items-start gap-10 lg:gap-16 py-16 lg:py-24 xl:py-32 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative z-20 max-w-[680px] pt-8 lg:pt-16">
          <HeroCopy featuredCourse={featuredCourse} />
        </div>
        <div className="relative">
          <HeroShowcase 
            featuredCourse={featuredCourse} 
            learningStages={learningStages} 
          />
        </div>
      </div>
    </SectionBackground>
  );
};

const HeroCopy = ({ featuredCourse }) => (
  <>
    {/* Category Badge */}
    <AnimatedReveal delay={0.1} distance={16}>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-medium tracking-wide">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-40" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        Featured Learning Path
      </div>
    </AnimatedReveal>

    {/* Main Headline */}
    <AnimatedReveal delay={0.2} distance={20}>
      <h1 className="mt-6 max-w-[720px] leading-[1.02] text-white">
        <span className="block">Learn React.</span>
        <span className="block text-primary-light">Build production apps.</span>
      </h1>
    </AnimatedReveal>

    {/* Subheadline */}
    <AnimatedReveal delay={0.3} distance={16}>
      <p className="mt-6 max-w-[600px] text-lead-on-dark">
        SkillHub guides you from first component to deployed application.
        Structured paths, hands-on practice, and a community that keeps you moving forward.
      </p>
    </AnimatedReveal>

    {/* Quick Stats Bar */}
    <AnimatedReveal delay={0.35} distance={12}>
      <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8 text-sm">
        <div className="flex items-center gap-2 text-text-on-dark-muted">
          <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{featuredCourse.duration} of content</span>
        </div>
        <div className="flex items-center gap-2 text-text-on-dark-muted">
          <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{featuredCourse.students} learners</span>
        </div>
        <div className="flex items-center gap-2 text-text-on-dark-muted">
          <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5 4.87 1.18-6.88L2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>{featuredCourse.rating} rating</span>
        </div>
      </div>
    </AnimatedReveal>

    {/* Primary CTAs */}
    <AnimatedReveal delay={0.4} distance={16}>
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <AnimatedButton
          variant="primary"
          size="lg"
          asChild
          className="w-full sm:w-auto"
        >
          <Link to="/register" className="w-full">
            Start learning free
          </Link>
        </AnimatedButton>
        <AnimatedButton
          variant="secondary"
          size="lg"
          asChild
          className="w-full sm:w-auto border-border/50 hover:border-primary/50"
        >
          <Link to="/login" className="w-full">
            Sign in to your account
          </Link>
        </AnimatedButton>
      </div>
    </AnimatedReveal>

    {/* Trust indicators */}
    <AnimatedReveal delay={0.5} distance={16}>
      <div className="mt-12 pt-8 border-t border-white/10">
        <p className="text-xs font-mono text-text-on-dark-muted/60 uppercase tracking-widest mb-4">
          Trusted by developers at
        </p>
        <div className="flex flex-wrap items-center gap-6 opacity-40">
          <span className="font-mono text-xs text-text-on-dark-muted">Vercel</span>
          <span className="h-4 w-px bg-white/10" aria-hidden="true" />
          <span className="font-mono text-xs text-text-on-dark-muted">Netlify</span>
          <span className="h-4 w-px bg-white/10" aria-hidden="true" />
          <span className="font-mono text-xs text-text-on-dark-muted">Shopify</span>
          <span className="h-4 w-px bg-white/10" aria-hidden="true" />
          <span className="font-mono text-xs text-text-on-dark-muted">Linear</span>
          <span className="h-4 w-px bg-white/10" aria-hidden="true" />
          <span className="font-mono text-xs text-text-on-dark-muted">Notion</span>
        </div>
      </div>
    </AnimatedReveal>
  </>
);
const HeroShowcase = ({ featuredCourse, learningStages }) => (
  <AnimatedReveal delay={0.3} distance={20} duration={0.8}>
    <div className="relative">
      <FeaturedCourseCard featuredCourse={featuredCourse} />
      <LearningPathStages learningStages={learningStages} />
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[500px] max-h-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[60%] h-[60%] max-w-[400px] max-h-[400px] rounded-full bg-accent/10 blur-[100px]" />
      </div>
    </div>
  </AnimatedReveal>
);

const FeaturedCourseCard = ({ featuredCourse }) => (
  <div className="relative bg-forest-deep-soft/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-forest">
    <div className="aspect-video relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-forest-deep-soft to-accent/10" />
      <div className="relative h-full flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm p-4 mb-4">
            <svg className="h-10 w-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2">{featuredCourse.title}</h3>
          <p className="text-text-on-dark-muted">with {featuredCourse.instructor}</p>
        </div>
      </div>
    </div>

    <div className="px-6 py-4 border-t border-white/10 bg-forest-deep/30">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/20 text-primary font-medium">
          {featuredCourse.level}
        </span>
        <span className="flex items-center gap-1.5 text-text-on-dark-muted">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {featuredCourse.duration}
        </span>
        <span className="flex items-center gap-1.5 text-text-on-dark-muted">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {featuredCourse.lessons} lessons
        </span>
      </div>
    </div>

    <div className="px-6 py-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-caption-on-dark">Your progress</span>
          <span className="font-mono text-primary text-sm">{featuredCourse.progress}%</span>
        </div>
        <span className="text-xs font-medium text-primary px-2 py-0.5 rounded-full bg-primary/20">
          {featuredCourse.currentLesson}
        </span>
      </div>
      <div className="h-2 bg-forest-deep rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${featuredCourse.progress}%` }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-text-on-dark-muted">
        <span>Lesson {featuredCourse.progress > 0 ? Math.ceil(featuredCourse.lessons * featuredCourse.progress / 100) : 1} of {featuredCourse.lessons}</span>
        <span>Next: {featuredCourse.nextLesson}</span>
      </div>
    </div>

    <div className="px-6 pb-6">
      <div className="flex flex-wrap gap-2">
        {featuredCourse.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-text-on-dark-muted hover:border-primary/30 hover:text-text-on-dark transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const LearningPathStages = ({ learningStages }) => (
  <motion.div
    className="mt-6 space-y-3"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {learningStages.map((stage) => (
      <div
        key={stage.id}
        className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
          stage.status === "completed"
            ? "bg-white/5 border-white/10"
            : stage.status === "in-progress"
            ? "bg-primary/10 border-primary/30"
            : "bg-white/5 border-white/10 opacity-50"
        }`}
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium">
          {stage.status === "completed" && (
            <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {stage.status === "in-progress" && (
            <div className="w-full h-full rounded-full border-2 border-primary border-t-transparent animate-spin" />
          )}
          {stage.status === "locked" && (
            <svg className="h-5 w-5 text-text-on-dark-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h4 className={`font-medium ${stage.status === "locked" ? "text-text-on-dark-muted" : "text-white"}`}>
              {stage.name}
            </h4>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              stage.status === "completed" ? "bg-primary/20 text-primary" :
              stage.status === "in-progress" ? "bg-primary/20 text-primary" :
              "bg-white/10 text-text-on-dark-muted"
            }`}>
              {stage.status === "completed" && "Completed"}
              {stage.status === "in-progress" && "In Progress"}
              {stage.status === "locked" && "Locked"}
            </span>
            {stage.current && (
              <span className="text-xs font-medium text-primary px-2 py-0.5 rounded-full bg-primary/20">
                Current
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-text-on-dark-muted">
            {stage.courses} course{stage.courses !== 1 ? "s" : ""} • {stage.status === "in-progress" ? "Continue learning" : stage.status === "completed" ? "Ready for next stage" : "Complete previous stage"}
          </p>
        </div>
      </div>
    ))}
  </motion.div>
);

export default HeroSection;
