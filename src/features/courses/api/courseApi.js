import apiClient from "@/lib/axios/client";

export const getCourses = async() => {
  const response = await apiClient.get("/courses",{params});
  return response.data;
}

export const getCourseById = async (courseId) => {
  const response = await apiClient.get(`/courses/${courseId}`);
  return response.data;
};