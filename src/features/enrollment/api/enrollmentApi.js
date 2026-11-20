import apiClient from "@/lib/axios";

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

export const toggleSavedEnrollment = async (enrollmentId) => {
  const response = await apiClient.patch(`/enrollments/${enrollmentId}/saved`);
  return response.data;
};

export const getLessonNote = async (enrollmentId, lessonId) => {
  const response = await apiClient.get(
    `/enrollments/${enrollmentId}/lessons/${lessonId}/note`,
  );
  return response.data;
};

export const saveLessonNote = async (enrollmentId, lessonId, content) => {
  const response = await apiClient.put(
    `/enrollments/${enrollmentId}/lessons/${lessonId}/note`,
    { content },
  );
  return response.data;
};