import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getEventById } from "../api/eventsApi";
import { formatEventDate } from "../utils/eventDate";

export const EventDetailsPage = () => {
  const { eventId } = useParams();
  const {
    data: eventResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId),
    enabled: Boolean(eventId),
  });

  if (isLoading) {
    return (
      <main className="min-h-[60vh] px-5 py-12 sm:px-8" role="status">
        <div className="mx-auto h-64 max-w-3xl animate-pulse rounded-2xl bg-surface-hover" />
        <span className="sr-only">Loading event...</span>
      </main>
    );
  }

  if (isError || !eventResponse?.data) {
    return (
      <main className="min-h-[60vh] px-5 py-12 sm:px-8">
        <Card className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm text-error" role="alert">
              This event could not be loaded.
            </p>
            {isError && (
              <Button
                className="mt-4"
                variant="secondary"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            )}
            <Link
              to="/events"
              className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
            >
              Browse events
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  const event = eventResponse.data;

  return (
    <main className="min-h-[60vh] bg-background px-5 py-12 text-text-primary sm:px-8">
      <article className="mx-auto max-w-3xl">
        <Link
          to="/events"
          className="text-sm font-medium text-text-muted hover:text-primary"
        >
          ← All events
        </Link>
        <Card className="mt-5">
          <p className="text-sm font-medium text-primary">
            {formatEventDate(event.date)}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {event.title}
          </h1>
          <p className="mt-3 text-sm text-text-secondary">{event.location}</p>
          <div className="mt-6 border-t border-border pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              About this event
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-text-secondary">
              {event.description}
            </p>
          </div>
        </Card>
      </article>
    </main>
  );
};
