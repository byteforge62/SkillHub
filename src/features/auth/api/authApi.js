import client from "@/lib/axios";

export const registerRequest = async (payload) => {
  const { data } = await client.post("/user", payload);
  return data;
};

export const loginRequest = async (payload) => {
  const response = await client.post("/loginuser", payload);
  return response.data;
};

export const verifyEmailRequest = async (payload) => {
  const { data } = await client.post("/verify-email", payload);
  return data;
};

export const resendVerificationRequest = async (payload) => {
  const { data } = await client.post("/verify-email/resend", payload);
  return data;
};

export const forgotPasswordRequest = async (payload) => {
  const { data } = await client.post("/forgot-password", payload);
  return data;
};

export const verifyResetOtpRequest = async (payload) => {
  const { data } = await client.post("/verify-reset-otp", payload);
  return data;
};

export const resetPasswordRequest = async (payload) => {
  const { data } = await client.post("/reset-password", payload);
  return data;
};

export const refreshTokenRequest = async (payload) => {
  const { data } = await client.post("/refresh-token", payload);
  return data;
};

export const logoutRequest = async (payload) => {
  const { data } = await client.post("/logout", payload);
  return data;
};