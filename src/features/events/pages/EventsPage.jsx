import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getEvents } from "../api/eventsApi";
import { formatEventDate } from "../utils/eventDate";

const PAGE_SIZE = 12;

export const EventsPage = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: eventsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
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
    <main className="min-h-screen bg-background px-5 py-12 text-text-primary sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Learn together
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Upcoming events
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">
              Discover workshops and technical sessions hosted by the
              SkillHub community.
            </p>
          </div>
          <Link
            to="/events/manage"
            className="inline-flex text-sm font-medium text-primary hover:underline"
          >
            Host or manage an event
          </Link>
        </div>

        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            setPage(1);
            setSearchTerm(searchInput.trim());
          }}
        >
          <label className="sr-only" htmlFor="event-search">
            Search events
          </label>
          <input
            id="event-search"
            className="min-h-11 flex-1 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Search events"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            maxLength={100}
          />
          <Button type="submit" variant="secondary">
            Search
          </Button>
        </form>

        <div className="mt-6">
          {isLoading ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" role="status">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-56 animate-pulse rounded-xl bg-surface-hover"
                />
              ))}
              <span className="sr-only">Loading upcoming events...</span>
            </div>
          ) : isError ? (
            <Card>
              <div className="text-center">
                <p className="text-sm text-error" role="alert">
                  Events could not be loaded.
                </p>
                <Button className="mt-4" variant="secondary" onClick={() => refetch()}>
                  Retry
                </Button>
              </div>
            </Card>
          ) : events.length === 0 ? (
            <Card>
              <div className="py-8 text-center">
                <h2 className="text-lg font-semibold">
                  {searchTerm ? "No matching events" : "No upcoming events"}
                </h2>
                <p className="mt-2 text-sm text-text-muted">
                  {searchTerm
                    ? "Try another search term."
                    : "Published events will appear here when they are scheduled."}
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Card key={event._id} className="flex h-full flex-col">
                  <p className="text-xs font-medium text-primary">
                    {formatEventDate(event.date)}
                  </p>
                  <h2 className="mt-3 text-lg font-semibold leading-6">
                    {event.title}
                  </h2>
                  <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-text-muted">
                    {event.description}
                  </p>
                  <p className="mt-4 text-xs text-text-secondary">
                    {event.location}
                  </p>
                  <Link
                    to={`/events/${event._id}`}
                    className="mt-5 inline-flex text-sm font-semibold text-primary hover:underline"
                  >
                    View details
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>

        {meta?.pages > 1 && (
          <nav
            className="mt-8 flex items-center justify-between border-t border-border pt-5"
            aria-label="Event pages"
          >
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((currentPage) => currentPage - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-text-muted">
              Page {meta.page} of {meta.pages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= meta.pages}
              onClick={() => setPage((currentPage) => currentPage + 1)}
            >
              Next
            </Button>
          </nav>
        )}
      </div>
    </main>
  );
};
