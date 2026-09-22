import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { LessonContent } from "../components/LessonContent";

import { getCourseById } from "@/features/courses/api/courseApi";
import { getMyEnrollments } from "@/features/enrollment/api/enrollmentApi";
import { getCourseSections, getSectionLessons, getLessonById, getResourceById } from "../api/learningApi";

export const LearningPage = () => {
  const { courseId } = useParams();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

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
    isError: lessonsError
  } = useQuery({
    queryKey: ["section-lessons", selectedSection?._id],
    queryFn: () => getSectionLessons(selectedSection._id),
    enabled: Boolean(selectedSection?._id)
  })

  const {
    data: lessonData,
    isLoading: lessonLoading,
    isError: lessonError,
  } = useQuery({
    queryKey: ["lesson", selectedLesson?._id],
    queryFn: () => getLessonById(selectedLesson._id),
    enabled: Boolean(selectedLesson?._id),
  });

  const resourceBlock = useMemo(() => {
    return (
      lessonData?.data?.blocks?.find(
        (block) => block.type === "resource"
      ) || null
    );
  }, [lessonData]);

  const {
    data: resourceData,
    isLoading: resourceLoading,
    isError: resourceError,
  } = useQuery({
    queryKey: [
      "resource",
      resourceBlock?.data?.resourceId,
    ],
    queryFn: () =>
      getResourceById(resourceBlock.data.resourceId),
    enabled: Boolean(resourceBlock?.data?.resourceId),
  });

  const course = courseData?.data;

  const sections = Array.isArray(sectionsData?.data)
    ? sectionsData.data
    : [];

  const enrollments = Array.isArray(enrollmentData?.data)
    ? enrollmentData.data
    : [];

  const enrollment = useMemo(() => {
    return enrollments.find(
      (item) =>
        item.courseId?._id === courseId ||
        item.courseId === courseId
    );
  }, [enrollments, courseId]);




  useEffect(() => {
    setSelectedLesson(null);
  }, [enrollment]);

  if (courseLoading || enrollmentLoading || sectionsLoading) {
    return (
      <div className="min-h-screen bg-background px-5 py-10 text-text-primary">
        <div className="mx-auto max-w-7xl">
          <div className="h-6 w-32 animate-pulse rounded-md bg-surface-hover" />

          <div className="mt-6 grid gap-6 lg:grid-cols-[300px_1fr]">
            <div className="h-[650px] animate-pulse rounded-2xl bg-surface shadow-card" />
            <div className="h-[650px] animate-pulse rounded-2xl bg-surface shadow-card" />
          </div>
        </div>
      </div>
    );
  }

  if (courseError || sectionsError || enrollmentError) {
    return (
      <div className="min-h-screen bg-background px-5 py-10 text-text-primary">
        <div className="mx-auto max-w-3xl">
          <Card>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-error/10 text-error">
                !
              </div>

              <h1 className="mt-5 text-2xl">
                Unable to load learning workspace
              </h1>

              <p className="mt-3 text-sm text-text-muted">
                Something went wrong while loading this course.
              </p>

              <Link to="/courses" className="mt-6 inline-flex">
                <Button variant="secondary">
                  ← Back to Courses
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-background px-5 py-10 text-text-primary">
        <div className="mx-auto max-w-3xl">
          <Card>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light text-2xl">
                📚
              </div>

              <h1 className="mt-5 text-2xl">
                Enrollment Required
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-muted">
                You need to enroll in this course before you can
                start learning.
              </p>

              <Link
                to={`/courses/${courseId}`}
                className="mt-6 inline-flex"
              >
                <Button>
                  Go to Course
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const progress = enrollment.progress || 0;

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 sm:px-8">
          <div className="min-w-0">
            <Link
              to="/courses"
              className="text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              ← Courses
            </Link>

            <h1 className="mt-2 truncate text-xl sm:text-2xl">
              {course.title}
            </h1>
          </div>

          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
              Course Progress
            </p>

            <p className="mt-1 text-lg font-semibold text-primary">
              {progress}%
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-surface-hover">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{
              width: `${Math.min(Math.max(progress, 0), 100)}%`,
            }}
          />
        </div>
      </header>

      {/* Workspace */}
      <main
        className={[
          "mx-auto max-w-7xl px-5 py-6 sm:px-8 transition-all duration-300 ease-in-out",
          selectedLesson
            ? "block"
            : "grid gap-6 lg:grid-cols-[300px_1fr]",
        ].join(" ")}
      >
        {/* Sidebar */}
        {!selectedLesson && (
          <Card
            className={[
              "!p-0 overflow-hidden",
              "transition-all duration-300 ease-in-out",
            ].join(" ")}
          >
            <div className="border-b border-border px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Course Content
              </p>

              <h2 className="mt-2 text-lg">
                {course.title}
              </h2>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">
                    Progress
                  </span>

                  <span className="font-medium text-text-secondary">
                    {progress}%
                  </span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-hover">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{
                      width: `${Math.min(Math.max(progress, 0), 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="p-4">
              {/* --------------------------------------------- */}
              {/* SECTION LIST                                 */}
              {/* --------------------------------------------- */}

              {!selectedSection ? (
                sections.length === 0 ? (
                  <div className="rounded-xl border border-border bg-surface-hover/50 p-5 text-center">
                    <p className="text-sm text-text-muted">
                      No sections are available for this course yet.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sections.map((section) => (
                      <button
                        key={section._id}
                        type="button"
                        onClick={() => {
                          setSelectedSection(section);
                          setSelectedLesson(null);
                        }}
                        className="w-full rounded-xl border border-border bg-surface p-4 text-left transition-all duration-200 hover:border-primary/50 hover:bg-surface-hover"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                              Section {section.order}
                            </p>

                            <h3 className="mt-1 text-sm font-semibold text-text-primary">
                              {section.title}
                            </h3>

                            {section.description && (
                              <p className="mt-1 text-xs leading-5 text-text-muted">
                                {section.description}
                              </p>
                            )}
                          </div>

                          <span className="shrink-0 text-xs text-text-muted">
                            {section.order}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )
              ) : (
                /* --------------------------------------------- */
                /* LESSON LIST                                  */
                /* --------------------------------------------- */

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSection(null);
                      setSelectedLesson(null);
                    }}
                    className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
                  >
                    ← All Sections
                  </button>

                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Section {selectedSection.order}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-text-primary">
                      {selectedSection.title}
                    </h3>
                  </div>

                  {lessonsLoading ? (
                    <p className="px-2 py-3 text-xs text-text-muted">
                      Loading lessons...
                    </p>
                  ) : lessonsError ? (
                    <p className="px-2 py-3 text-xs text-error">
                      Unable to load lessons.
                    </p>
                  ) : (lessonsData?.data || []).length === 0 ? (
                    <p className="px-2 py-3 text-xs text-text-muted">
                      No lessons available.
                    </p>
                  ) : (
                    <div className="space-y-1">
                      {(lessonsData?.data || []).map((lesson, index) => (
                        <button
                          key={lesson._id}
                          type="button"
                          onClick={() => setSelectedLesson(lesson)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-text-secondary transition-all duration-200 hover:bg-surface-hover hover:text-text-primary"
                        >
                          <span className="shrink-0 text-xs text-text-muted">
                            {index + 1}
                          </span>

                          <span className="min-w-0 truncate">
                            {lesson.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        )}

        {/* --------------------------------------------- */}
        {/* LESSON WORKSPACE                             */}
        {/* --------------------------------------------- */}

        <div
          className={[
            selectedLesson
              ? "w-full"
              : "",
            "transition-all duration-300 ease-in-out",
          ].join(" ")}
        >
          {/* Learning Navigation */}
          <div className="mb-6 flex items-center gap-3">
            {/* Section */}
            <button
              type="button"
              onClick={() => {
                setSelectedLesson(null);
              }}
              className={[
                "group flex min-w-[110px] flex-col items-center justify-center",
                "rounded-xl border px-5 py-3",
                "transition-all duration-200 ease-out",
                "hover:-translate-y-0.5 hover:shadow-sm",
                selectedSection
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-surface",
              ].join(" ")}
            >
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                Section
              </span>

              <span className="mt-0.5 text-lg font-semibold text-text-primary">
                {selectedSection ? selectedSection.order : "1"}
              </span>
            </button>

            {/* Lesson */}
            {selectedSection && (
              <>
                <span
                  className="text-lg text-text-muted transition-opacity duration-200"
                >
                  ›
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedLesson(null);
                  }}
                  className={[
                    "flex min-w-[110px] flex-col items-center justify-center",
                    "rounded-xl border px-5 py-3",
                    "animate-in fade-in slide-in-from-left-2",
                    "transition-all duration-200 ease-out",
                    "hover:-translate-y-0.5 hover:shadow-sm",
                    selectedLesson
                      ? "border-primary/30 bg-primary/5"
                      : "border-border bg-surface",
                  ].join(" ")}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                    Lesson
                  </span>

                  <span className="mt-0.5 text-lg font-semibold text-text-primary">
                    {selectedLesson ? selectedLesson.order : "1"}
                  </span>
                </button>
              </>
            )}
          </div>

          <Card className="min-h-[650px]">
            {!selectedLesson ? (
              <div className="flex min-h-[600px] items-center justify-center p-8 text-center">
                <div className="max-w-md">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-light text-3xl">
                    📚
                  </div>

                  <h2 className="mt-6 text-2xl">
                    {selectedSection
                      ? "Select a Lesson"
                      : "Select a Section"}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-text-muted">
                    {selectedSection
                      ? "Choose a lesson from the sidebar to begin learning."
                      : "Choose a section from the course content to begin learning."}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="pt-2">
                  <LessonContent
                    lesson={lessonData?.data}
                    resourceData={resourceData}
                    resourceLoading={resourceLoading}
                    resourceError={resourceError}
                  />
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};
