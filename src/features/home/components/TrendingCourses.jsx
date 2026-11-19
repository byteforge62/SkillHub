import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock3,
  Compass,
  LineChart,
  RefreshCw,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Section, { SectionHeading } from "@/components/ui/Section";
import Skeleton from "@/components/ui/Skeleton";
import { fadeUp, stagger } from "@/lib/motion";

const RowSkeleton = () => (
  <div className="flex items-center gap-4 rounded-3xl border border-[color:var(--color-line)] bg-white p-4">
    <Skeleton className="h-16 w-24 shrink-0 rounded-2xl" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  </div>
);

export const TrendingCourses = ({
  courses = [],
  isLoading,
  isError,
  refetch,
}) => (
  <Section tone="transparent" className="py-20 lg:py-24">
    <div className="container-wide">
      <SectionHeading
        title="Courses people are working through"
        description="The newest additions to the catalog, with the detail that matters: level, length and what it costs."
        action={
          <Button
            as={Link}
            to="/courses"
            variant="secondary"
            iconRight={ArrowRight}
          >
            Full catalog
          </Button>
        }
      />

      <div className="mt-10 space-y-2.5">
        {isLoading &&
          [0, 1, 2].map((item) => <RowSkeleton key={item} />)}

        {isError && (
          <EmptyState
            tone="error"
            icon={RefreshCw}
            title="The catalog didn't load"
            description="The courses endpoint did not respond. Your enrollment data is untouched."
            action={
              <Button variant="secondary" onClick={() => refetch()}>
                Try again
              </Button>
            }
          />
        )}

        {!isLoading && !isError && courses.length === 0 && (
          <EmptyState
            icon={BookOpen}
            title="No published courses yet"
            description="New courses appear here as soon as they are published."
            action={
              <Button as={Link} to="/courses" variant="secondary">
                Open catalog
              </Button>
            }
          />
        )}

        {!isLoading && !isError && courses.length > 0 && (
          <motion.ul
            variants={stagger(0.02, 0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-2.5"
          >
            {courses.map((course) => {
              const categoryName =
                typeof course.category === "object"
                  ? course.category?.name
                  : course.category;

              return (
                <motion.li key={course._id} variants={fadeUp}>
                  <Link
                    to={`/courses/${course._id}`}
                    className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-3xl border border-[color:var(--color-line)] bg-white p-3.5 shadow-[var(--shadow-xs)] transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-[var(--shadow-card)] sm:gap-5 sm:p-4"
                  >
                    <div className="h-16 w-24 shrink-0 overflow-hidden rounded-2xl bg-sage sm:h-[72px] sm:w-32">
                      {course.imageUrl ? (
                        <img
                          src={course.imageUrl}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <span className="flex h-full items-center justify-center text-primary">
                          <BookOpen size={20} strokeWidth={1.6} aria-hidden="true" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {categoryName && (
                          <span className="text-[11.5px] font-medium text-primary">
                            {categoryName}
                          </span>
                        )}
                        {course.level && (
                          <Badge variant="sage" size="sm">
                            {course.level}
                          </Badge>
                        )}
                      </div>

                      <h3 className="mt-1 truncate text-[15.5px] font-semibold tracking-[-0.02em] text-text-primary sm:text-[16.5px]">
                        {course.title}
                      </h3>

                      <p className="mt-0.5 hidden truncate text-[12.5px] text-text-muted sm:block">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pr-1.5">
                      <div className="hidden text-right sm:block">
                        {course.duration != null && (
                          <p className="inline-flex items-center gap-1 text-[12px] text-text-secondary">
                            <Clock3 size={12} aria-hidden="true" />
                            {course.duration} min
                          </p>
                        )}
                        <p className="mt-0.5 text-[13px] font-semibold text-text-primary">
                          {Number(course.price) > 0 ? `$${course.price}` : "Free"}
                        </p>
                      </div>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-line)] text-text-muted transition-colors group-hover:border-primary/30 group-hover:bg-sage group-hover:text-primary">
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </div>
    </div>
  </Section>
);

const catalogSteps = [
  {
    icon: Compass,
    title: "Browse the catalog",
    description:
      "Filter by level, language and category. Each course lists duration, price and instructor.",
  },
  {
    icon: BookOpen,
    title: "Enroll in one course",
    description:
      "Enrollment opens the workspace: sections, lessons, resources and quizzes in order.",
  },
  {
    icon: LineChart,
    title: "Keep the progress",
    description:
      "Every completed lesson is stored against your account, ready for the next sitting.",
  },
];

export const CatalogInvite = ({ toolCount }) => (
  <Section tone="transparent" className="py-20 lg:py-24">
    <div className="container-wide">
      <div className="grid gap-10 rounded-[36px] border border-[color:var(--color-line)] bg-white p-7 shadow-[var(--shadow-card)] sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:p-12">
        <div>
          <Badge variant="soft">Inside the catalog</Badge>

          <h2 className="mt-5 display-3 max-w-lg text-text-primary">
            Pick one course. Finish the first lesson tonight.
          </h2>

          <p className="mt-4 max-w-md text-[15px] leading-7 text-text-secondary">
            The catalog opens when you create an account. Until then, the tools
            are completely open — {toolCount} of them, running in your browser.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button as={Link} to="/register" iconRight={ArrowRight}>
              Create an account
            </Button>
            <Button as={Link} to="/tools" variant="secondary">
              Try the tools first
            </Button>
          </div>
        </div>

        <ol className="space-y-3">
          {catalogSteps.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-3.5 rounded-3xl bg-sage/60 p-4 sm:p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-primary">
                <step.icon size={16} strokeWidth={1.8} aria-hidden="true" />
              </span>

              <div>
                <p className="text-[10.5px] font-medium text-primary">
                  Step {index + 1}
                </p>
                <h3 className="mt-0.5 text-[14px] font-semibold tracking-[-0.02em] text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-1 text-[12.5px] leading-6 text-text-secondary">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </Section>
);

export default TrendingCourses;
