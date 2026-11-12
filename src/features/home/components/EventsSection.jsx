import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    <section id="events" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:px-8 lg:px-12 lg:py-32 xl:px-16">
        <motion.div
          className="ml-auto max-w-[680px] text-left lg:text-right"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary">
            SkillHub events
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
            Learn with other people.
          </h2>
          <p className="ml-auto mt-4 max-w-[600px] text-base leading-7 text-text-secondary sm:text-[17px]">
            Find workshops and technical sessions connected to the skills
            you are learning.
          </p>
        </motion.div>

        <div className="mt-12">
          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-3" role="status">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="h-52 animate-pulse rounded-xl bg-surface-hover"
                />
              ))}
              <span className="sr-only">Loading upcoming events...</span>
            </div>
          ) : isError ? (
            <div className="rounded-xl border border-error/20 bg-error/5 p-5">
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
            </div>
          ) : events.length === 0 ? (
            <p className="rounded-xl border border-border bg-surface p-5 text-sm text-text-muted">
              There are no upcoming events yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              {events.map((event, index) => (
                <motion.article
                  key={event._id}
                  className="group flex h-full flex-col border-t border-border pt-5"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p className="font-mono text-xs text-primary">
                    {formatEventDate(event.date)}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold leading-tight tracking-[-0.025em] text-text-primary">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
                      {event.description}
                    </p>
                  )}
                  <p className="mt-4 text-xs text-text-muted">{event.location}</p>
                  <Link
                    to={`/events/${event._id}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-primary"
                  >
                    Event details <span aria-hidden="true">→</span>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-text-muted">
            Discover upcoming SkillHub events.
          </span>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-primary transition-colors hover:text-primary"
          >
            View all events <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
