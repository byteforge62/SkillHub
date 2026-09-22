import apiClient from "@/lib/axios/client";

export const getCourseSections = async (courseId) => {
  const response = await apiClient.get(`/courses/${courseId}/sections`);
  return response.data;
};

export const getSectionLessons = async (sectionId) => {
  const response = await apiClient.get(`/sections/${sectionId}/lessons`);
  return response.data;
};

export const getLessonById = async (lessonId) => {
  const response = await apiClient.get(`/lessons/${lessonId}`);
  return response.data;
};

export const getResourceById = async(resourceId) => {
  const response = await apiClient.get(`/resources/${resourceId}`);
  return response.data;
}

export const getQuizById = async (quizId) => {
  const response = await apiClient.get(`/quizzes/${quizId}`);
  return response.data;
};

export const submitQuizAttempt = async (quizId, answers) => {
  const response = await apiClient.post(`/quizzes/${quizId}/attempts`,{answers});
  return response.data;
};

export const getQuizQuestions = async (quizId) => {
  const response = await apiClient.get(`/quizzes/${quizId}/questions`);
  return response.data;
};
