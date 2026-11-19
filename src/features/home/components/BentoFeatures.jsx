import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Braces,
  CalendarDays,
  Check,
  KeyRound,
  MessagesSquare,
  Regex,
  Waypoints,
} from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import Section, { SectionHeading } from "@/components/ui/Section";
import { fadeUp, stagger } from "@/lib/motion";
import toolRegistry from "@/features/tools/toolRegistry";

const toolIcons = {
  "json-formatter": Braces,
  "jwt-decoder": KeyRound,
  "regex-tester": Regex,
};

const practiceTools = toolRegistry.filter((tool) => toolIcons[tool.id]);

export const BentoFeatures = () => (
  <Section tone="transparent" className="py-20 lg:py-24">
    <div className="container-wide">
      <SectionHeading
        title="Everything a learning habit needs, nothing it doesn't."
        description="SkillHub is built around the middle of the work: the lesson you actually finish, the tool you reach for, the people who answer when you are stuck."
      />

      <motion.div
        variants={stagger(0.05, 0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-12 grid gap-4 lg:grid-cols-6"
      >
        <motion.article
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-forest-deep p-7 text-text-on-dark lg:col-span-3 lg:p-9"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-10 h-52 w-52 rounded-full bg-[#2f6c53]/40 blur-3xl"
            aria-hidden="true"
          />

          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-[#a9ccb8]">
            <Waypoints size={18} strokeWidth={1.7} aria-hidden="true" />
          </span>

          <h3 className="mt-6 text-[22px] font-semibold leading-tight tracking-[-0.03em] sm:text-[26px]">
            A path with a beginning, middle and end
          </h3>

          <p className="mt-3 max-w-md text-[13.5px] leading-6 text-text-on-dark-secondary">
            Sections build on each other. Progress is saved per lesson, so a
            busy week never resets the work you already did.
          </p>

          <div className="mt-8 space-y-2">
            {[
              { label: "Foundations", progress: 100 },
              { label: "Component patterns", progress: 62 },
              { label: "Accessibility audit", progress: 0 },
            ].map((stage) => (
              <div
                key={stage.label}
                className="flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-2.5 ring-1 ring-white/[0.08]"
              >
                <span
                  className={[
                    "flex h-5 w-5 items-center justify-center rounded-full",
                    stage.progress === 100
                      ? "bg-[#a9ccb8] text-forest-deep"
                      : "bg-white/10 text-text-on-dark-muted",
                  ].join(" ")}
                >
                  {stage.progress === 100 ? (
                    <Check size={11} strokeWidth={3} aria-hidden="true" />
                  ) : (
                    <span className="text-[10px] font-semibold">
                      {stage.progress || "—"}
                    </span>
                  )}
                </span>

                <span className="flex-1 text-[12.5px] font-medium text-text-on-dark-secondary">
                  {stage.label}
                </span>

                <span className="w-20">
                  <ProgressBar
                    value={stage.progress}
                    size="sm"
                    tone="light"
                  />
                </span>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          variants={fadeUp}
          className="flex flex-col rounded-3xl border border-[color:var(--color-line)] bg-white p-7 shadow-[var(--shadow-card)] lg:col-span-3 lg:p-9"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sage text-primary">
              <Braces size={18} strokeWidth={1.7} aria-hidden="true" />
            </span>

            <Badge variant="sage" size="sm">
              {toolRegistry.length} tools
            </Badge>
          </div>

          <h3 className="mt-6 text-[22px] font-semibold leading-tight tracking-[-0.03em] text-text-primary sm:text-[26px]">
            Practice without leaving the lesson
          </h3>

          <p className="mt-3 max-w-md text-[13.5px] leading-6 text-text-secondary">
            Format the JSON, test the regex, decode the token. Browser tools sit
            beside the course material instead of in another tab.
          </p>

          <div className="mt-auto space-y-2 pt-7">
            {practiceTools.map((tool) => {
              const Icon = toolIcons[tool.id];

              return (
                <Link
                  key={tool.id}
                  to={`/tools/${tool.id}`}
                  className="group flex items-center gap-3 rounded-2xl border border-[color:var(--color-line)] px-3.5 py-2.5 transition-colors hover:border-primary/30 hover:bg-sage/50"
                >
                  <Icon
                    size={15}
                    className="text-primary"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  <span className="flex-1 text-[13px] font-medium text-text-primary">
                    {tool.name}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </motion.article>

        <motion.article
          variants={fadeUp}
          className="flex flex-col rounded-3xl bg-sage p-7 lg:col-span-2"
        >
          <CalendarDays
            size={20}
            strokeWidth={1.7}
            className="text-primary"
            aria-hidden="true"
          />

          <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.025em] text-text-primary">
            Workshops with a date attached
          </h3>

          <p className="mt-2.5 text-[13px] leading-6 text-text-secondary">
            Live sessions are scheduled, not vague. See the time, the host and
            what you will build before you commit.
          </p>

          <Link
            to="/events"
            className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] font-semibold text-primary"
          >
            Browse events
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </motion.article>

        <motion.article
          variants={fadeUp}
          className="flex flex-col rounded-3xl border border-[color:var(--color-line)] bg-white p-7 shadow-[var(--shadow-card)] lg:col-span-2"
        >
          <MessagesSquare
            size={20}
            strokeWidth={1.7}
            className="text-primary"
            aria-hidden="true"
          />

          <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.025em] text-text-primary">
            Communities around the subject
          </h3>

          <p className="mt-2.5 text-[13px] leading-6 text-text-secondary">
            Join a room tied to what you are learning. Post a blocker, share a
            win, read what others are building.
          </p>

          <Link
            to="/communities"
            className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] font-semibold text-primary"
          >
            Find a community
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </motion.article>

        <motion.article
          variants={fadeUp}
          className="flex flex-col justify-between gap-6 rounded-3xl bg-sage-soft/70 p-7 lg:col-span-2"
        >
          <div>
            <p className="text-[11.5px] font-medium text-primary">
              Your progress
            </p>

            <p className="mt-2 text-[42px] font-bold leading-none tracking-[-0.045em] text-primary">
              62<span className="text-[24px]">%</span>
            </p>

            <p className="mt-2 text-[13px] leading-6 text-text-secondary">
              Kept across devices, updated the moment you tick a lesson
              complete.
            </p>
          </div>

          <ProgressBar value={62} label="Frontend engineering" showValue />
        </motion.article>
      </motion.div>
    </div>
  </Section>
);

export default BentoFeatures;
