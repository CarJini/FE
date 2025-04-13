import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const baseURL = "https://api.carjini.shop";

// API 기본 URL 설정
const apiClient = axios.create({
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
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("axios client interceptors request", config);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    // 이미 재시도한 요청인지 확인 (무한 루프 방지)
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        // refreshToken으로 accessToken 갱신 필요
        const response = await apiClient.post("/api/auth/refresh", {
          refreshToken,
        });
        const { accessToken } = response.data;

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

export default apiClient;
