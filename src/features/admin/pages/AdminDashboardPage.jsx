import { useQuery } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getAdminOverview } from "../api/adminApi";

const statCards = [
  ["Users", "totalUsers"],
  ["Courses", "totalCourses"],
  ["Published courses", "totalPublished"],
  ["Enrollments", "totalEnrollments"],
  ["Communities", "totalCommunities"],
  ["Posts", "totalPosts"],
];

export const AdminDashboardPage = () => {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: getAdminOverview,
  });
  const overview = response?.data;

  return (
    <div className="mx-auto max-w-7xl">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Administration
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Platform overview
        </h1>
      </header>

      {isLoading ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="status">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-xl bg-surface-hover"
            />
          ))}
          <span className="sr-only">Loading platform overview...</span>
        </div>
      ) : isError || !overview ? (
        <Card className="mt-7">
          <p className="text-sm text-error" role="alert">
            Platform statistics could not be loaded.
          </p>
          <Button
            className="mt-4"
            variant="secondary"
            size="sm"
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </Card>
      ) : (
        <>
          <section
            className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Platform statistics"
          >
            {statCards.map(([label, key]) => (
              <Card key={key}>
                <p className="text-sm text-text-muted">{label}</p>
                <p className="mt-2 text-2xl font-semibold">
                  {(overview.stats?.[key] ?? 0).toLocaleString()}
                </p>
              </Card>
            ))}
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section>
              <h2 className="text-xl font-semibold">Latest reports</h2>
              {overview.latestReports?.length ? (
                <div className="mt-3 space-y-3">
                  {overview.latestReports.map((report) => (
                    <Card key={report._id}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium capitalize">{report.type}</p>
                          <p className="mt-1 text-sm text-text-muted">
                            {report.reporter?.fullname || "Member"} ·{" "}
                            {report.targetType}
                          </p>
                        </div>
                        <span className="rounded-full bg-surface-hover px-2.5 py-1 text-xs capitalize text-text-secondary">
                          {report.status}
                        </span>
                      </div>
                      {report.description && (
                        <p className="mt-3 line-clamp-2 text-sm text-text-secondary">
                          {report.description}
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="mt-3">
                  <p className="text-sm text-text-muted">
                    There are no reports to review.
                  </p>
                </Card>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold">Most enrolled courses</h2>
              {overview.topCourses?.length ? (
                <Card className="mt-3 divide-y divide-border">
                  {overview.topCourses.map((course, index) => (
                    <div
                      key={`${course.title}-${index}`}
                      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <p className="font-medium">{course.title}</p>
                      <p className="shrink-0 text-sm text-text-muted">
                        {course.count.toLocaleString()} enrollments
                      </p>
                    </div>
                  ))}
                </Card>
              ) : (
                <Card className="mt-3">
                  <p className="text-sm text-text-muted">
                    Course enrollment data is not available yet.
                  </p>
                </Card>
              )}
            </section>
          </div>
        </>
      )}
    </div>
  );
};
