import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  ChevronDown,
  ImagePlus,
  Layers,
  Loader2,
  Plus,
  Rocket,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CourseThumbnail from "@/components/ui/CourseThumbnail";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";

import * as studioApi from "../api/studioApi";

const DEMO_TAG = "skillhub-demo";

const fieldClass =
  "h-11 w-full rounded-[12px] border border-line bg-white px-3.5 text-[13.5px] text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

const Field = ({ label, hint, error, children, className }) => (
  <label className={cn("block", className)}>
    <span className="text-[12.5px] font-medium text-text-secondary">{label}</span>
    <div className="mt-1.5">{children}</div>
    {error ? (
      <span className="mt-1 block text-[11.5px] text-error">{error}</span>
    ) : (
      hint && <span className="mt-1 block text-[11.5px] text-text-muted">{hint}</span>
    )}
  </label>
);

const Segmented = ({ options, value, onChange, label }) => (
  <div
    className="inline-flex flex-wrap gap-1 rounded-full border border-line bg-white p-1"
    role="group"
    aria-label={label}
  >
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        aria-pressed={value === option.value}
        onClick={() => onChange(option.value)}
        className={cn(
          "h-8 rounded-full px-3.5 text-[12.5px] font-medium transition-colors",
          value === option.value
            ? "bg-primary text-white"
            : "text-text-secondary hover:bg-sage hover:text-primary",
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
);

const Toggle = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={cn(
      "relative inline-flex h-7 w-12 items-center rounded-full transition-colors",
      checked ? "bg-primary" : "bg-sage-soft",
    )}
  >
    <span
      className={cn(
        "ml-1 inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
        checked ? "translate-x-5" : "translate-x-0",
      )}
      aria-hidden="true"
    />
  </button>
);

const TABS = [
  { value: "basics", label: "Details" },
  { value: "curriculum", label: "Curriculum" },
  { value: "publishing", label: "Publishing" },
];

const emptyForm = {
  title: "",
  description: "",
  overview: "",
  category: "",
  level: "Beginner",
  language: "English",
  duration: "60",
  price: "0",
  cohortLabel: "",
  tags: "",
};

const toFormState = (course) => ({
  title: course?.title || "",
  description: course?.description || "",
  overview: course?.overview || "",
  category: course?.category?._id || course?.category || "",
  level: course?.level || "Beginner",
  language: course?.language || "English",
  duration: String(course?.duration ?? 60),
  price: String(course?.price ?? 0),
  cohortLabel: course?.cohortLabel || "",
  tags: (course?.tags || []).filter((tag) => tag !== DEMO_TAG).join(", "),
});

const BasicsForm = ({ initial, categories, onSubmit, submitLabel, isSaving }) => {
  const [form, setForm] = useState(() => toFormState(initial));
  const [errors, setErrors] = useState({});

  const setField = (key) => (event) =>
    setForm((previous) => ({ ...previous, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (form.title.trim().length < 3) {
      nextErrors.title = "Give the course a title of at least 3 characters.";
    }
    if (form.description.trim().length < 20) {
      nextErrors.description = "Write at least 20 characters so learners know what it is.";
    }
    if (!form.category) {
      nextErrors.category = "Pick the category this course belongs to.";
    }
    if (!Number.isFinite(Number(form.duration)) || Number(form.duration) < 1) {
      nextErrors.duration = "Duration must be at least 1 minute.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      overview: form.overview.trim() || null,
      category: form.category,
      level: form.level,
      language: form.language.trim() || "English",
      duration: Math.round(Number(form.duration)),
      price: Number(form.price) > 0 ? Number(form.price) : 0,
      cohortLabel: form.cohortLabel.trim() || null,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 10),
    });
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Course title" error={errors.title} className="sm:col-span-2">
          <input
            className={fieldClass}
            value={form.title}
            onChange={setField("title")}
            placeholder="e.g. Debugging Node Services in Production"
            maxLength={150}
          />
        </Field>

        <Field
          label="Short description"
          hint="Shown on catalog cards. One clear sentence about the outcome."
          error={errors.description}
          className="sm:col-span-2"
        >
          <textarea
            className={cn(fieldClass, "h-24 resize-y py-2.5")}
            value={form.description}
            onChange={setField("description")}
            placeholder="What will someone be able to do after finishing?"
            maxLength={2000}
          />
        </Field>

        <Field label="Category" error={errors.category}>
          <select className={fieldClass} value={form.category} onChange={setField("category")}>
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Level">
          <select className={fieldClass} value={form.level} onChange={setField("level")}>
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Duration (minutes)" error={errors.duration}>
          <input
            type="number"
            min={1}
            max={20000}
            className={fieldClass}
            value={form.duration}
            onChange={setField("duration")}
          />
        </Field>

        <Field label="Price (USD)" hint="Leave at 0 for a free track.">
          <input
            type="number"
            min={0}
            className={fieldClass}
            value={form.price}
            onChange={setField("price")}
          />
        </Field>

        <Field label="Language">
          <input
            className={fieldClass}
            value={form.language}
            onChange={setField("language")}
            maxLength={50}
          />
        </Field>

        <Field label="Cohort label" hint="Optional pill, e.g. “Live cohort”.">
          <input
            className={fieldClass}
            value={form.cohortLabel}
            onChange={setField("cohortLabel")}
            maxLength={40}
            placeholder="Self-paced"
          />
        </Field>

        <Field
          label="Tags"
          hint="Comma separated, up to 10. These become the “what you'll cover” list."
          className="sm:col-span-2"
        >
          <input
            className={fieldClass}
            value={form.tags}
            onChange={setField("tags")}
            placeholder="node, observability, debugging"
          />
        </Field>

        <Field label="Overview" hint="Optional longer framing shown on the course page." className="sm:col-span-2">
          <textarea
            className={cn(fieldClass, "h-28 resize-y py-2.5")}
            value={form.overview}
            onChange={setField("overview")}
            maxLength={3000}
          />
        </Field>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border-subtle pt-4">
        <p className="text-[11.5px] text-text-muted">
          Everything stays a draft until you publish it.
        </p>
        <Button type="submit" size="sm" loading={isSaving}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

/* ---------------------------------------------------------------
   New course
   --------------------------------------------------------------- */

export const NewCoursePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: studioApi.getCategories,
    staleTime: 10 * 60 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: studioApi.createCourse,
    onSuccess: (response) => {
      toast.success("Draft created — add your curriculum next");
      queryClient.invalidateQueries({ queryKey: ["studio-courses"] });
      if (response?.data?._id) {
        navigate(`/studio/${response.data._id}`);
      } else {
        navigate("/studio");
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "The course could not be created.");
    },
  });

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        backTo="/studio"
        backLabel="Creator studio"
        eyebrow="New course"
        title="Turn what you know into a track"
        description="Start with the details. You can add sections, lessons and a cover image right after saving the draft."
      />

      <Card className="mt-7">
        {categoriesQuery.isLoading ? (
          <div className="space-y-3" role="status">
            <Skeleton className="h-11 rounded-[12px]" />
            <Skeleton className="h-24 rounded-[12px]" />
            <Skeleton className="h-11 rounded-[12px]" />
          </div>
        ) : categoriesQuery.data?.data?.length ? (
          <BasicsForm
            initial={emptyForm}
            categories={categoriesQuery.data.data}
            onSubmit={(payload) => createMutation.mutate(payload)}
            submitLabel="Create draft"
            isSaving={createMutation.isPending}
          />
        ) : (
          <EmptyState
            icon={Layers}
            title="No categories available"
            description="An administrator needs to create at least one category before a course can be drafted."
          />
        )}
      </Card>
    </div>
  );
};

/* ---------------------------------------------------------------
   Curriculum
   --------------------------------------------------------------- */

const emptyLesson = {
  title: "",
  minutes: "10",
  format: "text",
  content: "",
  preview: false,
};

const toLessonForm = (lesson) => {
  if (!lesson) return emptyLesson;

  const block = Array.isArray(lesson.blocks) ? lesson.blocks[0] : null;
  const format = block?.type === "code" || block?.type === "video" ? block.type : "text";
  const content =
    format === "code"
      ? block?.data?.code || ""
      : format === "video"
        ? block?.data?.url || ""
        : block?.data?.content || "";

  return {
    title: lesson.title || "",
    minutes: String(lesson.duration ?? 10),
    format,
    content,
    preview: Boolean(lesson.isPreview),
  };
};

const buildLessonPayload = (form) => {
  const value = form.content.trim();
  const blocks =
    form.format === "code"
      ? [{ type: "code", order: 1, data: { language: "javascript", code: value } }]
      : form.format === "video"
        ? [{ type: "video", order: 1, data: { url: value, provider: "external" } }]
        : [{ type: "text", order: 1, data: { content: value } }];

  return {
    title: form.title.trim(),
    description: value.slice(0, 180),
    duration: Math.max(0, Math.round(Number(form.minutes) || 0)),
    isPreview: Boolean(form.preview),
    blocks,
  };
};

const LessonForm = ({ initial, onSubmit, onCancel, isSaving, submitLabel }) => {
  const [form, setForm] = useState(initial || emptyLesson);
  const [error, setError] = useState("");

  const setField = (key) => (event) =>
    setForm((previous) => ({ ...previous, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();

    if (form.title.trim().length < 2) {
      setError("Lessons need a title of at least 2 characters.");
      return;
    }
    if (!form.content.trim()) {
      setError(form.format === "video" ? "Add the video URL." : "Add the lesson content.");
      return;
    }
    if (form.format === "video" && !/^https?:\/\//i.test(form.content.trim())) {
      setError("Video lessons need a full http(s) URL.");
      return;
    }

    setError("");
    onSubmit(buildLessonPayload(form));
  };

  return (
    <form onSubmit={submit} className="mt-3 space-y-3 rounded-[12px] bg-background p-4">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_120px_140px]">
        <Field label="Lesson title">
          <input
            className={fieldClass}
            value={form.title}
            onChange={setField("title")}
            maxLength={200}
            placeholder="e.g. Reading a stack trace"
          />
        </Field>

        <Field label="Minutes">
          <input
            type="number"
            min={0}
            className={fieldClass}
            value={form.minutes}
            onChange={setField("minutes")}
          />
        </Field>

        <Field label="Format">
          <select className={fieldClass} value={form.format} onChange={setField("format")}>
            <option value="text">Text</option>
            <option value="code">Code</option>
            <option value="video">Video</option>
          </select>
        </Field>
      </div>

      <Field
        label={
          form.format === "video"
            ? "Video URL"
            : form.format === "code"
              ? "Code sample"
              : "Lesson content"
        }
      >
        <textarea
          className={cn(fieldClass, "h-28 resize-y py-2.5 font-mono text-[12.5px]")}
          value={form.content}
          onChange={setField("content")}
          placeholder={
            form.format === "video"
              ? "https://…"
              : form.format === "code"
                ? "const value = compute();"
                : "Explain the idea in plain language…"
          }
        />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="inline-flex items-center gap-2 text-[12px] text-text-secondary">
          <Toggle
            label="Free preview lesson"
            checked={Boolean(form.preview)}
            onChange={(value) => setForm((previous) => ({ ...previous, preview: value }))}
          />
          Free preview
        </label>

        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" size="sm" loading={isSaving}>
            {submitLabel}
          </Button>
        </div>
      </div>

      {error && (
        <p className="text-[12px] text-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
};

const SectionLessons = ({ section, onChanged }) => {
  const queryClient = useQueryClient();
  const [view, setView] = useState({ mode: "list", lessonId: null });

  const lessonsQuery = useQuery({
    queryKey: ["studio-lessons", section._id],
    queryFn: () => studioApi.getSectionLessons(section._id),
  });

  const lessons = lessonsQuery.data?.data ?? [];

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["studio-lessons", section._id] });
    onChanged?.();
  };

  const createMutation = useMutation({
    mutationFn: (payload) =>
      studioApi.createLesson(section._id, {
        ...payload,
        order: lessons.length + 1,
      }),
    onSuccess: () => {
      toast.success("Lesson added");
      setView({ mode: "list", lessonId: null });
      refresh();
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "The lesson could not be saved."),
  });

  const updateMutation = useMutation({
    mutationFn: ({ lessonId, payload }) => studioApi.updateLesson(lessonId, payload),
    onSuccess: () => {
      toast.success("Lesson updated");
      setView({ mode: "list", lessonId: null });
      refresh();
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "The lesson could not be updated."),
  });

  const publishMutation = useMutation({
    mutationFn: studioApi.publishLesson,
    onSuccess: () => {
      toast.success("Lesson published");
      refresh();
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "The lesson could not be published."),
  });

  const deleteMutation = useMutation({
    mutationFn: studioApi.deleteLesson,
    onSuccess: () => {
      toast.success("Lesson removed");
      refresh();
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "The lesson could not be removed."),
  });

  return (
    <div className="mt-3 border-t border-border-subtle pt-3">
      {lessonsQuery.isLoading && (
        <p className="text-[12px] text-text-muted" role="status">
          Loading lessons…
        </p>
      )}

      {lessonsQuery.isError && (
        <p className="text-[12px] text-error">Lessons could not be loaded.</p>
      )}

      {!lessonsQuery.isLoading && !lessonsQuery.isError && (
        <ul className="space-y-1">
          {lessons.length === 0 && (
            <li className="px-1 py-1 text-[12px] text-text-muted">
              No lessons in this section yet.
            </li>
          )}

          {lessons.map((lesson) => (
            <li key={lesson._id}>
              <div className="flex flex-wrap items-center gap-2 rounded-[10px] px-2 py-2 hover:bg-white">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage text-[10px] font-semibold text-primary">
                  {lesson.order}
                </span>

                <span className="min-w-0 flex-1 truncate text-[12.5px] text-text-primary">
                  {lesson.title}
                </span>

                <span className="text-[11px] text-text-muted">{lesson.duration} min</span>

                <Badge
                  variant={lesson.status === "published" ? "success" : "warning"}
                  size="sm"
                >
                  {lesson.status === "published" ? "Published" : "Draft"}
                </Badge>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setView({
                        mode: view.lessonId === lesson._id ? "list" : "edit",
                        lessonId: lesson._id,
                      })
                    }
                    className="rounded-full px-2 py-1 text-[11.5px] font-medium text-text-secondary hover:bg-sage hover:text-primary"
                  >
                    {view.lessonId === lesson._id && view.mode === "edit" ? "Close" : "Edit"}
                  </button>

                  {lesson.status !== "published" && (
                    <button
                      type="button"
                      disabled={publishMutation.isPending}
                      onClick={() => publishMutation.mutate(lesson._id)}
                      className="rounded-full px-2 py-1 text-[11.5px] font-medium text-primary hover:bg-sage"
                    >
                      Publish
                    </button>
                  )}

                  <button
                    type="button"
                    aria-label={`Delete ${lesson.title}`}
                    disabled={deleteMutation.isPending}
                    onClick={() => {
                      if (window.confirm(`Remove “${lesson.title}” from this section?`)) {
                        deleteMutation.mutate(lesson._id);
                      }
                    }}
                    className="rounded-full p-1.5 text-text-muted hover:bg-error-soft hover:text-error"
                  >
                    <Trash2 size={12} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {view.mode === "edit" && view.lessonId === lesson._id && (
                <LessonForm
                  key={lesson._id}
                  initial={toLessonForm(lesson)}
                  submitLabel="Save lesson"
                  isSaving={updateMutation.isPending}
                  onCancel={() => setView({ mode: "list", lessonId: null })}
                  onSubmit={(payload) =>
                    updateMutation.mutate({ lessonId: lesson._id, payload })
                  }
                />
              )}
            </li>
          ))}
        </ul>
      )}

      {view.mode === "add" ? (
        <LessonForm
          key={`add-${section._id}`}
          submitLabel="Add lesson"
          isSaving={createMutation.isPending}
          onCancel={() => setView({ mode: "list", lessonId: null })}
          onSubmit={(payload) => createMutation.mutate(payload)}
        />
      ) : (
        <Button
          type="button"
          variant="link"
          size="sm"
          className="mt-2 px-2 text-[12px]"
          iconLeft={Plus}
          onClick={() => setView({ mode: "add", lessonId: null })}
        >
          Add lesson
        </Button>
      )}
    </div>
  );
};

const SectionRow = ({ section, onChanged }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [form, setForm] = useState({ title: section.title, description: section.description || "" });

  const updateMutation = useMutation({
    mutationFn: (payload) => studioApi.updateSection(section._id, payload),
    onSuccess: () => {
      toast.success("Section updated");
      setEditing(false);
      queryClient.invalidateQueries({ queryKey: ["studio-sections", section.course] });
      onChanged?.();
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "The section could not be saved."),
  });

  const deleteMutation = useMutation({
    mutationFn: () => studioApi.deleteSection(section._id),
    onSuccess: () => {
      toast.success("Section removed");
      onChanged?.();
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "The section could not be removed."),
  });

  return (
    <div className="rounded-[14px] border border-line bg-white">
      <div className="flex flex-wrap items-center gap-2 px-4 py-3">
        <button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          aria-expanded={open}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-primary"
        >
          <ChevronDown
            size={14}
            className={cn("transition-transform", open ? "" : "-rotate-90")}
            aria-hidden="true"
          />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[13.5px] font-semibold text-text-primary">
            {section.order}. {section.title}
          </p>
          {section.description && (
            <p className="truncate text-[11.5px] text-text-muted">{section.description}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setEditing((previous) => !previous)}
          className="rounded-full px-2 py-1 text-[11.5px] font-medium text-text-secondary hover:bg-sage hover:text-primary"
        >
          {editing ? "Close" : "Rename"}
        </button>

        {confirming ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
              className="rounded-full bg-error px-2.5 py-1 text-[11px] font-medium text-white"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded-full px-2 py-1 text-[11px] text-text-muted"
            >
              Keep
            </button>
          </div>
        ) : (
          <button
            type="button"
            aria-label={`Delete section ${section.title}`}
            onClick={() => setConfirming(true)}
            className="rounded-full p-1.5 text-text-muted hover:bg-error-soft hover:text-error"
          >
            <Trash2 size={12} aria-hidden="true" />
          </button>
        )}
      </div>

      {editing && (
        <form
          className="grid gap-2 border-t border-border-subtle px-4 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            if (form.title.trim().length < 2) return;
            updateMutation.mutate({
              title: form.title.trim(),
              description: form.description.trim(),
            });
          }}
        >
          <input
            className={fieldClass}
            value={form.title}
            onChange={(event) => setForm((p) => ({ ...p, title: event.target.value }))}
            aria-label="Section title"
            maxLength={150}
          />
          <input
            className={fieldClass}
            value={form.description}
            onChange={(event) => setForm((p) => ({ ...p, description: event.target.value }))}
            aria-label="Section description"
            maxLength={500}
            placeholder="Optional description"
          />
          <Button type="submit" size="sm" loading={updateMutation.isPending}>
            Save
          </Button>
        </form>
      )}

      {open && <div className="px-4 pb-4">
        <SectionLessons section={section} onChanged={onChanged} />
      </div>}
    </div>
  );
};

const CurriculumEditor = ({ courseId }) => {
  const queryClient = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });

  const sectionsQuery = useQuery({
    queryKey: ["studio-sections", courseId],
    queryFn: () => studioApi.getCourseSections(courseId),
  });

  const sections = sectionsQuery.data?.data ?? [];

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["studio-sections", courseId] });
    queryClient.invalidateQueries({ queryKey: ["studio-course", courseId] });
    queryClient.invalidateQueries({ queryKey: ["studio-courses"] });
  };

  const createMutation = useMutation({
    mutationFn: (payload) => studioApi.createSection(courseId, payload),
    onSuccess: () => {
      toast.success("Section added");
      setForm({ title: "", description: "" });
      setAdding(false);
      refresh();
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "The section could not be added."),
  });

  return (
    <div>
      {sectionsQuery.isLoading && (
        <div className="space-y-2" role="status">
          <Skeleton className="h-16 rounded-[14px]" />
          <Skeleton className="h-16 rounded-[14px]" />
        </div>
      )}

      {sectionsQuery.isError && (
        <EmptyState
          tone="error"
          icon={AlertCircle}
          title="Curriculum couldn't be loaded"
          description="Sections could not be fetched for this course."
        />
      )}

      {!sectionsQuery.isLoading && !sectionsQuery.isError && (
        <div className="space-y-2">
          {sections.length === 0 && !adding && (
            <EmptyState
              icon={Layers}
              title="No sections yet"
              description="A section groups lessons — think of it as a module or chapter."
              action={
                <Button size="sm" iconLeft={Plus} onClick={() => setAdding(true)}>
                  Add the first section
                </Button>
              }
            />
          )}

          {sections.map((section) => (
            <SectionRow key={section._id} section={section} onChanged={refresh} />
          ))}

          {adding ? (
            <form
              className="rounded-[14px] border border-dashed border-primary/30 bg-sage/40 p-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (form.title.trim().length < 2) {
                  toast.error("Sections need a title of at least 2 characters.");
                  return;
                }
                createMutation.mutate({
                  title: form.title.trim(),
                  description: form.description.trim(),
                  order: sections.length + 1,
                });
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Section title">
                  <input
                    className={fieldClass}
                    value={form.title}
                    onChange={(event) =>
                      setForm((previous) => ({ ...previous, title: event.target.value }))
                    }
                    maxLength={150}
                    placeholder="e.g. Debugging in production"
                  />
                </Field>

                <Field label="Description" hint="Optional, one line.">
                  <input
                    className={fieldClass}
                    value={form.description}
                    onChange={(event) =>
                      setForm((previous) => ({ ...previous, description: event.target.value }))
                    }
                    maxLength={500}
                  />
                </Field>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setAdding(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" loading={createMutation.isPending}>
                  Add section
                </Button>
              </div>
            </form>
          ) : (
            sections.length > 0 && (
              <Button variant="outline" size="sm" iconLeft={Plus} onClick={() => setAdding(true)}>
                Add section
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------------------------
   Publishing
   --------------------------------------------------------------- */

const PublishingTab = ({ course }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const publishMutation = useMutation({
    mutationFn: () => studioApi.publishCourse(course._id),
    onSuccess: () => {
      toast.success("Course published to the catalog");
      queryClient.invalidateQueries({ queryKey: ["studio-course", course._id] });
      queryClient.invalidateQueries({ queryKey: ["studio-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "The course could not be published."),
  });

  const archiveMutation = useMutation({
    mutationFn: () => studioApi.archiveCourse(course._id),
    onSuccess: () => {
      toast.success("Course archived");
      queryClient.invalidateQueries({ queryKey: ["studio-course", course._id] });
      queryClient.invalidateQueries({ queryKey: ["studio-courses"] });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "The course could not be archived."),
  });

  const deleteMutation = useMutation({
    mutationFn: () => studioApi.deleteCourse(course._id),
    onSuccess: () => {
      toast.success("Course deleted");
      queryClient.invalidateQueries({ queryKey: ["studio-courses"] });
      navigate("/studio");
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "The course could not be deleted."),
  });

  const checks = useMemo(
    () => [
      {
        label: "Title and description",
        done: course.title?.length >= 3 && course.description?.length >= 20,
      },
      { label: "Category and level", done: Boolean(course.category) },
      { label: "Cover image", done: Boolean(course.imageUrl) },
      { label: "At least one section", done: (course.sectionCount ?? 0) > 0 },
      { label: "At least one published lesson", done: (course.lessonCount ?? 0) > 0 },
    ],
    [course],
  );

  const ready = checks.every((check) => check.done);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <Card>
        <h2 className="text-[15px] font-semibold tracking-[-0.02em]">Ready to publish?</h2>
        <p className="mt-1 text-[12.5px] leading-6 text-text-muted">
          Publishing puts the course in the catalog immediately. Learners can enrol and your
          lessons become visible to them.
        </p>

        <ul className="mt-4 space-y-2.5">
          {checks.map((check) => (
            <li key={check.label} className="flex items-center gap-2.5 text-[13px]">
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  check.done ? "bg-success-soft text-success" : "bg-sage text-text-muted",
                )}
              >
                {check.done ? <Check size={12} aria-hidden="true" /> : <AlertCircle size={12} aria-hidden="true" />}
              </span>
              <span className={check.done ? "text-text-primary" : "text-text-secondary"}>
                {check.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border-subtle pt-4">
          {course.status === "published" ? (
            <Badge variant="success" size="md" dot>
              Published
            </Badge>
          ) : (
            <Button
              size="sm"
              iconLeft={Rocket}
              disabled={!ready || course.status === "archived"}
              loading={publishMutation.isPending}
              onClick={() => publishMutation.mutate()}
            >
              Publish course
            </Button>
          )}

          {course.status !== "archived" && (
            <Button
              size="sm"
              variant="secondary"
              loading={archiveMutation.isPending}
              onClick={() => archiveMutation.mutate()}
            >
              Archive
            </Button>
          )}

          <Button
            as={Link}
            to={`/courses/${course._id}`}
            size="sm"
            variant="ghost"
            iconRight={ArrowUpRight}
            className={course.status !== "published" ? "pointer-events-none opacity-40" : ""}
          >
            View in catalog
          </Button>
        </div>

        {!ready && course.status !== "published" && (
          <p className="mt-3 text-[11.5px] text-text-muted">
            Finish the checklist above to enable publishing.
          </p>
        )}
      </Card>

      <Card variant="sage">
        <h2 className="text-[14px] font-semibold text-primary">Danger zone</h2>
        <p className="mt-1.5 text-[12.5px] leading-6 text-text-secondary">
          Deleting removes the course, its sections, lessons and enrollments. This cannot be
          undone.
        </p>

        {confirmDelete ? (
          <div className="mt-4 flex items-center gap-2">
            <Button
              size="sm"
              variant="danger"
              loading={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate()}
            >
              Delete permanently
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setConfirmDelete(false)}>
              Keep
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="mt-4"
            iconLeft={Trash2}
            onClick={() => setConfirmDelete(true)}
          >
            Delete course
          </Button>
        )}
      </Card>
    </div>
  );
};

/* ---------------------------------------------------------------
   Editor shell
   --------------------------------------------------------------- */

export const CourseEditorPage = () => {
  const { courseId } = useParams();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState("basics");
  const fileInputRef = useRef(null);

  const courseQuery = useQuery({
    queryKey: ["studio-course", courseId],
    queryFn: () => studioApi.getManagedCourse(courseId),
    enabled: Boolean(courseId),
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: studioApi.getCategories,
    staleTime: 10 * 60 * 1000,
  });

  const course = courseQuery.data?.data;

  const updateMutation = useMutation({
    mutationFn: (payload) => studioApi.updateCourse(courseId, payload),
    onSuccess: () => {
      toast.success("Course details saved");
      queryClient.invalidateQueries({ queryKey: ["studio-course", courseId] });
      queryClient.invalidateQueries({ queryKey: ["studio-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "The course could not be saved."),
  });

  const uploadMutation = useMutation({
    mutationFn: (file) => studioApi.uploadCourseThumbnail(courseId, file),
    onSuccess: () => {
      toast.success("Cover image updated");
      queryClient.invalidateQueries({ queryKey: ["studio-course", courseId] });
      queryClient.invalidateQueries({ queryKey: ["studio-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "The cover image could not be uploaded."),
  });

  useEffect(() => {
    if (courseQuery.isError) {
      toast.error("This course could not be opened.");
    }
  }, [courseQuery.isError]);

  if (courseQuery.isLoading) {
    return (
      <div className="space-y-4" role="status">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-12 w-full rounded-full" />
        <Skeleton className="h-72 w-full rounded-[16px]" />
        <span className="sr-only">Loading the course editor…</span>
      </div>
    );
  }

  if (courseQuery.isError || !course) {
    return (
      <EmptyState
        tone="error"
        icon={AlertCircle}
        title="This course couldn't be opened"
        description="It may have been removed, or it belongs to another author."
        action={
          <Button as={Link} to="/studio" variant="secondary">
            Back to studio
          </Button>
        }
      />
    );
  }

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!/^image\/(jpeg|png|webp|avif)$/i.test(file.type)) {
      toast.error("Use a JPEG, PNG, WebP or AVIF image.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Cover images must be 8 MB or smaller.");
      return;
    }

    uploadMutation.mutate(file);
  };

  return (
    <div>
      <PageHeader
        backTo="/studio"
        backLabel="Creator studio"
        eyebrow={course.status === "published" ? "Published course" : "Draft course"}
        title={course.title}
        description="Update the details, build the curriculum, then publish when it is ready."
        action={
          <Badge
            variant={
              course.status === "published"
                ? "success"
                : course.status === "archived"
                  ? "neutral"
                  : "warning"
            }
            size="md"
            dot
          >
            {course.status}
          </Badge>
        }
      />

      <div className="mt-6 flex flex-wrap items-center gap-1 rounded-full border border-line bg-white p-1">
        {TABS.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={tab === item.value}
            onClick={() => setTab(item.value)}
            className={cn(
              "h-9 rounded-full px-4 text-[12.5px] font-medium transition-colors",
              tab === item.value
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-sage hover:text-primary",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === "basics" && (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <Card>
              {categoriesQuery.data?.data?.length ? (
                <BasicsForm
                  key={course._id}
                  initial={course}
                  categories={categoriesQuery.data.data}
                  onSubmit={(payload) => updateMutation.mutate(payload)}
                  submitLabel="Save details"
                  isSaving={updateMutation.isPending}
                />
              ) : (
                <p className="text-[13px] text-text-muted">Loading categories…</p>
              )}
            </Card>

            <Card className="lg:sticky lg:top-[92px]">
              <h2 className="text-[14px] font-semibold tracking-[-0.02em]">Cover image</h2>
              <p className="mt-1 text-[12px] leading-6 text-text-muted">
                This is what learners see in the catalog and at the top of the lesson workspace.
              </p>

              <CourseThumbnail
                imageUrl={course.imageUrl}
                title={course.title}
                categoryName={
                  typeof course.category === "object" ? course.category?.name : undefined
                }
                className="mt-3 aspect-[16/10] w-full"
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleFile}
                className="sr-only"
              />

              <Button
                size="sm"
                variant="secondary"
                className="mt-3 w-full"
                iconLeft={uploadMutation.isPending ? Loader2 : ImagePlus}
                loading={uploadMutation.isPending}
                onClick={() => fileInputRef.current?.click()}
              >
                {course.imageUrl ? "Replace image" : "Upload image"}
              </Button>

              <p className="mt-2 text-[11px] leading-5 text-text-muted">
                JPEG, PNG, WebP or AVIF up to 8 MB.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border-subtle pt-4 text-center">
                {[
                  { label: "Sections", value: course.sectionCount ?? 0 },
                  { label: "Lessons", value: course.lessonCount ?? 0 },
                  { label: "Learners", value: course.enrollmentCount ?? 0 },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-[16px] font-semibold tabular-nums text-text-primary">
                      {stat.value}
                    </p>
                    <p className="text-[10.5px] uppercase tracking-[0.08em] text-text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {tab === "curriculum" && <CurriculumEditor courseId={courseId} />}

        {tab === "publishing" && <PublishingTab course={course} />}
      </div>
    </div>
  );
};

export default CourseEditorPage;
