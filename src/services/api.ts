import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseURL = "https://5800-27-100-211-68.ngrok-free.app";

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
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
