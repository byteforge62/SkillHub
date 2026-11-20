import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  MessagesSquare,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

import { AvatarStack } from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Section from "@/components/ui/Section";
import { formatEventDate } from "@/features/events/utils/eventDate";
import { fadeUp, stagger } from "@/lib/motion";
import toolRegistry from "@/features/tools/toolRegistry";

const dateParts = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return { day: "—", month: "" };

  return {
    day: new Intl.DateTimeFormat(undefined, { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat(undefined, { month: "short" }).format(date),
  };
};

const PanelLink = ({ to, children }) => (
  <Link
    to={to}
    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] font-medium text-primary"
  >
    {children}
    <ArrowUpRight size={13} aria-hidden="true" />
  </Link>
);

export const BentoFeatures = ({
  courses = [],
  events = [],
  communities = [],
}) => (
  <Section tone="transparent" className="py-20 lg:py-24">
    <div className="container-wide">
      <div className="max-w-2xl">
        <p className="section-label">The workspace</p>
        <h2 className="mt-3 text-[clamp(1.75rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em] text-text-primary">
          Four surfaces, one continuous craft
        </h2>
        <p className="mt-3 text-[14px] leading-[1.55] text-text-secondary">
          Tracks, rooms, tools and sessions share one calm surface — so the work
          you start in a lesson never has to be restarted somewhere else.
        </p>
      </div>

      <motion.div
        variants={stagger(0.05, 0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-10 grid gap-4 lg:grid-cols-12"
      >
        {/* 1 — Interactive course tracks */}
        <motion.article
          variants={fadeUp}
          className="flex flex-col rounded-[24px] border border-line bg-white p-7 shadow-[var(--shadow-card)] lg:col-span-7"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-sage text-primary">
              <BookOpen size={18} strokeWidth={1.7} aria-hidden="true" />
            </span>

            <Badge variant="outline" size="sm">
              {courses.length > 0 ? `${courses.length} tracks` : "Tracks"}
            </Badge>
          </div>

          <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em] text-text-primary">
            Interactive course tracks
          </h3>
          <p className="mt-2 max-w-md text-[13.5px] leading-[1.55] text-text-secondary">
            Sequenced chapters with checkpoints that open the sandbox the moment
            you finish a concept.
          </p>

          <div className="mt-6 divide-y divide-line border-t border-line">
            {courses.slice(0, 3).map((course) => {
              const lessons = course.lessonCount ?? 0;
              const sections = course.sectionCount ?? 0;

              return (
                <Link
                  key={course._id}
                  to={`/courses/${course._id}`}
                  className="group flex items-center gap-4 py-3.5 transition-colors hover:bg-sage/60"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium text-text-primary">
                      {course.title}
                    </p>
                    <p className="mt-0.5 truncate text-[11.5px] text-text-muted">
                      {sections > 0 ? `${sections} sections` : "Guided path"}
                      {lessons > 0 ? ` · ${lessons} lessons` : ""}
                      {course.createdBy?.fullname
                        ? ` · ${course.createdBy.fullname}`
                        : ""}
                    </p>
                  </div>

                  <span className="hidden shrink-0 text-[11.5px] text-text-muted sm:block">
                    {lessons > 0 ? `${lessons} lessons` : "Self-paced"}
                  </span>

                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}

            {courses.length === 0 && (
              <p className="py-4 text-[12.5px] text-text-muted">
                Published tracks appear here as soon as they go live.
              </p>
            )}
          </div>

          <PanelLink to="/courses">Browse the catalog</PanelLink>
        </motion.article>

        {/* 2 — Community rooms */}
        <motion.article
          variants={fadeUp}
          className="flex flex-col rounded-[24px] bg-sage p-7 lg:col-span-5"
        >
          <div className="flex items-start justify-between gap-4">
            <MessagesSquare
              size={20}
              strokeWidth={1.7}
              className="text-primary"
              aria-hidden="true"
            />
            {communities.length > 0 && (
              <Badge variant="sage" size="sm" className="bg-white/70">
                {communities.length} rooms
              </Badge>
            )}
          </div>

          <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em]">
            Real-time community rooms
          </h3>
          <p className="mt-2 text-[13.5px] leading-[1.55] text-text-secondary">
            Small, always-awake rooms where reviewers answer within minutes.
          </p>

          <div className="mt-6 space-y-3">
            {communities.slice(0, 3).map((community) => (
              <Link
                key={community._id}
                to={`/communities/${community._id}`}
                className="block rounded-[12px] bg-white/70 px-3.5 py-3 transition-colors hover:bg-white"
              >
                <p className="truncate text-[13px] font-medium text-text-primary">
                  #{community.name.toLowerCase().replace(/\s+/g, "-")}
                </p>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <AvatarStack
                    people={community.recentMembers || community.members || []}
                    max={3}
                    size="xs"
                  />
                  <span className="text-[11px] text-text-muted">
                    {community.memberCount ?? community.members?.length ?? 0} members
                    {community.postCount > 0 ? ` · ${community.postCount} posts` : ""}
                  </span>
                </div>
              </Link>
            ))}

            {communities.length === 0 && (
              <p className="text-[12.5px] text-text-muted">
                Rooms open as soon as the first cohort joins.
              </p>
            )}
          </div>

          <PanelLink to="/communities">Find a room</PanelLink>
        </motion.article>

        {/* 3 — Browser tools */}
        <motion.article
          variants={fadeUp}
          className="flex flex-col rounded-[24px] border border-line bg-white p-7 shadow-[var(--shadow-card)] lg:col-span-5"
        >
          <div className="flex items-start justify-between gap-4">
            <Wrench
              size={20}
              strokeWidth={1.7}
              className="text-primary"
              aria-hidden="true"
            />
            <Badge variant="outline" size="sm">
              {toolRegistry.length} tools
            </Badge>
          </div>

          <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em]">
            Built-in browser tools
          </h3>
          <p className="mt-2 text-[13.5px] leading-[1.55] text-text-secondary">
            JSON formatter, regex tester and an API sandbox — one keystroke away,
            never a new tab.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2">
            {toolRegistry.slice(0, 6).map((tool) => (
              <Link
                key={tool.id}
                to={`/tools/${tool.id}`}
                className="flex items-center justify-between gap-2 rounded-[12px] border border-line px-3 py-2.5 text-[12px] font-medium text-text-secondary transition-colors hover:border-primary/30 hover:bg-sage/60 hover:text-primary"
              >
                <span className="truncate">{tool.name}</span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </Link>
            ))}
          </div>

          <p className="mt-auto pt-6 text-[11.5px] text-text-muted">
            Press{" "}
            <kbd className="rounded border border-line bg-white px-1.5 py-0.5 font-mono text-[10px]">
              ⌘K
            </kbd>{" "}
            anywhere
          </p>
        </motion.article>

        {/* 4 — Live events */}
        <motion.article
          variants={fadeUp}
          className="flex flex-col rounded-[24px] border border-line bg-white p-7 shadow-[var(--shadow-card)] lg:col-span-7"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-sage text-primary">
              <CalendarDays size={18} strokeWidth={1.7} aria-hidden="true" />
            </span>

            <Badge variant="outline" size="sm">
              {events.length > 0 ? `${events.length} this week` : "Cohort events"}
            </Badge>
          </div>

          <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.01em]">
            Live cohort events
          </h3>
          <p className="mt-2 max-w-md text-[13.5px] leading-[1.55] text-text-secondary">
            Critique sessions, pairing halls and office hours, recorded and
            searchable afterwards.
          </p>

          <div className="mt-6 divide-y divide-line border-t border-line">
            {events.slice(0, 3).map((event) => {
              const date = dateParts(event.date);

              return (
                <Link
                  key={event._id}
                  to={`/events/${event._id}`}
                  className="group flex items-center gap-4 py-3.5 transition-colors hover:bg-sage/60"
                >
                  <span className="flex h-11 w-10 shrink-0 flex-col items-center justify-center rounded-[12px] bg-sage text-primary">
                    <span className="text-[9.5px] font-medium leading-none">
                      {date.month}
                    </span>
                    <span className="mt-1 text-[15px] font-semibold leading-none tracking-[-0.02em]">
                      {date.day}
                    </span>
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium text-text-primary">
                      {event.title}
                    </p>
                    <p className="mt-0.5 truncate text-[11.5px] text-text-muted">
                      {formatEventDate(event.date)}
                      {event.host?.fullname ? ` · ${event.host.fullname}` : ""}
                      {event.duration ? ` · ${event.duration} min` : ""}
                    </p>
                  </div>

                  <span className="shrink-0 text-[12px] font-medium text-primary">
                    {event.isRegistered ? "Registered" : "RSVP"}
                  </span>
                </Link>
              );
            })}

            {events.length === 0 && (
              <p className="py-4 text-[12.5px] text-text-muted">
                Sessions appear here once a host schedules them.
              </p>
            )}
          </div>

          <PanelLink to="/events">See the calendar</PanelLink>
        </motion.article>
      </motion.div>
    </div>
  </Section>
);

export default BentoFeatures;
