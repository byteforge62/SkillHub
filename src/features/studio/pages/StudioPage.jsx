import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpRight,
  BookOpen,
  Layers,
  PenLine,
  Plus,
  RefreshCw,
  Rocket,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CourseThumbnail from "@/components/ui/CourseThumbnail";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Skeleton from "@/components/ui/Skeleton";

import * as studioApi from "../api/studioApi";

const statusStyles = {
  published: { variant: "success", label: "Published" },
  draft: { variant: "warning", label: "Draft" },
  archived: { variant: "neutral", label: "Archived" },
};

const updatedLabel = (value) => {
  if (!value) return "Not saved yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not saved yet";

  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (days <= 0) return "Updated today";
  if (days === 1) return "Updated yesterday";
  if (days < 30) return `Updated ${days} days ago`;
  return `Updated ${date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
};

const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage text-primary">
      <Icon size={14} strokeWidth={1.9} aria-hidden="true" />
    </span>
    <div className="min-w-0">
      <p className="text-[10.5px] font-medium uppercase tracking-[0.1em] text-text-muted">
        {label}
      </p>
      <p className="text-[16px] font-semibold leading-tight tabular-nums text-text-primary">
        {value}
      </p>
    </div>
  </div>
);

export const StudioPage = () => {
  const queryClient = useQueryClient();

  const coursesQuery = useQuery({
    queryKey: ["studio-courses"],
    queryFn: studioApi.getMyCourses,
  });

  const courses = coursesQuery.data?.data ?? [];

  const publishMutation = useMutation({
    mutationFn: studioApi.publishCourse,
    onSuccess: () => {
      toast.success("Course published to the catalog");
      queryClient.invalidateQueries({ queryKey: ["studio-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "The course could not be published.");
    },
  });

  const publishedCount = courses.filter((course) => course.status === "published").length;
  const draftCount = courses.filter((course) => course.status === "draft").length;
  const learners = courses.reduce((total, course) => total + (course.enrollmentCount || 0), 0);
  const lessons = courses.reduce((total, course) => total + (course.lessonCount || 0), 0);

  return (
    <div>
      <PageHeader
        eyebrow="Workspace"
        title="Creator studio"
        description="Write what you know, shape it into sections and lessons, then publish it to the catalog."
        action={
          <Button as={Link} to="/studio/new" size="sm" iconLeft={Plus}>
            New course
          </Button>
        }
      />

      {coursesQuery.isLoading && (
        <div className="mt-7 space-y-2" role="status">
          <Skeleton className="h-[76px] rounded-[16px]" />
          {[0, 1, 2].map((item) => (
            <Skeleton key={item} className="h-[92px] rounded-[16px]" />
          ))}
          <span className="sr-only">Loading your courses...</span>
        </div>
      )}

      {coursesQuery.isError && (
        <div className="mt-7">
          <EmptyState
            tone="error"
            icon={RefreshCw}
            title="Your studio couldn't be loaded"
            description="We could not reach your courses. Try again in a moment."
            action={
              <Button variant="secondary" onClick={() => coursesQuery.refetch()}>
                Try again
              </Button>
            }
          />
        </div>
      )}

      {!coursesQuery.isLoading && !coursesQuery.isError && (
        <>
          <div className="mt-7 flex flex-wrap divide-x divide-line rounded-[16px] border border-line bg-white">
            <Stat icon={BookOpen} label="Courses" value={courses.length} />
            <Stat icon={Rocket} label="Published" value={publishedCount} />
            <Stat icon={PenLine} label="Drafts" value={draftCount} />
            <Stat icon={Layers} label="Lessons" value={lessons} />
            <Stat icon={Users} label="Learners" value={learners} />
          </div>

          {courses.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                icon={PenLine}
                title="Nothing published from your desk yet"
                description="Create a course, add a section and a lesson, and it becomes a track other people can enrol in."
                action={
                  <Button as={Link} to="/studio/new" iconLeft={Plus}>
                    Start a course
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-[16px] border border-line bg-white">
              <div className="divide-y divide-line">
                {courses.map((course) => {
                  const status = statusStyles[course.status] || statusStyles.draft;
                  const categoryName =
                    typeof course.category === "object"
                      ? course.category?.name
                      : course.category;

                  return (
                    <div
                      key={course._id}
                      className="course-row group flex flex-col gap-4 px-4 py-4 transition-colors hover:bg-sage/40 sm:flex-row sm:items-center sm:px-5"
                    >
                      <CourseThumbnail
                        imageUrl={course.imageUrl}
                        title={course.title}
                        categoryName={categoryName}
                        className="h-16 w-full shrink-0 sm:h-[64px] sm:w-[104px]"
                        rounded="rounded-xl"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="truncate text-[14px] font-semibold tracking-[-0.01em] text-text-primary">
                            {course.title}
                          </h2>
                          <Badge variant={status.variant} size="sm">
                            {status.label}
                          </Badge>
                        </div>

                        <p className="mt-1 truncate text-[11.5px] text-text-muted">
                          {[
                            categoryName,
                            `${course.sectionCount ?? 0} sections`,
                            `${course.lessonCount ?? 0} lessons`,
                            `${course.enrollmentCount ?? 0} learners`,
                            updatedLabel(course.updatedAt),
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-2">
                        {course.status === "draft" && (
                          <Button
                            size="sm"
                            variant="secondary"
                            loading={
                              publishMutation.isPending &&
                              publishMutation.variables === course._id
                            }
                            onClick={() => publishMutation.mutate(course._id)}
                          >
                            Publish
                          </Button>
                        )}

                        {course.status === "published" && (
                          <Button
                            as={Link}
                            to={`/courses/${course._id}`}
                            size="sm"
                            variant="ghost"
                            iconRight={ArrowUpRight}
                          >
                            View
                          </Button>
                        )}

                        <Button as={Link} to={`/studio/${course._id}`} size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudioPage;
