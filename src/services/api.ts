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
    console.warn("Request interceptor", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    console.log("axios client interceptors response", error);
    const originalRequest = error.config;

    const { method, url: tokenRefreshUrl } = API_ENDPOINTS.AUTH.REFRESH_TOKEN;

    // 무한 루프 방지
    if (
      originalRequest.url?.endsWith(tokenRefreshUrl) ||
      originalRequest._retry
    ) {
      console.warn("Request failed with status code 401");
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) {
          router.push("/(auth)/login");
          return Promise.reject(error);
        }

        const response = await refreshClient.request({
          method,
          url: tokenRefreshUrl,
          data: {
            refreshToken,
          },
        });
        const { data: accessToken } = response.data;
        await AsyncStorage.setItem("accessToken", accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        router.push("/(auth)/login");
        console.error("Error refreshing token", err);
      }
    }
  }
);
