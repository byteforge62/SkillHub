import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Search } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import { SkeletonGrid } from "@/components/ui/Skeleton";

import { CourseGrid } from "../components/CourseGrid";
import useCourses from "../hooks/useCourses";

const ARTICULATED_LEVELS = ["All levels", "Beginner", "Intermediate", "Advanced"];

export const CoursesPage = () => {
  const { data, isLoading, isError, error, refetch } = useCourses({ page: 1, limit: 60 });

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All levels");

  const courses = data?.data?.courses ?? [];

  const levels = useMemo(() => {
    const available = new Set(
      courses.map((course) => course.level).filter(Boolean),
    );
    const known = ARTICULATED_LEVELS.filter(
      (item) => item === "All levels" || available.has(item),
    );
    const extra = [...available].filter((item) => !ARTICULATED_LEVELS.includes(item));

    return [...known, ...extra];
  }, [courses]);

  const visibleCourses = useMemo(() => {
    const term = search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesLevel = level === "All levels" || course.level === level;
      const matchesSearch =
        !term ||
        [course.title, course.description].some((value) =>
          String(value || "").toLowerCase().includes(term),
        );

      return matchesLevel && matchesSearch;
    });
  }, [courses, level, search]);

  const isFiltered = level !== "All levels" || search.trim().length > 0;

  return (
    <div>
      <PageHeader
        title="Course catalog"
        description="Structured courses with sections, lessons, quizzes and resources — built to be finished, not skimmed."
        action={
          <Badge variant="outline" size="lg">
            {courses.length} {courses.length === 1 ? "course" : "courses"}
          </Badge>
        }
      />

      <div className="mt-7 flex flex-col gap-3 rounded-3xl border border-[color:var(--color-line)] bg-white p-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="relative flex-1">
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
            placeholder="Search by title or topic"
            maxLength={100}
            className="h-10 w-full rounded-full bg-transparent pl-10 pr-3 text-[13.5px] text-text-primary placeholder:text-text-muted focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1 rounded-full bg-background p-1">
          {levels.map((item) => {
            const isActive = level === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setLevel(item)}
                aria-pressed={isActive}
                className={[
                  "relative h-8 whitespace-nowrap rounded-full px-3.5 text-[12px] font-medium transition-colors",
                  isActive ? "text-white" : "text-text-secondary hover:text-primary",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="course-level-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        {isLoading && <SkeletonGrid count={6} />}

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
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-[12px] text-text-muted">
                Showing{" "}
                <span className="font-semibold text-text-secondary">
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
                  className="text-[12px] font-semibold text-primary hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            <CourseGrid courses={visibleCourses} filtered={isFiltered} />
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
