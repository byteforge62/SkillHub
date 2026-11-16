import { getAccessToken } from "@/features/auth/utils/tokenManager";

export const setupRequestInterceptor = (client) => {
    client.interceptors.request.use(
        (config) => {
            const token = getAccessToken();
            if(token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    )
}