import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { API_ENDPOINTS } from "./apiEndpoints";

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
      console.warn(token);
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
    delay(8000);
    const originalRequest = error.config;

    const { method, url: tokenRefreshUrl } = API_ENDPOINTS.AUTH.REFRESH_TOKEN;

    // 무한루프 방지
    if (
      originalRequest.url?.endsWith(tokenRefreshUrl) ||
      originalRequest._retry
    ) {
      console.warn(
        "Request failed with status code 401 (Refresh token attempt or already retried)"
      );
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        console.warn("refreshToken", refreshToken);
        if (!refreshToken) {
          console.log("Refresh token not found. Redirecting to login.");
          router.replace("/(auth)/login");
          return Promise.reject(error);
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
        router.push("/(auth)/login");
        console.error("Error refreshing token", err);
        return Promise.reject(new Error("Refresh token failed"));
      }
    }

    return Promise.reject(error);
  }
);
