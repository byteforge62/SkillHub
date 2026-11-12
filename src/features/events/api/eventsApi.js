import apiClient from "@/lib/axios/client";

export const getEvents = async (params = {}) => {
  const response = await apiClient.get("/events", { params });
  return response.data;
};

export const getEventById = async (eventId) => {
  const response = await apiClient.get(`/events/${eventId}`);
  return response.data;
};

export const getMyEvents = async () => {
  const response = await apiClient.get("/events/mine");
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await apiClient.post("/event", eventData);
  return response.data;
};

export const updateEvent = async ({ eventId, eventData }) => {
  const response = await apiClient.patch(`/events/${eventId}`, eventData);
  return response.data;
};

export const cancelEvent = async (eventId) => {
  const response = await apiClient.patch(`/events/${eventId}/cancel`);
  return response.data;
};
