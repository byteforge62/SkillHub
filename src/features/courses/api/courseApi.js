import apiClient from "@/lib/axios";

export const getCourses = async(params = {}) => {
  const response = await apiClient.get("/courses",{params: params});
  return response.data;
}

export const getFeaturedCourses = async (params = {}) => {
  const response = await apiClient.get("/courses/featured", { params });
  return response.data;
};

export const getCourseById = async (courseId) => {
  const response = await apiClient.get(`/courses/${courseId}`);
  return response.data;
};