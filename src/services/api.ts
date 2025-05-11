import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { API_ENDPOINTS } from "./apiEndpoints";
import { useAuthStore } from "../store";

export const baseURL = "https://api.carjini.shop";

// API 기본 URL 설정
export const apiClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      console.warn("interceptors 🔥🔥🔥", token);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const { method, url: tokenRefreshUrl } = API_ENDPOINTS.AUTH.REFRESH_TOKEN;

    // 무한루프 방지
    if (
      originalRequest.url?.includes(tokenRefreshUrl) ||
      originalRequest._retry ||
      error.response?.status !== 401
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.warn("Refresh token not found. Redirecting to login.");
        await useAuthStore.getState().signOut();
        router.replace("/(auth)/login");
        return;
      }

      const response = await refreshClient.request({
        method,
        url: tokenRefreshUrl,
        data: { refreshToken },
      });

      const { data: accessToken } = response.data;
      await AsyncStorage.setItem("accessToken", accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    } catch (err) {
      await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
      router.replace("/(auth)/login");
      console.error("Error refreshing token", err);
      return Promise.reject(new Error("Refresh token failed"));
    }
  }
);
