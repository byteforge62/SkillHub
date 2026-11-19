import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  MapPin,
  PenLine,
  RefreshCw,
  Send,
  X,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Input, { Textarea } from "@/components/ui/Input";
import PageHeader from "@/components/ui/PageHeader";
import Skeleton from "@/components/ui/Skeleton";

import { cancelEvent, createEvent, getMyEvents, updateEvent } from "../api/eventsApi";
import {
  formatEventDate,
  localDateTimeToIso,
  toLocalDateTimeInput,
} from "../utils/eventDate";

const emptyForm = {
  title: "",
  description: "",
  date: "",
  location: "",
  banner: "",
};

const statusVariant = (status) => {
  if (status === "published") return "success";
  if (status === "cancelled") return "danger";
  return "neutral";
};

export const EventManagementPage = () => {
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const queryClient = useQueryClient();

  const { data: eventsResponse, isLoading, isError, refetch } = useQuery({
    queryKey: ["my-events"],
    queryFn: getMyEvents,
  });

  const refreshEvents = () => {
    queryClient.invalidateQueries({ queryKey: ["my-events"] });
    queryClient.invalidateQueries({ queryKey: ["events"] });
  };

  const saveEventMutation = useMutation({
    mutationFn: ({ eventId, eventData }) =>
      eventId ? updateEvent({ eventId, eventData }) : createEvent(eventData),
    onSuccess: (_response, variables) => {
      refreshEvents();
      setSaveMessage(
        variables.eventId ? "Event changes saved." : "Event created as a draft.",
      );
      setEditingEvent(null);
      setForm(emptyForm);
    },
  });

  const publishMutation = useMutation({
    mutationFn: (eventId) => updateEvent({ eventId, eventData: { status: "published" } }),
    onSuccess: refreshEvents,
  });

  const cancelMutation = useMutation({
    mutationFn: cancelEvent,
    onSuccess: refreshEvents,
  });

  const events = eventsResponse?.data || [];
  const saveError =
    saveEventMutation.error?.response?.data?.message ||
    (saveEventMutation.isError
      ? "The event could not be saved. Please try again."
      : "");

  const beginEdit = (event) => {
    setEditingEvent(event);
    setFormError("");
    setSaveMessage("");
    setForm({
      title: event.title || "",
      description: event.description || "",
      date: toLocalDateTimeInput(event.date),
      location: event.location || "",
      banner: event.banner || "",
    });
    saveEventMutation.reset();
  };

  const resetForm = () => {
    setEditingEvent(null);
    setForm(emptyForm);
    setFormError("");
    setSaveMessage("");
    saveEventMutation.reset();
  };

  const updateFormField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFormError("");
    setSaveMessage("");
    if (saveEventMutation.isError || saveEventMutation.isSuccess) {
      saveEventMutation.reset();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const date = localDateTimeToIso(form.date);

    if (!date) {
      setFormError("Enter a valid start date and time.");
      return;
    }

    setFormError("");
    setSaveMessage("");
    saveEventMutation.mutate({
      eventId: editingEvent?._id,
      eventData: { ...form, date },
    });
  };

  return (
    <div>
      <PageHeader
        title="Manage events"
        description="Create a draft, review the details, then publish it for everyone to discover."
        action={
          editingEvent ? (
            <Button variant="secondary" size="sm" iconLeft={X} onClick={resetForm}>
              Stop editing
            </Button>
          ) : null
        }
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <Card>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sage text-primary">
              <PenLine size={16} strokeWidth={1.9} aria-hidden="true" />
            </span>
            <h2 className="text-[15px] font-semibold tracking-[-0.02em]">
              {editingEvent ? "Edit event" : "Create an event"}
            </h2>
          </div>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Title"
              name="title"
              value={form.title}
              onChange={(event) => updateFormField("title", event.target.value)}
              minLength={2}
              maxLength={200}
              placeholder="Designing accessible interfaces"
              required
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Start date and time"
                type="datetime-local"
                name="date"
                value={form.date}
                onChange={(event) => updateFormField("date", event.target.value)}
                required
              />

              <Input
                label="Location"
                name="location"
                value={form.location}
                onChange={(event) => updateFormField("location", event.target.value)}
                minLength={2}
                maxLength={300}
                placeholder="Online or a venue"
                required
              />
            </div>

            <Input
              label="Banner image URL"
              type="url"
              name="banner"
              value={form.banner}
              onChange={(event) => updateFormField("banner", event.target.value)}
              placeholder="https://"
              required
            />

            <Textarea
              label="Description"
              name="description"
              value={form.description}
              onChange={(event) => updateFormField("description", event.target.value)}
              rows={5}
              maxLength={5000}
              placeholder="What will people learn, and who is it for?"
              required
            />

            {(formError || saveError) && (
              <p className="text-[12.5px] text-error" role="alert">
                {formError || saveError}
              </p>
            )}

            {saveMessage && (
              <p className="text-[12.5px] text-success" role="status">
                {saveMessage}
              </p>
            )}

            <div className="flex flex-wrap gap-2.5 pt-1">
              <Button loading={saveEventMutation.isPending} type="submit">
                {editingEvent ? "Save changes" : "Create draft"}
              </Button>
            </div>
          </form>
        </Card>

        <section aria-label="Your events">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[17px] font-bold tracking-[-0.025em]">Your events</h2>
            {events.length > 0 && (
              <span className="text-[12px] text-text-muted">{events.length} total</span>
            )}
          </div>

          <div className="mt-3.5 space-y-2.5">
            {isLoading &&
              [0, 1].map((item) => <Skeleton key={item} className="h-24 rounded-3xl" />)}

            {isError && (
              <EmptyState
                tone="error"
                icon={RefreshCw}
                title="Your events couldn't be loaded"
                description="We could not reach your hosted events."
                action={
                  <Button variant="secondary" size="sm" onClick={() => refetch()}>
                    Try again
                  </Button>
                }
              />
            )}

            {!isLoading && !isError && events.length === 0 && (
              <EmptyState
                icon={CalendarDays}
                title="No events yet"
                description="Create your first draft with the form beside this panel."
                className="py-10"
              />
            )}

            {events.map((event) => {
              const status = event.status || "published";

              return (
                <Card key={event._id} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <Badge variant={statusVariant(status)} size="sm">
                      {status}
                    </Badge>

                    <span className="text-[11px] text-text-muted">
                      {formatEventDate(event.date)}
                    </span>
                  </div>

                  <h3 className="mt-2 line-clamp-2 text-[14.5px] font-semibold leading-6 tracking-[-0.01em]">
                    {event.title}
                  </h3>

                  <p className="mt-1 inline-flex items-center gap-1.5 text-[11.5px] text-text-muted">
                    <MapPin size={11} aria-hidden="true" />
                    <span className="truncate">{event.location}</span>
                  </p>

                  {status !== "cancelled" && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        iconLeft={PenLine}
                        onClick={() => beginEdit(event)}
                      >
                        Edit
                      </Button>

                      {status === "draft" && (
                        <Button
                          size="sm"
                          iconLeft={Send}
                          loading={
                            publishMutation.isPending &&
                            publishMutation.variables === event._id
                          }
                          onClick={() => publishMutation.mutate(event._id)}
                        >
                          Publish
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        loading={
                          cancelMutation.isPending &&
                          cancelMutation.variables === event._id
                        }
                        onClick={() => {
                          if (
                            window.confirm(
                              `Cancel "${event.title}"? This cannot be undone.`,
                            )
                          ) {
                            cancelMutation.mutate(event._id);
                          }
                        }}
                      >
                        Cancel event
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}

            {publishMutation.isError && (
              <p className="text-[12.5px] text-error" role="alert">
                The event could not be published. Please try again.
              </p>
            )}

            {cancelMutation.isError && (
              <p className="text-[12.5px] text-error" role="alert">
                The event could not be cancelled. Please try again.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EventManagementPage;
