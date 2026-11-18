import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedReveal } from "@/components/animation/AnimatedReveal";
import { SectionBackground } from "./SectionBackground";
import Button from "@/components/ui/Button";
import { getEvents } from "@/features/events/api/eventsApi";
import { formatEventDate } from "@/features/events/utils/eventDate";

export const EventsSection = () => {
  const {
    data: eventsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["events", "upcoming", 1],
    queryFn: () => getEvents({ page: 1, limit: 3 }),
  });

  const events = eventsData?.data || [];

  return (
    <SectionBackground variant="background" showDepth depthPosition="top-right">
      <div className="container-narrow py-16 lg:py-24 xl:py-32">
        <AnimatedReveal delay={0.1} distance={16}>
          <span className="text-eyebrow text-primary">Learn Together</span>
        </AnimatedReveal>
        <AnimatedReveal delay={0.2} distance={20}>
          <h2 id="events" className="mt-4 max-w-[700px]">Upcoming events & workshops</h2>
        </AnimatedReveal>
        <AnimatedReveal delay={0.3} distance={16}>
          <p className="mt-6 max-w-[640px] text-lead">
            Join live technical sessions, hands-on workshops, and community discussions.
            Events are tied to learning paths so you can deepen the skills you're building.
          </p>
        </AnimatedReveal>
        <EventsGrid events={events} isLoading={isLoading} isError={isError} refetch={refetch} />
        <AnimatedReveal delay={0.5} distance={16}>
          <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm text-text-muted">
              Discover upcoming SkillHub events.
            </span>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-primary"
            >
              View all events <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </AnimatedReveal>
      </div>
    </SectionBackground>
  );
};

const EventsGrid = ({ events, isLoading, isError, refetch }) => (
  <AnimatedReveal delay={0.4} distance={16}>
    <div className="mt-12">
      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-3" role="status">
          {[0, 1, 2].map((item) => (
            <motion.div
              key={item}
              className="h-64 animate-pulse rounded-xl bg-surface-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item * 0.1, duration: 0.5 }}
            />
          ))}
          <span className="sr-only">Loading upcoming events...</span>
        </div>
      ) : isError ? (
        <motion.div
          className="rounded-xl border border-error/20 bg-error/5 p-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm text-error" role="alert">
            Upcoming events could not be loaded.
          </p>
          <Button
            className="mt-4"
            variant="secondary"
            size="sm"
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </motion.div>
      ) : events.length === 0 ? (
        <motion.div
          className="rounded-xl border border-border bg-surface p-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm text-text-muted">
            There are no upcoming events yet. Check back soon.
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {events.map((event, index) => (
            <motion.article
              key={event._id}
              className="group flex flex-col rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.3 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
                <div className="relative h-full flex items-center justify-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="font-mono text-xs text-primary">{formatEventDate(event.date)}</p>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  <p className="text-xs text-text-muted">{event.location}</p>
                </div>

                <h3 className="mt-3 text-xl font-semibold leading-tight text-text-primary">
                  {event.title}
                </h3>

                {event.description && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
                    {event.description}
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-border">
                  <Link
                    to={`/events/${event._id}`}
                    className="inline-flex items-center gap-2 w-full sm:w-auto text-sm font-medium text-text-primary transition-colors hover:text-primary"
                  >
                    Event details
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  </AnimatedReveal>
);

export default EventsSection;
