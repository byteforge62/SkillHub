import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  MapPin,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Skeleton from "@/components/ui/Skeleton";
import { getEvents, rsvpEvent } from "../api/eventsApi";

const PAGE_SIZE = 12;

const dateParts = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return { weekday: "—", day: "—", month: "", time: "" };
  }

  return {
    weekday: new Intl.DateTimeFormat(undefined, { weekday: "short" })
      .format(date)
      .toUpperCase(),
    day: new Intl.DateTimeFormat(undefined, { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat(undefined, { month: "short" })
      .format(date)
      .toUpperCase(),
    time: new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date),
  };
};

export const EventsPage = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: eventsData, isLoading, isError, refetch } = useQuery({
    queryKey: ["events", "upcoming", page, searchTerm],
    queryFn: () =>
      getEvents({
        page,
        limit: PAGE_SIZE,
        ...(searchTerm ? { q: searchTerm } : {}),
      }),
  });

  const rsvpMutation = useMutation({
    mutationFn: rsvpEvent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });

  const events = eventsData?.data ?? [];
  const meta = eventsData?.meta;

  return (
    <div>
      <PageHeader
        eyebrow="Cohort"
        title="Events & workshops"
        description="Sessions hosted by the SkillHub community — a time, a place and a subject, published by the person running it."
        action={
          <Button as={Link} to="/events/manage" variant="secondary" size="sm" iconLeft={Plus}>
            Host an event
          </Button>
        }
      />

      <form
        className="mt-6 flex items-center gap-2 border-b border-line pb-4"
        onSubmit={(event) => {
          event.preventDefault();
          setPage(1);
          setSearchTerm(searchInput.trim());
        }}
      >
        <div className="relative flex-1 sm:max-w-sm">
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
            className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-4 text-[13.5px] text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
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

      <div className="mt-5">
        {isLoading && (
          <div className="space-y-2" role="status">
            {[0, 1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-24 rounded-[16px]" />
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
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="section-label">
                {searchTerm ? `Results for "${searchTerm}"` : "Upcoming"}
              </h2>
              {meta?.total !== undefined && (
                <span className="text-[11.5px] text-text-muted">
                  {meta.total} {meta.total === 1 ? "event" : "events"}
                </span>
              )}
            </div>

            <div className="overflow-hidden rounded-[16px] border border-line bg-white">
              <div className="divide-y divide-line">
                {events.map((event) => {
                  const date = dateParts(event.date);
                  const isGoing =
                    event.isRegistered ||
                    (rsvpMutation.data?.data?._id === event._id &&
                      rsvpMutation.data?.data?.isRegistered);

                  return (
                    <div
                      key={event._id}
                      className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-sage/60 sm:flex-row sm:items-center"
                    >
                      <span className="flex h-12 w-11 shrink-0 flex-col items-center justify-center rounded-[12px] bg-sage text-primary">
                        <span className="text-[9.5px] font-medium leading-none">
                          {date.weekday}
                        </span>
                        <span className="mt-1 text-[16px] font-semibold leading-none tracking-[-0.02em]">
                          {date.day}
                        </span>
                        <span className="mt-0.5 text-[9px] leading-none text-text-muted">
                          {date.month}
                        </span>
                      </span>

                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/events/${event._id}`}
                          className="truncate text-[14px] font-semibold tracking-[-0.01em] text-text-primary hover:text-primary"
                        >
                          {event.title}
                        </Link>

                        <p className="mt-1 line-clamp-1 text-[12.5px] text-text-secondary">
                          {event.description}
                        </p>

                        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] text-text-muted">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays size={11} aria-hidden="true" />
                            {date.time}
                            {event.duration ? ` · ${event.duration} min` : ""}
                          </span>
                          {event.location && (
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={11} aria-hidden="true" />
                              {event.location}
                            </span>
                          )}
                          {event.host?.fullname && <span>· {event.host.fullname}</span>}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        {event.attendeeCount > 0 && (
                          <span className="text-[11.5px] text-text-muted">
                            {event.attendeeCount} going
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => rsvpMutation.mutate(event._id)}
                          disabled={rsvpMutation.isPending}
                          className={[
                            "rounded-full px-3 py-1.5 text-[11.5px] font-medium transition-colors disabled:opacity-60",
                            isGoing
                              ? "bg-success-soft text-success"
                              : "bg-primary text-white hover:bg-primary-hover",
                          ].join(" ")}
                        >
                          {isGoing ? "Going" : "RSVP"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {rsvpMutation.isError && (
              <p className="mt-3 text-[11.5px] text-error" role="alert">
                {rsvpMutation.error?.response?.data?.message ||
                  "Could not update your RSVP. Sign in and try again."}
              </p>
            )}
          </>
        )}

        {meta?.pages > 1 && (
          <nav
            className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5"
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
      </div>
    </div>
  );
};

export default EventsPage;
