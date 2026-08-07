export const setupResponseInterceptor = (client) => {
    client.interceptors.response.use(
        (response) => response,
        async (error) => {
            return Promise.reject(error);
        }
    )
}