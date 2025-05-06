import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextType, User } from "@/src/types";
import { Platform } from "react-native";
import { baseURL, apiClient } from "../services/api";
import { API_ENDPOINTS } from "../services/apiEndpoints";

const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    WebBrowser.maybeCompleteAuthSession();
    checkAuthStatus();

    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (!initialUrl) return;

      handleRedirectUrl(initialUrl);
    };

    const subscription = Linking.addEventListener("url", ({ url }) => {
      handleRedirectUrl(url);
    });
    getInitialUrl();

    return () => {
      subscription.remove();
    };
  }, []);

  async function signInWithGoogle() {
    setIsLoading(true);
    const callbackUrl = Linking.createURL("login-callback");
    const backendApi = `${baseURL}/api/auth/login/google?redirectUrl=`;
    const googleLoginUrl = `${backendApi}${callbackUrl}`;

    try {
      if (Platform.OS === "ios") {
        await Linking.openURL(googleLoginUrl);
      } else {
        await WebBrowser.openAuthSessionAsync(googleLoginUrl, callbackUrl);
      }
    } catch (error) {
      console.error("Error during Google login", error);
    } finally {
      setIsLoading(false);
      console.log("complete sign in with google");
    }
  }

  async function checkAuthStatus() {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const userJson = await AsyncStorage.getItem("user");

      if (accessToken && userJson) {
        setUser(JSON.parse(userJson));
      } else if (accessToken) {
        await fetchUserInfo(accessToken);
      }
    } catch (e) {
      console.error("Failed to load auth info", e);
    } finally {
      console.log("check auth status complete user:", user);
      setIsLoading(false);
    }
  }

  async function handleRedirectUrl(url: string) {
    const { path, queryParams } = Linking.parse(url);
    if (
      path !== "login-callback" ||
      !queryParams?.accessToken ||
      !queryParams?.refreshToken
    ) {
      return;
    }

    const accessToken = Array.isArray(queryParams?.accessToken)
      ? queryParams?.accessToken[0]
      : queryParams?.accessToken;

    const refreshToken = Array.isArray(queryParams?.refreshToken)
      ? queryParams?.refreshToken[0]
      : queryParams?.refreshToken;

    console.log("token ", {
      accessToken,
      refreshToken,
    });

    try {
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      await fetchUserInfo(accessToken);
    } catch (e) {
      console.error("Error handling redirect URL", e);
    } finally {
      console.log("complete handle redirect url");
    }
  }

  async function fetchUserInfo(accessToken: string) {
    try {
      const { method, url } = API_ENDPOINTS.USER.PROFILE;
      const userResponse = await apiClient.request({ method, url });

      if (userResponse.status !== 200) {
        console.error(
          "구글 정보를 받아오는데 실패 했습니다. 잠시 후 다시 시도해주세요."
        );
        return;
      }
      const { data: userData } = userResponse.data;
      const user: User = {
        email: userData.email,
        name: userData.name,
        profile: userData.profile,
      };
      setUser(user);
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      console.error("Failed to load user info", e);
    }
  }

  async function signOut() {
    setIsLoading(true);
    try {
      await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
    } catch (e) {
      console.error("Failed to remove accessToken and user", e);
    }
    setUser(null);
    setIsLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used with in AuthProvider");
  }
  return context;
}
