import apiClient from "@/lib/axios/client";

export const getCommunities = async () => {
  const response = await apiClient.get("/communities");
  return response.data;
};

export const createCommunity = async (communityData) => {
  const response = await apiClient.post("/communities", communityData);
  return response.data;
};

export const getCommunityById = async (communityId) => {
  const response = await apiClient.get(`/communities/${communityId}`);
  return response.data;
};

export const joinCommunity = async (communityId) => {
  const response = await apiClient.patch(`/communities/${communityId}/join`);
  return response.data;
};

export const leaveCommunity = async (communityId) => {
  const response = await apiClient.patch(`/communities/${communityId}/leave`);
  return response.data;
};

export const getCommunityPosts = async (communityId, params = {}) => {
  const response = await apiClient.get(
    `/communities/${communityId}/posts`,
    { params },
  );
  return response.data;
};

export const createPost = async (postData) => {
  const response = await apiClient.post("/posts", postData);
  return response.data;
};

export const togglePostLike = async (postId) => {
  const response = await apiClient.post(`/posts/${postId}/like`);
  return response.data;
};

export const addPostComment = async ({ postId, content }) => {
  const response = await apiClient.post(`/posts/${postId}/comment`, {
    content,
  });
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await apiClient.delete(`/posts/${postId}`);
  return response.data;
};
