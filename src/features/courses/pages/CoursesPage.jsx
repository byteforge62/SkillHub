import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, RefreshCw, Search } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Skeleton from "@/components/ui/Skeleton";

import useCourses from "../hooks/useCourses";

const LEVELS = ["All levels", "Beginner", "Intermediate", "Advanced"];

export const CoursesPage = () => {
  const { data, isLoading, isError, error, refetch } = useCourses({
    page: 1,
    limit: 50,
  });

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All levels");

  const courses = data?.data?.courses ?? [];

  const levels = useMemo(() => {
    const available = new Set(courses.map((course) => course.level).filter(Boolean));
    const known = LEVELS.filter(
      (item) => item === "All levels" || available.has(item),
    );
    const extra = [...available].filter((item) => !LEVELS.includes(item));

    return [...known, ...extra];
  }, [courses]);

  const visibleCourses = useMemo(() => {
    const term = search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesLevel = level === "All levels" || course.level === level;
      const matchesSearch =
        !term ||
        [course.title, course.description, course.createdBy?.fullname].some(
          (value) => String(value || "").toLowerCase().includes(term),
        );

      return matchesLevel && matchesSearch;
    });
  }, [courses, level, search]);

  const isFiltered = level !== "All levels" || search.trim().length > 0;

  return (
    <div>
      <PageHeader
        eyebrow="Catalog"
        title="Course tracks"
        description="Structured tracks with sections, lessons, quizzes and saved progress — built to be finished, not skimmed."
        action={
          <Badge variant="outline" size="md">
            {courses.length} {courses.length === 1 ? "track" : "tracks"}
          </Badge>
        }
      />

      <div className="mt-6 flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={15}
            strokeWidth={1.9}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <label className="sr-only" htmlFor="course-search">
            Search courses
          </label>
          <input
            id="course-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, topic or instructor"
            maxLength={100}
            className="h-11 w-full rounded-full border border-line bg-white pl-10 pr-4 text-[13.5px] text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
          />
        </div>

        <div className="flex flex-wrap gap-1 rounded-full bg-white p-1 ring-1 ring-line">
          {levels.map((item) => {
            const isActive = level === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setLevel(item)}
                aria-pressed={isActive}
                className={[
                  "h-8 whitespace-nowrap rounded-full px-3.5 text-[12.5px] font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:bg-sage hover:text-primary",
                ].join(" ")}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        {isLoading && (
          <div className="space-y-2" role="status">
            {[0, 1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-20 rounded-[16px]" />
            ))}
            <span className="sr-only">Loading courses...</span>
          </div>
        )}

        {isError && (
          <EmptyState
            tone="error"
            icon={RefreshCw}
            title="Courses couldn't be loaded"
            description={
              error?.response?.data?.message ||
              error?.message ||
              "Something went wrong while loading the catalog."
            }
            action={
              <Button variant="secondary" onClick={() => refetch()}>
                Try again
              </Button>
            }
          />
        )}

        {!isLoading && !isError && (
          <>
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-[11.5px] text-text-muted">
                Showing{" "}
                <span className="font-medium text-text-secondary">
                  {visibleCourses.length}
                </span>{" "}
                of {courses.length}
              </p>

              {isFiltered && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setLevel("All levels");
                  }}
                  className="text-[12px] font-medium text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {visibleCourses.length === 0 ? (
              <EmptyState
                icon={Search}
                title={isFiltered ? "No tracks match those filters" : "No tracks published yet"}
                description={
                  isFiltered
                    ? "Try a different level or a shorter search term."
                    : "New tracks appear here as soon as they are published."
                }
                action={
                  isFiltered ? (
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSearch("");
                        setLevel("All levels");
                      }}
                    >
                      Reset filters
                    </Button>
                  ) : (
                    <Button as={Link} to="/events" variant="secondary">
                      Browse events instead
                    </Button>
                  )
                }
              />
            ) : (
              <div className="overflow-hidden rounded-[16px] border border-line bg-white">
                <div className="divide-y divide-line">
                  {visibleCourses.map((course) => (
                    <Link
                      key={course._id}
                      to={`/courses/${course._id}`}
                      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-sage/60"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="truncate text-[14px] font-semibold tracking-[-0.01em] text-text-primary">
                            {course.title}
                          </h2>
                          {course.level && (
                            <Badge variant="sage" size="sm">
                              {course.level}
                            </Badge>
                          )}
                        </div>

                        <p className="mt-1 line-clamp-1 text-[12.5px] text-text-secondary">
                          {course.description}
                        </p>

                        <p className="mt-1 truncate text-[11.5px] text-text-muted">
                          {[
                            course.createdBy?.fullname,
                            course.category?.name,
                            course.duration ? `${course.duration} min` : null,
                            course.lessonCount ? `${course.lessonCount} lessons` : null,
                          ]
                            .filter(Boolean)
                            .join(" · ") || "Self-paced"}
                        </p>
                      </div>

                      <div className="hidden shrink-0 items-center gap-6 text-right sm:flex">
                        <span className="text-[11.5px] text-text-muted">
                          {course.sectionCount ?? 0} sections
                        </span>
                        <span className="inline-flex items-center gap-1 text-[12px] font-medium text-primary">
                          View
                          <ArrowUpRight
                            size={12}
                            className="transition-transform group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
