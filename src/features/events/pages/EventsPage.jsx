import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  RefreshCw,
  Search,
  Plus,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { formatEventDate } from "../utils/eventDate";
import { getEvents } from "../api/eventsApi";

const PAGE_SIZE = 12;

const dateParts = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return { day: "—", month: "" };
  }

  return {
    day: new Intl.DateTimeFormat(undefined, { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat(undefined, { month: "short" }).format(date),
  };
};

export const EventsPage = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: eventsData, isLoading, isError, refetch } = useQuery({
    queryKey: ["events", "upcoming", page, searchTerm],
    queryFn: () =>
      getEvents({
        page,
        limit: PAGE_SIZE,
        ...(searchTerm ? { q: searchTerm } : {}),
      }),
  });

  const events = eventsData?.data || [];
  const meta = eventsData?.meta;

  return (
    <main>
      <section className="sage-mesh relative overflow-hidden border-b border-[color:var(--color-line)]">
        <div className="architectural-grid absolute inset-0" aria-hidden="true" />

        <div className="container-wide relative py-14 sm:py-20">
          <p className="text-eyebrow uppercase tracking-[0.14em]">Learn together</p>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h1 className="display-2">Workshops worth showing up for.</h1>
              <p className="text-lead mt-5">
                Sessions hosted by the SkillHub community — a time, a place and a
                subject. Every event is published by the person running it.
              </p>
            </div>

            <Button as={Link} to="/events/manage" variant="secondary" iconLeft={Plus}>
              Host an event
            </Button>
          </div>

          <form
            className="mt-8 flex max-w-xl items-center gap-2 rounded-full border border-[color:var(--color-line)] bg-white/85 p-1.5 backdrop-blur-md"
            onSubmit={(event) => {
              event.preventDefault();
              setPage(1);
              setSearchTerm(searchInput.trim());
            }}
          >
            <div className="relative flex-1">
              <Search
                size={15}
                strokeWidth={1.9}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <label className="sr-only" htmlFor="event-search">
                Search events
              </label>
              <input
                id="event-search"
                type="search"
                className="h-10 w-full rounded-full bg-transparent pl-10 pr-3 text-[13.5px] text-text-primary placeholder:text-text-muted focus:outline-none"
                placeholder="Search workshops and sessions"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                maxLength={100}
              />
            </div>

            <Button type="submit" size="sm">
              Search
            </Button>
          </form>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-16">
        {isLoading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="status">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <Skeleton key={item} className="h-52 rounded-3xl" />
            ))}
            <span className="sr-only">Loading upcoming events...</span>
          </div>
        )}

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
            title={searchTerm ? "No matching events" : "No upcoming events"}
            description={
              searchTerm
                ? "Try a different search term."
                : "Published events appear here as soon as a host schedules them."
            }
            action={
              searchTerm ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearchInput("");
                    setSearchTerm("");
                    setPage(1);
                  }}
                >
                  Clear search
                </Button>
              ) : (
                <Button as={Link} to="/events/manage">
                  Host the first one
                </Button>
              )
            }
          />
        )}

        {!isLoading && !isError && events.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-[17px] font-bold tracking-[-0.025em]">
                {searchTerm ? `Results for "${searchTerm}"` : "Upcoming"}
              </h2>
              {meta?.total !== undefined && (
                <span className="text-[12px] text-text-muted">
                  {meta.total} {meta.total === 1 ? "event" : "events"}
                </span>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
                const date = dateParts(event.date);

                return (
                  <Link
                    key={event._id}
                    to={`/events/${event._id}`}
                    className="group flex h-full flex-col rounded-3xl border border-[color:var(--color-line)] bg-white p-5 shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[var(--shadow-hover)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-14 w-12 flex-col items-center justify-center rounded-2xl bg-sage text-primary">
                        <span className="text-[9.5px] font-semibold uppercase tracking-[0.08em]">
                          {date.month}
                        </span>
                        <span className="text-[18px] font-bold leading-none tracking-[-0.03em]">
                          {date.day}
                        </span>
                      </div>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-line)] text-text-muted transition-colors group-hover:border-primary/30 group-hover:bg-sage group-hover:text-primary">
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    <h3 className="mt-4 line-clamp-2 text-[15.5px] font-bold leading-6 tracking-[-0.02em] text-text-primary">
                      {event.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 flex-1 text-[12.5px] leading-6 text-text-secondary">
                      {event.description}
                    </p>

                    <div className="mt-4 space-y-1.5 border-t border-border-subtle pt-3.5 text-[11.5px] text-text-muted">
                      <p className="inline-flex items-center gap-1.5">
                        <CalendarDays size={11} aria-hidden="true" />
                        {formatEventDate(event.date)}
                      </p>

                      {event.location && (
                        <p className="flex items-center gap-1.5">
                          <MapPin size={11} aria-hidden="true" />
                          <span className="truncate">{event.location}</span>
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {meta?.pages > 1 && (
          <nav
            className="mt-10 flex items-center justify-between gap-4 border-t border-[color:var(--color-line)] pt-6"
            aria-label="Event pages"
          >
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </Button>

            <Badge variant="outline" size="sm">
              Page {meta.page} of {meta.pages}
            </Badge>

            <Button
              variant="secondary"
              size="sm"
              disabled={page >= meta.pages}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </Button>
          </nav>
        )}
      </section>
    </main>
  );
};

export default EventsPage;
