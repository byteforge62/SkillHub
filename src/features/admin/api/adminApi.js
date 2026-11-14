import apiClient from "@/lib/axios";

export const getAdminOverview = async () => {
  const response = await apiClient.get("/admin/overview");
  return response.data;
};

export const getAdminReports = async (params = {}) => {
  const response = await apiClient.get("/reports", { params });
  return response.data;
};

export const updateAdminReportStatus = async ({ reportId, status }) => {
  const response = await apiClient.patch(`/reports/${reportId}`, { status });
  return response.data;
};
