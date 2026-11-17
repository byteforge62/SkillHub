import { Link } from "react-router-dom";
import { AnimatedReveal } from "@/components/animation/AnimatedReveal";
import { AnimatedButton } from "@/components/animation/AnimatedButton";
import { LearningExperiencePreview } from "./LearningExperiencePreview";
import { SectionBackground } from "./SectionBackground";

export const HeroSection = () => {
  return (
    <SectionBackground variant="background" showDepth depthPosition="top-center">
      <div className="container-wide grid min-h-[calc(100vh-5.5rem)] items-center gap-10 lg:gap-16 py-16 lg:py-24 xl:py-32 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Copy Column */}
        <div className="relative z-20 max-w-[720px]">
          <AnimatedReveal delay={0.1} distance={16}>
            <span className="text-eyebrow text-primary">
              Technical learning platform
            </span>
          </AnimatedReveal>

          <AnimatedReveal delay={0.2} distance={20}>
            <h1 className="mt-4 max-w-[780px] leading-[1.05]">
              Learn what matters.
              <br />
              Build what you imagine.
            </h1>
          </AnimatedReveal>

          <AnimatedReveal delay={0.3} distance={16}>
            <p className="mt-6 max-w-[640px] text-lead">
              SkillHub connects structured courses, hands-on practice, and community learning
              so you can progress from tutorial to production with confidence.
            </p>
          </AnimatedReveal>

          <AnimatedReveal delay={0.4} distance={16}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <AnimatedButton
                variant="primary"
                size="lg"
                asChild
              >
                <Link to="/register">
                  Start learning free
                </Link>
              </AnimatedButton>
              <AnimatedButton
                variant="secondary"
                size="lg"
                asChild
              >
                <Link to="/login">
                  Sign in
                </Link>
              </AnimatedButton>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.5} distance={16}>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-caption text-text-muted">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span>Free to start</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>No card required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </AnimatedReveal>
        </div>

        {/* Product Visual Column */}
        <div className="relative">
          <AnimatedReveal delay={0.3} distance={20} duration={0.8}>
            <LearningExperiencePreview />
          </AnimatedReveal>
        </div>
      </div>
    </SectionBackground>
  );
};
