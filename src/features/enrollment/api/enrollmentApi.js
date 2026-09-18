import apiClient from "@/lib/axios/client";

export const enrollInCourse = async (courseId) => {
  const response = await apiClient.post("/enrollments", {courseId});
  return response.data;
};

export const getMyEnrollments = async () => {
  const response = await apiClient.get("/enrollments/me");
  return response.data;
};

export const getMyEnrollmentById = async (enrollmentId) => {
  const response = await apiClient.get(`/enrollments/${enrollmentId}`);
  return response.data;
};

export const completeLesson = async (enrollmentId,lessonId) => {
  const response = await apiClient.patch(`/enrollments/${enrollmentId}/lessons/${lessonId}/complete`);
  return response.data;
};

export const dropCourse = async (enrollmentId) => {
  const response = await apiClient.patch(`/enrollments/${enrollmentId}/drop`);
  return response.data;
};