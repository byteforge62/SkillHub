import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Skeleton from "@/components/ui/Skeleton";
import { Textarea } from "@/components/ui/Input";

import {
  getLessonNote,
  saveLessonNote,
} from "@/features/enrollment/api/enrollmentApi";
import { usePreferences } from "@/app/providers/PreferencesProvider";

const MAX_LENGTH = 5000;

/**
 * Private note attached to one lesson of one enrollment. Reads on open and
 * saves through the enrollment note endpoints — no local-only state.
 */
export const NotesDialog = ({
  open,
  onClose,
  enrollmentId,
  lesson,
  courseTitle,
}) => {
  const lessonId = lesson?._id;
  const queryClient = useQueryClient();
  const { settings } = usePreferences();
  const [content, setContent] = useState("");
  const lastSavedRef = useRef("");
  const autosaveEnabled = settings.notesAutosave !== false;

  const noteQuery = useQuery({
    queryKey: ["lesson-note", enrollmentId, lessonId],
    queryFn: () => getLessonNote(enrollmentId, lessonId),
    enabled: Boolean(open && enrollmentId && lessonId),
  });

  useEffect(() => {
    if (!open) return;
    const saved = noteQuery.data?.data?.content ?? "";
    setContent(saved);
    lastSavedRef.current = saved;
  }, [open, noteQuery.data]);

  const saveMutation = useMutation({
    mutationFn: () => saveLessonNote(enrollmentId, lessonId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lesson-note", enrollmentId, lessonId],
      });
    },
  });

  // Autosave follows the account preference; the explicit Save button always
  // remains available so the user is never trapped by a disabled setting.
  useEffect(() => {
    if (!open || !autosaveEnabled || !lessonId || noteQuery.isLoading) return;
    if (content === lastSavedRef.current) return;

    const timer = setTimeout(() => {
      lastSavedRef.current = content;
      saveMutation.mutate();
    }, 1400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, open, autosaveEnabled, lessonId, noteQuery.isLoading]);

  const close = () => {
    saveMutation.reset();
    onClose?.();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Lesson notes"
      description={
        lesson?.title
          ? `${courseTitle ? `${courseTitle} · ` : ""}${lesson.title}`
          : "Notes stay private to your account."
      }
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={close}>
            Cancel
          </Button>
          <Button
            size="sm"
            loading={saveMutation.isPending}
            disabled={!lessonId || noteQuery.isLoading}
            onClick={() => saveMutation.mutate()}
          >
            Save note
          </Button>
        </>
      }
    >
      {noteQuery.isLoading ? (
        <Skeleton className="h-40 rounded-[16px]" />
      ) : (
        <div>
          <Textarea
            label="Your note"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={8}
            maxLength={MAX_LENGTH}
            placeholder="What clicked, what you want to revisit, the question you still have…"
            aria-label="Lesson note"
          />

          <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-text-muted">
            <span>
              {saveMutation.isError
                ? saveMutation.error?.response?.data?.message ||
                  "The note could not be saved."
                : saveMutation.isPending
                  ? "Saving…"
                  : autosaveEnabled
                    ? "Saved automatically to this lesson."
                    : "Saved to this lesson only."}
            </span>
            <span className="tabular-nums">
              {content.length}/{MAX_LENGTH}
            </span>
          </div>

          {saveMutation.isSuccess && (
            <p className="mt-2 text-[11.5px] text-success" role="status">
              Note saved.
            </p>
          )}
        </div>
      )}
    </Modal>
  );
};

export default NotesDialog;
