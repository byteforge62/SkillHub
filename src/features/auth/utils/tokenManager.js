let accessToken = localStorage.getItem("skillhub-access-token");

export const setAccessToken = (token) => {
    accessToken = token;
    localStorage.setItem("skillhub-access-token", token);
};

export const getAccessToken = () => {
    return accessToken;
};

export const clearAccessToken = () => {
    accessToken = null;
    localStorage.removeItem("skillhub-access-token");
};

export const initializeAccessToken = () => {
    accessToken = localStorage.getItem("skillhub-access-token");
};
