import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  cancelEvent,
  createEvent,
  getMyEvents,
  updateEvent,
} from "../api/eventsApi";
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

const inputClassName =
  "mt-1 block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export const EventManagementPage = () => {
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const queryClient = useQueryClient();
  const {
    data: eventsResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-events"],
    queryFn: getMyEvents,
  });

  const refreshEvents = () => {
    queryClient.invalidateQueries({ queryKey: ["my-events"] });
    queryClient.invalidateQueries({ queryKey: ["events"] });
  };

  const saveEventMutation = useMutation({
    mutationFn: ({ eventId, eventData }) =>
      eventId
        ? updateEvent({ eventId, eventData })
        : createEvent(eventData),
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
    mutationFn: (eventId) =>
      updateEvent({ eventId, eventData: { status: "published" } }),
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
    <main className="min-h-screen bg-background px-5 py-12 text-text-primary sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Event hosting
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Manage your events
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted">
            Create an event as a draft, review its details, then publish it
            for everyone to discover.
          </p>
        </header>

        <Card className="mt-8">
          <h2 className="text-lg font-semibold">
            {editingEvent ? "Edit event" : "Create an event"}
          </h2>
          <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            <label className="text-sm font-medium">
              Title
              <input
                className={inputClassName}
                name="title"
                value={form.title}
                onChange={(event) => updateFormField("title", event.target.value)}
                minLength={2}
                maxLength={200}
                required
              />
            </label>
            <label className="text-sm font-medium">
              Start date and time
              <input
                className={inputClassName}
                type="datetime-local"
                name="date"
                value={form.date}
                onChange={(event) => updateFormField("date", event.target.value)}
                required
              />
            </label>
            <label className="text-sm font-medium">
              Location
              <input
                className={inputClassName}
                name="location"
                value={form.location}
                onChange={(event) =>
                  updateFormField("location", event.target.value)
                }
                minLength={2}
                maxLength={300}
                required
              />
            </label>
            <label className="text-sm font-medium">
              Banner image URL
              <input
                className={inputClassName}
                type="url"
                name="banner"
                value={form.banner}
                onChange={(event) => updateFormField("banner", event.target.value)}
                required
              />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              Description
              <textarea
                className={inputClassName}
                name="description"
                value={form.description}
                onChange={(event) =>
                  updateFormField("description", event.target.value)
                }
                rows={4}
                maxLength={5000}
                required
              />
            </label>
            {(formError || saveError) && (
              <p className="text-sm text-error sm:col-span-2" role="alert">
                {formError || saveError}
              </p>
            )}
            {saveMessage && (
              <p className="text-sm text-success sm:col-span-2" role="status">
                {saveMessage}
              </p>
            )}
            <div className="flex flex-wrap gap-3 sm:col-span-2">
              <Button loading={saveEventMutation.isPending} type="submit">
                {editingEvent ? "Save changes" : "Create draft"}
              </Button>
              {editingEvent && (
                <Button
                  variant="secondary"
                  type="button"
                  onClick={resetForm}
                >
                  Stop editing
                </Button>
              )}
            </div>
          </form>
        </Card>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Your events</h2>
          {isLoading ? (
            <p className="mt-4 text-sm text-text-muted" role="status">
              Loading your events...
            </p>
          ) : isError ? (
            <div className="mt-4">
              <p className="text-sm text-error" role="alert">
                Your events could not be loaded.
              </p>
              <Button
                className="mt-3"
                variant="secondary"
                size="sm"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </div>
          ) : events.length === 0 ? (
            <p className="mt-4 text-sm text-text-muted">
              You have not created any events yet.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {events.map((event) => {
                const status = event.status || "published";
                return (
                  <Card
                    key={event._id}
                    className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium capitalize text-primary">
                        {status}
                      </p>
                      <h3 className="mt-1 truncate font-semibold">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-xs text-text-muted">
                        {formatEventDate(event.date)} · {event.location}
                      </p>
                    </div>
                    {status !== "cancelled" && (
                      <div className="flex shrink-0 flex-wrap gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => beginEdit(event)}
                        >
                          Edit
                        </Button>
                        {status === "draft" && (
                          <Button
                            size="sm"
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
                          variant="danger"
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
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
          {publishMutation.isError && (
            <p className="mt-3 text-sm text-error" role="alert">
              The event could not be published. Please try again.
            </p>
          )}
          {cancelMutation.isError && (
            <p className="mt-3 text-sm text-error" role="alert">
              The event could not be cancelled. Please try again.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};
