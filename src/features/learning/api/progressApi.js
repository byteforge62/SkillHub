import apiClient from "@/lib/axios/client";

export const markLessonComplete = async (enrollmentId, lessonId) => {
  const response = await apiClient.patch(`/enrollment/mark-complete/${enrollmentId}/${lessonId}`);
  return response.data;
};