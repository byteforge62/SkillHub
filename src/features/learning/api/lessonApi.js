import apiClient from "@/lib/axios/client";

export const getLessonById = async (lessonId) => {
  const response = await apiClient.get(`/lessons/${lessonId}`);
  return response.data;
};

export const getSectionLessons = async (sectionId) => {
  const response = await apiClient.get(`/lessons/section/${sectionId}`);
  return response.data;
};