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
          <svg className="h-4 w-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
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