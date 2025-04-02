import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextType, User } from "@/src/types";
WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [_, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  });

  useEffect(() => {
    loadStoredAuth();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      handleSignInWithGoogle(response.authentication?.accessToken);
    }
  }, [response]);

  async function loadStoredAuth() {
    try {
      const userJson = await AsyncStorage.getItem("user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    } catch (e) {
      console.error("Failed to load auth info", e);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignInWithGoogle(accessToken: string | undefined) {
    if (!accessToken) {
      return { success: false, error: "No Access Token" };
    }

    setIsLoading(true);

    try {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userData = await userInfoResponse.json();
      const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
      };

      setUser(user);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      return { success: true };
    } catch (e) {
      console.error("Error signing in with Google", e);
      return { success: false, error: "Error signing in with Google" };
    } finally {
      setIsLoading(false);
    }
  }

  async function signInWithGoogle() {
    setIsLoading(true);
    try {
      const result = await promptAsync();

      if (result?.type !== "success") {
        return {
          success: false,
          error: "Google sign in was cancelled or failed",
        };
      }
      return { success: true };
    } catch (e) {
      console.error("Error initiating Google sign in", e);
      return { success: false, error: "Error initiating Google sign in" };
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    setIsLoading(true);
    await AsyncStorage.removeItem("user");
    setUser(null);
    setIsLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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
