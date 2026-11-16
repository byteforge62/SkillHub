import apiClient from "@/lib/axios";

export const updateProfile = async ({ userId, profile }) => {
  const response = await apiClient.put(`/user/${userId}`, profile);
  return response.data.data;
};

export const uploadProfileAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const response = await apiClient.post("/user/me/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

export const getProfileSettings = async (userId) => {
  const response = await apiClient.get(`/user/${userId}/settings`);
  return response.data;
};

export const updateProfileSettings = async ({ userId, settings }) => {
  const response = await apiClient.put(`/user/${userId}/settings`, settings);
  return response.data;
};
