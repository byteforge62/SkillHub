import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  Layers,
  RefreshCw,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CourseThumbnail from "@/components/ui/CourseThumbnail";
import Logo from "@/components/ui/Logo";
import ProgressBar from "@/components/ui/ProgressBar";
import Skeleton from "@/components/ui/Skeleton";

import { LessonContent } from "../components/LessonContent";
import { usePreferences } from "@/app/providers/PreferencesProvider";

import { getCourseById } from "@/features/courses/api/courseApi";
import { getMyEnrollments } from "@/features/enrollment/api/enrollmentApi";
import useCompleteLesson from "@/features/enrollment/hooks/useCompleteLesson";
import {
  getCourseSections,
  getSectionLessons,
  getLessonById,
} from "../api/learningApi";

export const LearningPage = () => {
  const { courseId } = useParams();

  return <LearningWorkspace key={courseId} courseId={courseId} />;
};

const LearningWorkspace = ({ courseId }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const completeLessonMutation = useCompleteLesson();
  const { settings } = usePreferences();

  const {
    data: courseData,
    isLoading: courseLoading,
    isError: courseError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: Boolean(courseId),
  });

  const {
    data: sectionsData,
    isLoading: sectionsLoading,
    isError: sectionsError,
  } = useQuery({
    queryKey: ["course-sections", courseId],
    queryFn: () => getCourseSections(courseId),
    enabled: Boolean(courseId),
  });

  const {
    data: enrollmentData,
    isLoading: enrollmentLoading,
    isError: enrollmentError,
  } = useQuery({
    queryKey: ["my-enrollments"],
    queryFn: getMyEnrollments,
  });

  const {
    data: lessonsData,
    isLoading: lessonsLoading,
    isError: lessonsError,
    refetch: refetchLessons,
  } = useQuery({
    queryKey: ["section-lessons", selectedSection?._id],
    queryFn: () => getSectionLessons(selectedSection._id),
    enabled: Boolean(selectedSection?._id),
  });

  const {
    data: lessonData,
    isLoading: lessonLoading,
    isError: lessonError,
    refetch: refetchLesson,
  } = useQuery({
    queryKey: ["lesson", selectedLesson?._id],
    queryFn: () => getLessonById(selectedLesson._id),
    enabled: Boolean(selectedLesson?._id),
  });

  const course = courseData?.data;

  const sections = Array.isArray(sectionsData?.data) ? sectionsData.data : [];

  const enrollment = Array.isArray(enrollmentData?.data)
    ? enrollmentData.data.find(
        (item) => item.courseId?._id === courseId || item.courseId === courseId,
      )
    : null;

  const currentLessonId = selectedLesson?._id;
  const isLessonCompleted =
    enrollment?.completedLessons?.some(
      (completedLesson) =>
        String(completedLesson?._id ?? completedLesson) === String(currentLessonId),
    ) ?? false;
  const completionMutationIsCurrent =
    completeLessonMutation.variables?.lessonId === currentLessonId;

  const sectionLessons = Array.isArray(lessonsData?.data) ? lessonsData.data : [];
  const currentLessonIndex = selectedLesson
    ? sectionLessons.findIndex((lesson) => lesson._id === selectedLesson._id)
    : -1;
  const nextLesson = currentLessonIndex >= 0 ? sectionLessons[currentLessonIndex + 1] : null;

  if (courseLoading || enrollmentLoading || sectionsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-[color:var(--color-line)] bg-white/80 px-5 py-5">
          <div className="mx-auto max-w-[1320px]">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-3 h-6 w-72" />
          </div>
        </div>

        <div className="mx-auto grid max-w-[1320px] gap-5 px-5 py-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <Skeleton className="h-[520px] rounded-3xl" />
          <Skeleton className="h-[520px] rounded-3xl" />
        </div>
      </div>
    );
  }

  if (courseError || sectionsError || enrollmentError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
        <Card className="w-full max-w-md text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-error-soft text-error">
            <RefreshCw size={20} strokeWidth={1.9} aria-hidden="true" />
          </span>

          <h1 className="mt-5 text-[20px] font-bold tracking-[-0.03em]">
            Unable to load this workspace
          </h1>

          <p className="mt-2 text-[13px] leading-6 text-text-muted">
            Something went wrong while loading the course.
          </p>

          <Button as={Link} to="/learning" variant="secondary" className="mt-6">
            Back to my learning
          </Button>
        </Card>
      </div>
    );
  }

  if (!course) return null;

  if (!enrollment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
        <Card className="w-full max-w-md text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-primary">
            <BookOpen size={22} strokeWidth={1.8} aria-hidden="true" />
          </span>

          <h1 className="mt-5 text-[20px] font-bold tracking-[-0.03em]">
            Enrolment required
          </h1>

          <p className="mt-2 text-[13px] leading-6 text-text-muted">
            Enrol in this course before you start working through its lessons.
          </p>

          <Button as={Link} to={`/courses/${courseId}`} className="mt-6">
            Go to course
          </Button>
        </Card>
      </div>
    );
  }

  const progress = Math.min(Math.max(enrollment.progress || 0, 0), 100);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-[color:var(--color-line)] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1320px] items-center gap-4 px-4 py-3.5 sm:px-6">
          <Link
            to="/learning"
            aria-label="Back to my learning"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-line)] text-text-secondary transition-colors hover:bg-sage hover:text-primary"
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </Link>

          <Link to="/dashboard" className="hidden sm:block" aria-label="SkillHub workspace">
            <Logo markClassName="h-7 w-7" showWordmark={false} />
          </Link>

          <CourseThumbnail
            imageUrl={course.imageUrl}
            title={course.title}
            className="hidden h-9 w-14 shrink-0 sm:block"
            rounded="rounded-lg"
            iconSize={16}
          />

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-text-muted">
              Lesson workspace
            </p>
            <h1 className="truncate text-[13.5px] font-semibold tracking-[-0.02em] text-text-primary">
              {course.title}
            </h1>
          </div>

          <div className="hidden w-40 shrink-0 sm:block">
            <ProgressBar value={progress} label="Progress" showValue size="sm" />
          </div>

          <Badge variant="sage" size="sm" className="sm:hidden">
            {progress}%
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-[1320px] px-4 py-6 sm:px-6">
        <div
          className={
            selectedLesson
              ? "block"
              : "grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start"
          }
        >
          {!selectedLesson && (
            <Card padded={false} className="overflow-hidden lg:sticky lg:top-[92px]">
              <CourseThumbnail
                imageUrl={course.imageUrl}
                title={course.title}
                categoryName={
                  typeof course.category === "object"
                    ? course.category?.name
                    : course.category
                }
                className="h-24 w-full"
                rounded="rounded-none"
                iconSize={20}
              />

              <div className="border-b border-border-subtle px-5 py-5">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary">
                  Course content
                </p>

                <h2 className="mt-2 line-clamp-2 text-[15px] font-bold tracking-[-0.025em]">
                  {course.title}
                </h2>

                <div className="mt-4">
                  <ProgressBar value={progress} label="Progress" showValue size="sm" />
                </div>
              </div>

              <div className="p-3">
                {!selectedSection ? (
                  sections.length === 0 ? (
                    <p className="rounded-2xl bg-background p-4 text-[12.5px] leading-6 text-text-muted">
                      No sections are available for this course yet.
                    </p>
                  ) : (
                    <ul className="space-y-1.5">
                      {sections.map((section) => (
                        <li key={section._id}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedSection(section);
                              setSelectedLesson(null);
                            }}
                            className="group flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition-colors hover:bg-sage/60"
                          >
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage text-[10.5px] font-semibold text-primary">
                              {section.order}
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[13px] font-semibold text-text-primary">
                                {section.title}
                              </span>

                              {section.description && (
                                <span className="mt-0.5 block line-clamp-2 text-[11.5px] leading-5 text-text-muted">
                                  {section.description}
                                </span>
                              )}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSection(null);
                        setSelectedLesson(null);
                      }}
                      className="mb-3 inline-flex items-center gap-1 px-2 text-[11.5px] font-medium text-text-muted transition-colors hover:text-primary"
                    >
                      <ChevronLeft size={12} aria-hidden="true" />
                      All sections
                    </button>

                    <div className="px-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                        Section {selectedSection.order}
                      </p>
                      <h3 className="mt-1 text-[14px] font-semibold tracking-[-0.02em]">
                        {selectedSection.title}
                      </h3>
                    </div>

                    <div className="mt-3">
                      {lessonsLoading ? (
                        <p className="px-2 py-3 text-[12px] text-text-muted" role="status">
                          Loading lessons...
                        </p>
                      ) : lessonsError ? (
                        <div className="px-2 py-3">
                          <p className="text-[12px] text-error">
                            Unable to load lessons.
                          </p>
                          <button
                            type="button"
                            onClick={() => refetchLessons()}
                            className="mt-2 text-[12px] font-semibold text-primary hover:underline"
                          >
                            Retry
                          </button>
                        </div>
                      ) : (lessonsData?.data || []).length === 0 ? (
                        <p className="px-2 py-3 text-[12px] text-text-muted">
                          No lessons available.
                        </p>
                      ) : (
                        <ul className="space-y-0.5">
                          {(lessonsData?.data || []).map((lesson, index) => (
                            <li key={lesson._id}>
                              <button
                                type="button"
                                onClick={() => {
                                  completeLessonMutation.reset();
                                  setSelectedLesson(lesson);
                                }}
                                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[12.5px] text-text-secondary transition-colors hover:bg-sage/60 hover:text-primary"
                              >
                                <span className="w-4 shrink-0 text-[10.5px] text-text-muted">
                                  {index + 1}
                                </span>
                                <span className="min-w-0 truncate">{lesson.title}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedLesson(null)}
                aria-label="Open course outline"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] bg-white px-3.5 py-2 text-[11.5px] font-medium text-text-secondary transition-colors hover:border-primary/30 hover:text-primary"
              >
                <Layers size={13} aria-hidden="true" />
                {selectedSection ? `Section ${selectedSection.order}` : "Course sections"}
              </button>

              {selectedLesson && (
                <Badge variant="sage" size="sm">
                  Lesson {selectedLesson.order}
                </Badge>
              )}
            </div>

            <Card className="min-h-[560px]">
              {!selectedLesson ? (
                <div className="flex min-h-[520px] items-center justify-center px-6 text-center">
                  <div className="max-w-sm">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sage text-primary">
                      <BookOpen size={24} strokeWidth={1.7} aria-hidden="true" />
                    </span>

                    <h2 className="mt-5 text-[20px] font-bold tracking-[-0.03em]">
                      {selectedSection ? "Choose a lesson" : "Choose a section"}
                    </h2>

                    <p className="mt-2 text-[13px] leading-6 text-text-muted">
                      {selectedSection
                        ? "Pick a lesson from the outline to open it here."
                        : "Start with a section in the course outline to see its lessons."}
                    </p>
                  </div>
                </div>
              ) : lessonLoading ? (
                <div className="flex min-h-[520px] items-center justify-center" role="status">
                  <span className="text-[13px] text-text-muted">Loading lesson...</span>
                </div>
              ) : lessonError ? (
                <div className="flex min-h-[520px] flex-col items-center justify-center gap-3 text-center">
                  <p className="text-[13px] text-error">Unable to load this lesson.</p>
                  <Button variant="secondary" size="sm" onClick={() => refetchLesson()}>
                    Retry
                  </Button>
                </div>
              ) : lessonData?.data ? (
                <div>
                  <div className="flex flex-col gap-3 border-b border-border-subtle pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={16}
                        className={isLessonCompleted ? "mt-0.5 text-success" : "mt-0.5 text-text-muted"}
                        strokeWidth={1.9}
                        aria-hidden="true"
                      />
                      <p className="text-[12.5px] leading-6 text-text-muted">
                        {isLessonCompleted
                          ? "Progress for this lesson is saved."
                          : "Mark this lesson complete when you finish it."}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                    <Button
                      size="sm"
                      variant={isLessonCompleted ? "secondary" : "primary"}
                      loading={
                        completeLessonMutation.isPending && completionMutationIsCurrent
                      }
                      disabled={
                        isLessonCompleted ||
                        (completeLessonMutation.isPending && completionMutationIsCurrent) ||
                        (completeLessonMutation.isSuccess && completionMutationIsCurrent) ||
                        enrollment.status !== "active"
                      }
                      onClick={() =>
                        completeLessonMutation.mutate({
                          enrollmentId: enrollment._id,
                          lessonId: currentLessonId,
                        })
                      }
                    >
                      {isLessonCompleted
                        ? "Lesson completed"
                        : completionMutationIsCurrent && completeLessonMutation.isSuccess
                          ? "Saved"
                          : completionMutationIsCurrent && completeLessonMutation.isError
                            ? "Retry saving progress"
                            : "Mark lesson complete"}
                    </Button>

                    {nextLesson && settings.autoplayNextLesson !== false && (
                      <Button
                        size="sm"
                        variant="ghost"
                        iconRight={ArrowRight}
                        onClick={() => {
                          completeLessonMutation.reset();
                          setSelectedLesson(nextLesson);
                        }}
                      >
                        Next
                      </Button>
                    )}
                    </div>
                  </div>

                  {completionMutationIsCurrent && completeLessonMutation.isError && (
                    <p className="mt-4 text-[12.5px] text-error" role="alert">
                      Unable to save lesson progress. Please try again.
                    </p>
                  )}

                  {completionMutationIsCurrent && completeLessonMutation.isSuccess && (
                    <p className="mt-4 text-[12.5px] text-success" role="status">
                      Lesson progress saved.
                    </p>
                  )}

                  <div className="mt-6">
                    <LessonContent key={selectedLesson._id} lesson={lessonData?.data} />
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[520px] items-center justify-center px-6 text-center text-[13px] text-text-muted">
                  This lesson is no longer available.
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningPage;
