import { Link } from "react-router-dom";
import { SkillHubLearningScene } from "./SkillHubLearningScene";
export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-[1440px] items-center gap-16 px-6 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-24 xl:px-16">
        {/* Copy */}
        <div className="relative z-20 max-w-[620px]">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-primary" />

            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted">
              SkillHub / Learning Platform
            </span>
          </div>

          <h1 className="mt-8 max-w-[600px] text-[clamp(3.4rem,6vw,6.2rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-text-primary">
            For people who
            <br />
            <span className="text-primary">build</span> with
            <br />
            technology.
          </h1>

          <p className="mt-8 max-w-[500px] text-[17px] leading-8 text-text-secondary">
            A place to discover what to learn, practise what you know,
            and keep moving toward the things you want to build.
          </p>

          <div className="mt-10 grid max-w-[470px] grid-cols-2 border-y border-border">
            <div className="border-r border-border py-4 pr-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted">
                Discover
              </p>

              <p className="mt-2 text-sm font-medium text-text-primary">
                Courses · Resources
              </p>
            </div>

            <div className="py-4 pl-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted">
                Practice
              </p>

              <p className="mt-2 text-sm font-medium text-text-primary">
                Quizzes · Tools
              </p>
            </div>

            <div className="border-r border-t border-border py-4 pr-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted">
                Connect
              </p>

              <p className="mt-2 text-sm font-medium text-text-primary">
                Events · Community
              </p>
            </div>

            <div className="border-t border-border py-4 pl-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-muted">
                Build
              </p>

              <p className="mt-2 text-sm font-medium text-text-primary">
                Projects · Skills
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/register"
              className="group inline-flex items-center gap-3 text-sm font-semibold text-text-primary"
            >
              Enter SkillHub

              <span className="flex h-8 w-8 items-center justify-center border border-border transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Visual world */}
        <div className="relative h-[620px] w-full lg:h-[680px]">
          <SkillHubLearningScene />
        </div>
      </div>
    </section>
  )
}
