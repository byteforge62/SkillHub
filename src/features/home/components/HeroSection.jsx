import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays, Play, Terminal } from "lucide-react";

import { AvatarStack } from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatEventDate } from "@/features/events/utils/eventDate";
import { fadeUp, spring, stagger } from "@/lib/motion";

const codeLines = [
  "const res = await hub.run({",
  "  route: '/v1/traces',",
  "  limits: { rpm: 600 },",
  "});",
  "200 OK · 84ms",
];

export const HeroSection = ({
  course = null,
  event = null,
  community = null,
  toolCount = 0,
}) => {
  const prefersReduced = useReducedMotion();
  const frameRef = useRef(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -3]), spring);
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), spring);

  const handlePointerMove = (pointerEvent) => {
    if (prefersReduced || !frameRef.current) return;

    const rect = frameRef.current.getBoundingClientRect();
    pointerX.set((pointerEvent.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((pointerEvent.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const learners = community?.recentMembers || [];
  const memberCount = community?.memberCount ?? 0;
  const stats = [
    { label: "Sections", value: course?.sectionCount ?? "—" },
    { label: "Lessons", value: course?.lessonCount ?? "—" },
    { label: "Minutes", value: course?.duration ?? "—" },
  ];

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      <div className="sage-veil absolute inset-0 -z-20" aria-hidden="true" />

      <div className="container-wide">
        <div className="grid items-center gap-12 lg:grid-cols-[55fr_45fr] lg:gap-12 xl:gap-16">
          {/* 55% — editorial column */}
          <motion.div
            variants={stagger(0.05, 0.08)}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" size="md" dot>
                Interactive learning &amp; dev workspace
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="display-1 mt-6 max-w-[15ch] text-text-primary"
            >
              Master modern engineering through hands-on workspaces
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-[54ch] text-[15.5px] leading-[1.7] text-text-secondary"
            >
              Study structured tracks, then step into a live sandbox with the same
              tools your team ships with. No slide decks — just chapters, commits
              and conversation.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button as={Link} to="/courses" iconRight={ArrowRight}>
                Explore catalog
              </Button>

              <Button as={Link} to="/tools" variant="outline" iconLeft={Play}>
                Launch sandbox
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              {learners.length > 0 ? (
                <AvatarStack
                  people={learners}
                  max={4}
                  size="sm"
                  label={
                    memberCount > 0
                      ? `${memberCount} builders in this room`
                      : undefined
                  }
                />
              ) : (
                <span className="text-[12.5px] text-text-muted">
                  Open to every engineering discipline
                </span>
              )}

              <span className="h-4 w-px bg-line" aria-hidden="true" />

              <span className="inline-flex items-center gap-1.5 text-[12.5px] text-text-secondary">
                <Terminal size={14} className="text-primary" aria-hidden="true" />
                {toolCount} browser tools, no sign-in
              </span>
            </motion.div>
          </motion.div>

          {/* 45% — layered live workspace collage */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 26, delay: 0.15 }}
            className="relative mx-auto w-full max-w-[520px] lg:max-w-none"
            style={{ perspective: 1400 }}
          >
            <div
              ref={frameRef}
              onMouseMove={handlePointerMove}
              onMouseLeave={resetTilt}
              className="relative pb-16 pl-0 sm:pl-6"
            >
              <motion.div
                style={
                  prefersReduced
                    ? undefined
                    : { rotateX, rotateY, transformStyle: "preserve-3d" }
                }
                className="relative"
              >
                {/* Real course preview */}
                <div className="overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_24px_60px_rgba(18,40,29,0.12)]">
                  <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
                    <div className="min-w-0">
                      <p className="text-[11.5px] text-text-muted">
                        {course?.category?.name || "Catalog"}
                        {course?.level ? ` · ${course.level}` : ""}
                      </p>
                      <p className="mt-1 truncate font-display text-[15px] font-semibold text-text-primary">
                        {course?.title || "Your first track"}
                      </p>
                    </div>

                    <Badge variant={event ? "success" : "outline"} size="sm" dot={Boolean(event)}>
                      {event ? "Live session soon" : "Course preview"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
                    {stats.map((stat) => (
                      <div key={stat.label} className="px-4 py-3.5">
                        <p className="text-[10.5px] text-text-muted">{stat.label}</p>
                        <p className="mt-0.5 text-[15px] font-semibold tabular-nums text-text-primary">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 px-6 py-4">
                    <div className="min-w-0">
                      <p className="text-[11.5px] text-text-muted">Instructor</p>
                      <p className="mt-0.5 truncate text-[13px] font-medium text-text-primary">
                        {course?.createdBy?.fullname || "SkillHub instructors"}
                      </p>
                    </div>

                    <Button
                      as={Link}
                      to={course?._id ? `/courses/${course._id}` : "/courses"}
                      size="sm"
                      variant="secondary"
                    >
                      Open track
                    </Button>
                  </div>
                </div>

                {/* Upcoming workshop ticket */}
                <motion.div
                  animate={prefersReduced ? undefined : { y: [0, -6, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-2 bottom-0 w-[230px] rounded-[16px] border border-line bg-white/95 p-4 shadow-[0_18px_40px_rgba(18,40,29,0.12)] backdrop-blur sm:-left-6"
                >
                  <p className="text-[11.5px] font-medium text-text-muted">
                    {event ? "Live workshop" : "Cohort events"}
                  </p>
                  <p className="mt-1 line-clamp-2 font-display text-[13.5px] font-semibold leading-snug text-text-primary">
                    {event?.title || "No live session scheduled"}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11.5px] text-text-secondary">
                      <CalendarDays size={12} aria-hidden="true" />
                      {event ? formatEventDate(event.date) : "Browse calendar"}
                    </span>
                    <Link
                      to={event?._id ? `/events/${event._id}` : "/events"}
                      className="inline-flex items-center gap-1 text-[11.5px] font-medium text-primary"
                    >
                      {event ? "RSVP" : "Events"}
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>

                {/* Developer tool snippet */}
                <div className="absolute -right-1 top-[52%] hidden w-[248px] overflow-hidden rounded-[16px] border border-line bg-white shadow-[0_18px_40px_rgba(18,40,29,0.1)] md:block">
                  <div className="flex items-center justify-between border-b border-line px-3.5 py-2">
                    <span className="font-mono text-[10.5px] text-text-muted">
                      api-sandbox.ts
                    </span>
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-success"
                      aria-hidden="true"
                    />
                  </div>
                  <pre className="overflow-hidden bg-forest-deep px-3.5 py-3 font-mono text-[10.5px] leading-[1.75] text-[#dcebe1]">
                    {codeLines.map((line, index) => (
                      <span
                        key={line}
                        className={
                          index === codeLines.length - 1
                            ? "block text-[#a9ccb8]"
                            : "block"
                        }
                      >
                        {line}
                      </span>
                    ))}
                  </pre>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
