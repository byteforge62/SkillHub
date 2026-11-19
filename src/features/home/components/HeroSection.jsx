import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  ClipboardCheck,
  Clock3,
  Compass,
  Play,
  Sparkles,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ProgressBar from "@/components/ui/ProgressBar";
import { fadeUp, spring, stagger } from "@/lib/motion";

const tourSteps = [
  {
    icon: Compass,
    title: "Choose a path, not a playlist",
    description:
      "Courses are organised into sections and lessons, so you always know what comes next.",
  },
  {
    icon: BookOpen,
    title: "Work through the lesson",
    description:
      "Text, code, video and resources sit in one reading column. No tab safari.",
  },
  {
    icon: ClipboardCheck,
    title: "Prove it, then move on",
    description:
      "Quizzes and saved progress confirm what stuck before the next section unlocks.",
  },
];

const weeks = [
  { label: "Design systems", state: "done" },
  { label: "Component patterns", state: "current" },
  { label: "Accessibility audit", state: "next" },
];

export const HeroSection = () => {
  const [tourOpen, setTourOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const frameRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -4]), spring);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), spring);

  const handlePointerMove = (event) => {
    if (prefersReduced || !frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-24">
      <div className="sage-veil absolute inset-0 -z-20" aria-hidden="true" />
      <div
        className="architectural-grid pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[6%] top-[12%] -z-10 h-[520px] w-[520px] rounded-full bg-[#dce9df]/70 blur-[110px]"
        aria-hidden="true"
      />

      <div className="container-wide">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-10 xl:gap-16">
          <motion.div
            variants={stagger(0.05, 0.08)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="glass" size="lg" dot>
                Learn · Build · Grow
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-7 text-[clamp(2.75rem,6vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.048em]"
            >
              <span className="block text-primary">SkillHub</span>
              <span className="block text-text-primary">
                Your learning companion
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[520px] text-[16px] leading-7 text-text-secondary sm:text-[17px]"
            >
              Structured courses, working developer tools and a community that
              keeps you moving — held together in one quiet workspace.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button
                as={Link}
                to="/register"
                size="lg"
                iconRight={ArrowRight}
                className="px-7"
              >
                Start learning
              </Button>

              <Button
                variant="secondary"
                size="lg"
                iconLeft={Play}
                onClick={() => setTourOpen(true)}
                className="bg-white/70 backdrop-blur-sm"
              >
                Watch demo
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-text-secondary"
            >
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck size={15} className="text-primary" aria-hidden="true" />
                Free to explore
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check size={15} className="text-primary" aria-hidden="true" />
                No card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 size={15} className="text-primary" aria-hidden="true" />
                Learn in 20-minute sittings
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 26, delay: 0.18 }}
            className="relative mx-auto w-full max-w-[540px] lg:max-w-none"
            style={{ perspective: 1400 }}
          >
            <div
              ref={frameRef}
              onMouseMove={handlePointerMove}
              onMouseLeave={resetTilt}
              className="relative"
            >
              <motion.div
                style={
                  prefersReduced
                    ? undefined
                    : { rotateX, rotateY, transformStyle: "preserve-3d" }
                }
                className="relative"
              >
                <div className="overflow-hidden rounded-[30px] border border-[color:var(--color-line)] bg-white shadow-[0_40px_90px_rgba(20,46,33,0.16)]">
                  <div className="flex items-center justify-between gap-4 border-b border-border-subtle px-6 py-4">
                    <div>
                      <p className="text-[11.5px] font-medium text-text-muted">
                        Learning path
                      </p>
                      <p className="mt-0.5 text-[15px] font-semibold tracking-[-0.02em] text-text-primary">
                        Frontend engineering
                      </p>
                    </div>

                    <Badge variant="sage" size="sm" dot>
                      In progress
                    </Badge>
                  </div>

                  <div className="px-6 pt-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-[13px] font-medium text-text-secondary">
                        Week 4 of 9
                      </p>
                      <p className="text-[13px] font-semibold text-primary">62%</p>
                    </div>
                    <ProgressBar value={62} size="sm" className="mt-2.5" />
                  </div>

                  <div className="mt-5 space-y-1.5 px-4 pb-2">
                    {weeks.map((week) => (
                      <div
                        key={week.label}
                        className={[
                          "flex items-center gap-3 rounded-2xl px-3 py-2.5",
                          week.state === "current" ? "bg-sage" : "",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold",
                            week.state === "done"
                              ? "bg-primary text-white"
                              : week.state === "current"
                                ? "bg-white text-primary ring-1 ring-primary/20"
                                : "bg-white text-text-muted ring-1 ring-[color:var(--color-line)]",
                          ].join(" ")}
                        >
                          {week.state === "done" ? (
                            <Check size={12} strokeWidth={3} aria-hidden="true" />
                          ) : (
                            weeks.indexOf(week) + 1
                          )}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] font-medium text-text-primary">
                            {week.label}
                          </span>
                          <span className="mt-0.5 block text-[11px] text-text-muted">
                            {week.state === "done"
                              ? "Completed"
                              : week.state === "current"
                                ? "Next up · 14 min"
                                : "Locked"}
                          </span>
                        </span>

                        {week.state === "current" && (
                          <Sparkles
                            size={14}
                            className="text-primary"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mx-4 mb-4 mt-2 rounded-2xl bg-forest-deep px-4 py-3.5 text-text-on-dark">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10.5px] font-medium text-text-on-dark-muted">
                          Continue where you stopped
                        </p>
                        <p className="mt-0.5 truncate text-[13px] font-semibold">
                          Component patterns
                        </p>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                        <Play size={13} fill="currentColor" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={
                    prefersReduced ? undefined : { y: [0, -7, 0] }
                  }
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-4 bottom-14 hidden w-[186px] rounded-2xl border border-[color:var(--color-line)] bg-white/95 p-3.5 shadow-[0_18px_40px_rgba(20,46,33,0.14)] backdrop-blur sm:block"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage text-primary">
                      <ClipboardCheck size={13} aria-hidden="true" />
                    </span>
                    <p className="text-[11.5px] font-semibold text-text-primary">
                      Quiz passed
                    </p>
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-text-muted">
                    8 of 10 correct. Next section unlocked.
                  </p>
                </motion.div>

                <motion.div
                  animate={
                    prefersReduced ? undefined : { y: [0, 6, 0] }
                  }
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                  className="absolute -right-3 top-16 hidden rounded-2xl border border-[color:var(--color-line)] bg-white/95 px-3.5 py-2.5 shadow-[0_18px_40px_rgba(20,46,33,0.12)] backdrop-blur md:block"
                >
                  <p className="text-[10.5px] font-medium text-text-muted">
                    Focus time
                  </p>
                  <p className="mt-0.5 text-[15px] font-bold tracking-[-0.02em] text-primary">
                    14 min
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <Modal
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        title="A week inside SkillHub"
        description="Three moves, repeated until the skill is yours."
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setTourOpen(false)}>
              Close
            </Button>
            <Button
              as={Link}
              to="/register"
              iconRight={ArrowRight}
              onClick={() => setTourOpen(false)}
            >
              Create your account
            </Button>
          </>
        }
      >
        <ol className="space-y-5">
          {tourSteps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sage text-primary">
                <step.icon size={17} strokeWidth={1.7} aria-hidden="true" />
              </span>

              <div>
                <p className="text-[10.5px] font-medium text-text-muted">
                  Step {index + 1}
                </p>
                <h3 className="mt-0.5 text-[15px] font-semibold tracking-[-0.02em] text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-1 text-[13.5px] leading-6 text-text-secondary">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Modal>
    </section>
  );
};

export default HeroSection;
