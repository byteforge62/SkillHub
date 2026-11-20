import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Clock, MapPin, RefreshCw, Users } from "lucide-react";

import { AvatarStack } from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { formatEventDate } from "../utils/eventDate";
import { getEventById, rsvpEvent } from "../api/eventsApi";

const timeOf = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export const EventDetailsPage = () => {
  const { eventId } = useParams();
  const queryClient = useQueryClient();

  const { data: eventResponse, isLoading, isError, refetch } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId),
    enabled: Boolean(eventId),
  });

  const rsvpMutation = useMutation({
    mutationFn: rsvpEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  if (isLoading) {
    return (
      <div role="status">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="mt-4 h-8 w-3/4" />
        <Skeleton className="mt-3 h-3 w-52" />
        <Skeleton className="mt-6 h-64 w-full rounded-[24px]" />
        <span className="sr-only">Loading event...</span>
      </div>
    );
  }

  if (isError || !eventResponse?.data) {
    return (
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
    );
  }

  const event = eventResponse.data;
  const isGoing =
    event.isRegistered ||
    (rsvpMutation.data?.data?._id === event._id &&
      rsvpMutation.data?.data?.isRegistered);
  const attendees = event.attendees ?? [];

  return (
    <div>
      <header className="border-b border-line pb-6">
        <Link
          to="/events"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-text-muted transition-colors hover:text-primary"
        >
          ← All events
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="sage" size="sm" icon={CalendarDays}>
            {formatEventDate(event.date)}
          </Badge>

          {event.location && (
            <Badge variant="outline" size="sm" icon={MapPin}>
              {event.location}
            </Badge>
          )}

          {event.duration ? (
            <Badge variant="outline" size="sm" icon={Clock}>
              {event.duration} min
            </Badge>
          ) : null}
        </div>

        <h1 className="mt-4 max-w-3xl text-[clamp(1.6rem,3vw,2rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
          {event.title}
        </h1>

        <p className="mt-2 text-[13px] text-text-secondary">
          {timeOf(event.date)}
          {event.host?.fullname ? ` · hosted by ${event.host.fullname}` : ""}
          {event.attendeeCount > 0
            ? ` · ${event.attendeeCount} registered`
            : ""}
        </p>
      </header>

      <div className="editorial-split mt-8">
        <article className="min-w-0 rounded-[24px] border border-line bg-white px-6 py-6">
          <h2 className="section-label">About this event</h2>

          <p className="mt-3 whitespace-pre-line text-[14px] leading-[1.7] text-text-secondary">
            {event.description}
          </p>
        </article>

        <aside className="space-y-4">
          <section className="rounded-[16px] border border-line bg-white px-5 py-5">
            <h2 className="section-label">Session details</h2>

            <dl className="mt-4 space-y-3.5 text-[13px]">
              <div className="flex items-start gap-2.5">
                <CalendarDays
                  size={15}
                  className="mt-0.5 shrink-0 text-primary"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-medium text-text-primary">When</dt>
                  <dd className="text-text-secondary">
                    {formatEventDate(event.date)}
                    {timeOf(event.date) ? ` · ${timeOf(event.date)}` : ""}
                  </dd>
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
                  <dd className="text-text-secondary">
                    {event.location || "To be confirmed"}
                  </dd>
                </div>
              </div>

              {event.host?.fullname && (
                <div className="flex items-start gap-2.5">
                  <Users
                    size={15}
                    className="mt-0.5 shrink-0 text-primary"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-medium text-text-primary">Host</dt>
                    <dd className="text-text-secondary">{event.host.fullname}</dd>
                  </div>
                </div>
              )}

              {event.seatsLeft !== null && event.seatsLeft !== undefined && (
                <div className="flex items-start gap-2.5">
                  <Clock
                    size={15}
                    className="mt-0.5 shrink-0 text-primary"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="font-medium text-text-primary">Capacity</dt>
                    <dd className="text-text-secondary">
                      {event.seatsLeft} seats left
                    </dd>
                  </div>
                </div>
              )}
            </dl>

            {attendees.length > 0 && (
              <div className="mt-5 border-t border-line pt-4">
                <AvatarStack
                  people={attendees}
                  max={4}
                  size="sm"
                  label={`${event.attendeeCount} registered`}
                />
              </div>
            )}

            <Button
              fullWidth
              size="sm"
              className="mt-5"
              variant={isGoing ? "secondary" : "primary"}
              loading={rsvpMutation.isPending}
              onClick={() => rsvpMutation.mutate(event._id)}
            >
              {isGoing ? "You're registered" : "RSVP to this session"}
            </Button>

            {rsvpMutation.isError && (
              <p className="mt-2 text-[11.5px] text-error" role="alert">
                {rsvpMutation.error?.response?.data?.message ||
                  "Could not update your RSVP. Sign in and try again."}
              </p>
            )}

            <Button
              as={Link}
              to="/events"
              variant="ghost"
              size="sm"
              className="mt-2 w-full"
            >
              See other events
            </Button>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default EventDetailsPage;
