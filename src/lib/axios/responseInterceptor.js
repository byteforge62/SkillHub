import { clearAccessToken, setAccessToken } from "@/features/auth/utils/tokenManager";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

export const setupResponseInterceptor = (client) => {
  client.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status !== 401 ||
        originalRequest?._retry ||
        originalRequest?.url?.includes("/refresh-token")
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return client(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await client.post("/refresh-token");

        const newAccessToken = response.data.data.accessToken;

        setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return client(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        clearAccessToken();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};