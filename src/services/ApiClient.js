import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

let onUnauthorized = null;

export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

const getStoredTokens = () => {
  try {
    const stored = localStorage.getItem("authTokens");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const setStoredTokens = (tokens) => {
  localStorage.setItem("authTokens", JSON.stringify(tokens));
};

const clearStoredTokens = () => {
  localStorage.removeItem("authTokens");
};

const isRefreshOrLoginRequest = (url = "") =>
  url.includes("auth/jwt/create") || url.includes("auth/jwt/refresh");

apiClient.interceptors.request.use((config) => {
  const tokens = getStoredTokens();
  if (tokens?.access) {
    config.headers.Authorization = `JWT ${tokens.access}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, accessToken = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(accessToken);
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isRefreshOrLoginRequest(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((accessToken) => {
        originalRequest.headers.Authorization = `JWT ${accessToken}`;
        return apiClient(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const tokens = getStoredTokens();
      if (!tokens?.refresh) {
        throw error;
      }

      const { data } = await refreshClient.post("auth/jwt/refresh", {
        refresh: tokens.refresh,
      });

      const newTokens = {
        access: data.access,
        refresh: data.refresh || tokens.refresh,
      };
      setStoredTokens(newTokens);
      processQueue(null, newTokens.access);

      originalRequest.headers.Authorization = `JWT ${newTokens.access}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearStoredTokens();
      onUnauthorized?.();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;
