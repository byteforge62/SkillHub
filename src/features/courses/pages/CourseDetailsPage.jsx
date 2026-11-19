import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Languages,
  Layers,
  RefreshCw,
  Sparkles,
  UserRound,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Skeleton from "@/components/ui/Skeleton";

import { getCourseById } from "../api/courseApi";

import useMyEnrollments from "@/features/enrollment/hooks/useEnrollment";
import useEnrollInCourse from "@/features/enrollment/hooks/useErollInCourse";

const metaItems = (course) =>
  [
    course.level && { icon: Layers, label: course.level },
    course.language && { icon: Languages, label: course.language },
    course.duration !== undefined &&
      course.duration !== null && { icon: Clock3, label: `${course.duration} min` },
  ].filter(Boolean);

export const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const enrollmentQuery = useMyEnrollments();
  const enrollMutation = useEnrollInCourse();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: Boolean(courseId),
  });

  const enrollments = enrollmentQuery.data?.data || [];
  const enrollment = enrollments.find(
    (item) => item.courseId?._id === courseId || item.courseId === courseId,
  );

  const isEnrolled = enrollment?.status === "active";
  const isCompleted = enrollment?.status === "completed";
  const course = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-6" role="status">
        <Skeleton className="h-4 w-40" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-12 w-4/5" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-8 w-64 rounded-full" />
          </div>
          <Skeleton className="h-[380px] rounded-3xl" />
        </div>
        <span className="sr-only">Loading course...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        tone="error"
        icon={RefreshCw}
        title="This course couldn't be loaded"
        description={
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while loading this course."
        }
        action={
          <div className="flex flex-wrap justify-center gap-2.5">
            <Button variant="secondary" onClick={() => refetch()}>
              Try again
            </Button>
            <Button as={Link} to="/courses" variant="ghost">
              Back to catalog
            </Button>
          </div>
        }
      />
    );
  }

  if (!course) return null;

  const categoryName =
    typeof course.category === "object" ? course.category?.name : course.category;

  return (
    <div>
      <PageHeader
        backTo="/courses"
        backLabel="Course catalog"
        title={course.title}
        description={course.description}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {categoryName && (
              <Badge variant="sage" size="sm">
                {categoryName}
              </Badge>
            )}

            {metaItems(course).map((item) => {
              const Icon = item.icon;

              return (
                <Badge key={item.label} variant="outline" size="sm" icon={Icon}>
                  {item.label}
                </Badge>
              );
            })}
          </div>

          {Array.isArray(course.tags) && course.tags.length > 0 && (
            <Card>
              <h2 className="text-[15px] font-semibold tracking-[-0.02em]">
                What you'll cover
              </h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {course.tags.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-start gap-2 text-[13.5px] leading-6 text-text-secondary"
                  >
                    <CheckCircle2
                      size={15}
                      strokeWidth={1.9}
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {tag}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {course.overview && (
            <Card>
              <h2 className="text-[15px] font-semibold tracking-[-0.02em]">Course overview</h2>
              <p className="mt-3 whitespace-pre-line text-[14px] leading-7 text-text-secondary">
                {course.overview}
              </p>
            </Card>
          )}

          {course.createdBy && (
            <Card>
              <h2 className="text-[15px] font-semibold tracking-[-0.02em]">Instructor</h2>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage text-primary">
                  <UserRound size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-text-primary">
                    {course.createdBy.fullname}
                  </p>
                  {course.createdBy.email && (
                    <p className="truncate text-[12.5px] text-text-muted">
                      {course.createdBy.email}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>

        <Card className="lg:sticky lg:top-[92px]">
          <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-sage">
            {course.imageUrl ? (
              <img
                src={course.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-primary/50">
                <BookOpen size={36} strokeWidth={1.4} aria-hidden="true" />
              </span>
            )}
          </div>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[11.5px] font-medium text-text-muted">Course price</p>
              <p className="mt-1 text-[26px] font-bold leading-none tracking-[-0.04em] text-text-primary">
                ${course.price ?? 0}
              </p>
            </div>

            {course.duration !== undefined && course.duration !== null && (
              <Badge variant="outline" size="sm" icon={Clock3}>
                {course.duration} min
              </Badge>
            )}
          </div>

          <div className="mt-5">
            {enrollmentQuery.isLoading ? (
              <Button fullWidth disabled>
                Checking enrollment...
              </Button>
            ) : isEnrolled || isCompleted ? (
              <Button
                as={Link}
                to={`/learning/${courseId}`}
                fullWidth
                variant={isCompleted ? "secondary" : "primary"}
                iconRight={Sparkles}
              >
                {isCompleted ? "Review course" : "Continue learning"}
              </Button>
            ) : (
              <Button
                fullWidth
                loading={enrollMutation.isPending}
                onClick={() => enrollMutation.mutate(courseId)}
              >
                Enrol and start learning
              </Button>
            )}
          </div>

          {enrollMutation.isError && (
            <p className="mt-3 text-[12.5px] text-error" role="alert">
              {enrollMutation.error?.response?.data?.message ||
                "Enrolment failed. Please try again."}
            </p>
          )}

          <p className="mt-3 text-center text-[11.5px] leading-5 text-text-muted">
            Includes sections, lessons, quizzes and saved progress.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
