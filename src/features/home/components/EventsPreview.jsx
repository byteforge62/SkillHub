import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  RefreshCw,
} from "lucide-react";

import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Section, { SectionHeading } from "@/components/ui/Section";
import Skeleton from "@/components/ui/Skeleton";
import { fadeUp, stagger } from "@/lib/motion";
import { formatEventDate } from "@/features/events/utils/eventDate";

const dateParts = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return { day: "—", month: "", weekday: "", time: "Date to be confirmed" };
  }

  return {
    day: new Intl.DateTimeFormat(undefined, { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat(undefined, { month: "short" }).format(date),
    weekday: new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(date),
    time: new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
    }).format(date),
  };
};

const EventSkeleton = () => (
  <div className="flex gap-4 rounded-3xl border border-[color:var(--color-line)] bg-white p-4">
    <Skeleton className="h-16 w-14 shrink-0 rounded-2xl" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  </div>
);

export const EventsPreview = ({
  events = [],
  isLoading,
  isError,
  refetch,
}) => (
  <Section id="events" tone="transparent" className="py-20 lg:py-24">
    <div className="container-wide">
      <SectionHeading
        title="Workshops worth putting in the calendar"
        description="Scheduled sessions with a host, a time and a subject. Events come from the same platform the courses live in."
        action={
          <Button as={Link} to="/events" variant="ghost" iconRight={ArrowRight}>
            All events
          </Button>
        }
      />

      <div className="mt-10 space-y-2.5">
        {isLoading &&
          [0, 1, 2].map((item) => <EventSkeleton key={item} />)}

        {isError && (
          <EmptyState
            tone="error"
            icon={RefreshCw}
            title="Events couldn't be loaded"
            description="The events endpoint did not respond. Try again in a moment."
            action={
              <Button variant="secondary" onClick={() => refetch()}>
                Try again
              </Button>
            }
          />
        )}

        {!isLoading && !isError && events.length === 0 && (
          <EmptyState
            icon={CalendarDays}
            title="No workshops scheduled"
            description="Published events appear here as soon as a host schedules them."
            action={
              <Button as={Link} to="/events/manage" variant="secondary">
                Host an event
              </Button>
            }
          />
        )}

        {!isLoading && !isError && events.length > 0 && (
          <motion.ul
            variants={stagger(0.02, 0.07)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-2.5"
          >
            {events.map((event) => {
              const date = dateParts(event.date);

              return (
                <motion.li key={event._id} variants={fadeUp}>
                  <Link
                    to={`/events/${event._id}`}
                    className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-3xl border border-[color:var(--color-line)] bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-[var(--shadow-card)] sm:gap-6 sm:p-5"
                  >
                    <div className="flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-sage text-primary">
                      <span className="text-[10px] font-medium uppercase tracking-wide">
                        {date.month}
                      </span>
                      <span className="text-[20px] font-bold leading-none tracking-[-0.03em]">
                        {date.day}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-text-muted">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 size={11} aria-hidden="true" />
                          {date.weekday}, {date.time}
                        </span>

                        {event.location && (
                          <span className="inline-flex min-w-0 items-center gap-1">
                            <MapPin size={11} aria-hidden="true" />
                            <span className="truncate">{event.location}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="mt-1 truncate text-[15.5px] font-semibold tracking-[-0.02em] text-text-primary sm:text-[16.5px]">
                        {event.title}
                      </h3>

                      <p className="mt-0.5 hidden truncate text-[12.5px] text-text-muted sm:block">
                        {formatEventDate(event.date)}
                      </p>
                    </div>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-line)] text-text-muted transition-colors group-hover:border-primary/30 group-hover:bg-sage group-hover:text-primary">
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </div>
    </div>
  </Section>
);

export default EventsPreview;
