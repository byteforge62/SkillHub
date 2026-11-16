import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getAdminReports, updateAdminReportStatus } from "../api/adminApi";

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleString();
};

export const AdminReportsPage = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const reportsQuery = useQuery({
    queryKey: ["admin-reports", statusFilter, page],
    queryFn: () =>
      getAdminReports({
        ...(statusFilter ? { status: statusFilter } : {}),
        page,
        limit: 20,
      }),
  });
  const updateMutation = useMutation({
    mutationFn: updateAdminReportStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-reports"] }),
  });

  const result = reportsQuery.data?.data;
  const reports = result?.reports || [];

  return (
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Administration
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Content reports
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            Review member reports and record their current status.
          </p>
        </div>
        <label className="text-sm font-medium">
          Filter by status
          <select
            className="mt-1 block min-h-10 rounded-lg border border-border bg-background px-3 text-sm"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(event.target.value);
              setPage(1);
            }}
          >
            <option value="">All reports</option>
            <option value="open">Open</option>
            <option value="reviewing">Reviewing</option>
            <option value="closed">Closed</option>
          </select>
        </label>
      </header>

      {reportsQuery.isLoading ? (
        <div className="mt-6 space-y-3" role="status">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-xl bg-surface-hover"
            />
          ))}
          <span className="sr-only">Loading reports...</span>
        </div>
      ) : reportsQuery.isError ? (
        <Card className="mt-6">
          <p className="text-sm text-error" role="alert">
            Reports could not be loaded.
          </p>
          <Button
            className="mt-4"
            variant="secondary"
            size="sm"
            onClick={() => reportsQuery.refetch()}
          >
            Retry
          </Button>
        </Card>
      ) : reports.length === 0 ? (
        <Card className="mt-6">
          <p className="text-sm text-text-muted">
            No reports match this filter.
          </p>
        </Card>
      ) : (
        <div className="mt-6 space-y-4">
          {reports.map((report) => {
            const target = report.targetId;
            const targetLabel =
              target?.title ||
              target?.fullname ||
              target?.content ||
              "Reported content is unavailable";

            return (
              <Card key={report._id}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold capitalize">
                        {report.type} report
                      </h2>
                      <span className="rounded-full bg-surface-hover px-2.5 py-1 text-xs capitalize text-text-secondary">
                        {report.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-text-muted">
                      {report.reporter?.fullname || "Member"} reported{" "}
                      {report.targetType}: {targetLabel}
                    </p>
                    {report.description && (
                      <p className="mt-3 whitespace-pre-line text-sm leading-6 text-text-secondary">
                        {report.description}
                      </p>
                    )}
                    <p className="mt-3 text-xs text-text-muted">
                      Submitted {formatDate(report.createdAt)}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {report.status !== "reviewing" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        loading={updateMutation.isPending}
                        onClick={() =>
                          updateMutation.mutate({
                            reportId: report._id,
                            status: "reviewing",
                          })
                        }
                      >
                        Mark reviewing
                      </Button>
                    )}
                    {report.status !== "closed" && (
                      <Button
                        size="sm"
                        loading={updateMutation.isPending}
                        onClick={() =>
                          updateMutation.mutate({
                            reportId: report._id,
                            status: "closed",
                          })
                        }
                      >
                        Close report
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {updateMutation.isError && (
        <p className="mt-4 text-sm text-error" role="alert">
          {updateMutation.error?.response?.data?.message ||
            "The report status could not be updated."}
        </p>
      )}

      {result?.pages > 1 && (
        <nav
          className="mt-5 flex items-center justify-between"
          aria-label="Report pages"
        >
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((current) => current - 1)}
          >
            Previous
          </Button>
          <span className="text-sm text-text-muted">
            Page {result.page} of {result.pages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= result.pages}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </nav>
      )}
    </div>
  );
};
