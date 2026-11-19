import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, CheckCircle2, MapPin, RefreshCw } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { getEventById } from "../api/eventsApi";
import { formatEventDate } from "../utils/eventDate";

export const EventDetailsPage = () => {
  const { eventId } = useParams();

  const { data: eventResponse, isLoading, isError, refetch } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId),
    enabled: Boolean(eventId),
  });

  if (isLoading) {
    return (
      <main className="container-narrow py-14 sm:py-20" role="status">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-6 h-10 w-3/4" />
        <Skeleton className="mt-4 h-4 w-52" />
        <Skeleton className="mt-8 h-64 w-full rounded-3xl" />
        <span className="sr-only">Loading event...</span>
      </main>
    );
  }

  if (isError || !eventResponse?.data) {
    return (
      <main className="container-narrow py-14 sm:py-20">
        <EmptyState
          tone="error"
          icon={RefreshCw}
          title="This event couldn't be loaded"
          description="It may have been cancelled or removed by the host."
          action={
            <div className="flex flex-wrap justify-center gap-2.5">
              {isError && (
                <Button variant="secondary" onClick={() => refetch()}>
                  Try again
                </Button>
              )}
              <Button as={Link} to="/events" variant="ghost">
                Browse events
              </Button>
            </div>
          }
        />
      </main>
    );
  }

  const event = eventResponse.data;

  return (
    <main>
      <section className="sage-mesh relative overflow-hidden border-b border-[color:var(--color-line)]">
        <div className="architectural-grid absolute inset-0" aria-hidden="true" />

        <div className="container-narrow relative py-12 sm:py-16">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-text-muted transition-colors hover:text-primary"
          >
            ← All events
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge variant="forest" size="sm" icon={CalendarDays}>
              {formatEventDate(event.date)}
            </Badge>

            {event.location && (
              <Badge variant="outline" size="sm" icon={MapPin}>
                {event.location}
              </Badge>
            )}
          </div>

          <h1 className="mt-5 max-w-3xl text-[clamp(2rem,4.4vw,3.2rem)] font-bold leading-[1.03] tracking-[-0.045em]">
            {event.title}
          </h1>
        </div>
      </section>

      <article className="container-narrow py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
          <Card>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
              About this event
            </h2>

            <p className="mt-4 whitespace-pre-line text-[14.5px] leading-8 text-text-secondary">
              {event.description}
            </p>
          </Card>

          <Card variant="sage">
            <h2 className="text-[15px] font-semibold tracking-[-0.02em] text-primary">
              Session details
            </h2>

            <dl className="mt-4 space-y-3 text-[13px]">
              <div className="flex items-start gap-2.5">
                <CalendarDays
                  size={15}
                  className="mt-0.5 shrink-0 text-primary"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-medium text-text-primary">When</dt>
                  <dd className="text-text-secondary">{formatEventDate(event.date)}</dd>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin
                  size={15}
                  className="mt-0.5 shrink-0 text-primary"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-medium text-text-primary">Where</dt>
                  <dd className="text-text-secondary">{event.location || "To be confirmed"}</dd>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-primary"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-medium text-text-primary">Status</dt>
                  <dd className="capitalize text-text-secondary">
                    {event.status || "published"}
                  </dd>
                </div>
              </div>
            </dl>

            <Button as={Link} to="/events" variant="secondary" size="sm" className="mt-6 w-fit">
              See other events
            </Button>
          </Card>
        </div>
      </article>
    </main>
  );
};

export default EventDetailsPage;
