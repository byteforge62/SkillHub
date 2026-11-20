import apiClient from "@/lib/axios";

/* ---------------------------------------------------------------
   Courses
   --------------------------------------------------------------- */

export const getMyCourses = async () => {
  const response = await apiClient.get("/courses/me");
  return response.data;
};

export const getManagedCourse = async (courseId) => {
  const response = await apiClient.get(`/courses/${courseId}/manage`);
  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient.get("/categories");
  return response.data;
};

export const createCourse = async (payload) => {
  const response = await apiClient.post("/courses", payload);
  return response.data;
};

export const updateCourse = async (courseId, payload) => {
  const response = await apiClient.patch(`/courses/${courseId}`, payload);
  return response.data;
};

export const publishCourse = async (courseId) => {
  const response = await apiClient.patch(`/courses/${courseId}/publish`);
  return response.data;
};

export const archiveCourse = async (courseId) => {
  const response = await apiClient.patch(`/courses/${courseId}/archive`);
  return response.data;
};

export const deleteCourse = async (courseId) => {
  const response = await apiClient.delete(`/courses/${courseId}`);
  return response.data;
};

export const uploadCourseThumbnail = async (courseId, file) => {
  const formData = new FormData();
  formData.append("thumbnail", file);

  const response = await apiClient.post(`/courses/${courseId}/thumbnail`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

/* ---------------------------------------------------------------
   Curriculum
   --------------------------------------------------------------- */

export const getCourseSections = async (courseId) => {
  const response = await apiClient.get(`/courses/${courseId}/sections`);
  return response.data;
};

export const createSection = async (courseId, payload) => {
  const response = await apiClient.post(`/courses/${courseId}/sections`, payload);
  return response.data;
};

export const updateSection = async (sectionId, payload) => {
  const response = await apiClient.patch(`/sections/${sectionId}`, payload);
  return response.data;
};

export const deleteSection = async (sectionId) => {
  const response = await apiClient.delete(`/sections/${sectionId}`);
  return response.data;
};

export const getSectionLessons = async (sectionId) => {
  const response = await apiClient.get(`/sections/${sectionId}/lessons`);
  return response.data;
};

export const createLesson = async (sectionId, payload) => {
  const response = await apiClient.post(`/sections/${sectionId}/lessons`, payload);
  return response.data;
};

export const updateLesson = async (lessonId, payload) => {
  const response = await apiClient.patch(`/lessons/${lessonId}`, payload);
  return response.data;
};

export const publishLesson = async (lessonId) => {
  const response = await apiClient.patch(`/lessons/${lessonId}/publish`);
  return response.data;
};

export const deleteLesson = async (lessonId) => {
  const response = await apiClient.delete(`/lessons/${lessonId}`);
  return response.data;
};

export default {
  getMyCourses,
  getManagedCourse,
  getCategories,
  createCourse,
  updateCourse,
  publishCourse,
  archiveCourse,
  deleteCourse,
  uploadCourseThumbnail,
  getCourseSections,
  createSection,
  updateSection,
  deleteSection,
  getSectionLessons,
  createLesson,
  updateLesson,
  publishLesson,
  deleteLesson,
};
