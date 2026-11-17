import { motion } from "framer-motion";
import { AnimatedReveal } from "@/components/animation/AnimatedReveal";
import { SectionBackground } from "./SectionBackground";
import { AnimatedButton } from "@/components/animation/AnimatedButton";
import { Link } from "react-router-dom";

const workspaceFeatures = [
  {
    title: "Practice & Quizzes",
    description: "Test what you've learned with adaptive quizzes that identify knowledge gaps and reinforce understanding.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    link: "/practice",
  },
  {
    title: "Community Discussions",
    description: "Ask questions, share insights, and learn from peers working through the same technologies.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8z" />
      </svg>
    ),
    link: "/community",
  },
  {
    title: "Live Events & Workshops",
    description: "Join technical sessions and hands-on workshops hosted by practitioners and community members.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    link: "/events",
  },
  {
    title: "Developer Tools",
    description: "JSON formatter, regex tester, timestamp converter, and more utilities for daily workflows.",
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 001.065 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    link: "/tools",
  },
];

const progressStats = [
  { label: "Lessons completed", value: "247", change: "+12 this week" },
  { label: "Quiz score avg", value: "87%", change: "+3% from last month" },
  { label: "Streak", value: "14 days", change: "Keep it going!" },
  { label: "Skills earned", value: "8", change: "2 new this month" },
];

export const WorkspaceSection = () => {
  return (
    <SectionBackground variant="surface-hover" showDepth depthPosition="bottom-left">
      <div className="container-narrow py-16 lg:py-24 xl:py-32">
        <AnimatedReveal delay={0.1} distance={16}>
          <span className="text-eyebrow text-primary">Your Workspace</span>
        </AnimatedReveal>
        <AnimatedReveal delay={0.2} distance={20}>
          <h2 id="workspace" className="mt-4 max-w-[700px]">Learning doesn't stop at the lesson</h2>
        </AnimatedReveal>
        <AnimatedReveal delay={0.3} distance={16}>
          <p className="mt-6 max-w-[640px] text-lead">
            Courses give you direction, but real growth happens when you practice, discuss, attend events,
            and reach for tools that solve problems. SkillHub brings it all together.
          </p>
        </AnimatedReveal>
        <ProgressStats />
        <FeatureGrid />
        <AnimatedReveal delay={0.6} distance={16}>
          <p className="mt-10 text-center text-sm text-text-muted">
            Everything around learning, without taking you away from it.
          </p>
        </AnimatedReveal>
      </div>
    </SectionBackground>
  );
};

const ProgressStats = () => (
  <AnimatedReveal delay={0.4} distance={16}>
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {progressStats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary/40"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-eyebrow text-text-muted">{stat.label}</p>
          <p className="mt-2 text-3xl font-semibold text-text-primary">{stat.value}</p>
          <p className="mt-1 text-sm text-text-secondary">{stat.change}</p>
        </motion.div>
      ))}
    </div>
  </AnimatedReveal>
);

const FeatureGrid = () => (
  <AnimatedReveal delay={0.5} distance={16}>
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {workspaceFeatures.map((feature, index) => (
        <motion.article
          key={feature.title}
          className="group relative rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-hover"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.4 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 text-primary mb-4">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
          <p className="text-sm leading-6 text-text-secondary mb-5">{feature.description}</p>
          <AnimatedButton
            variant="tertiary"
            size="sm"
            asChild
            className="absolute bottom-6 left-6 right-6"
          >
            <Link to={feature.link}>
              Explore <span aria-hidden="true">&rarr;</span>
            </Link>
          </AnimatedButton>
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

export default WorkspaceSection;
