import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { View, Text } from "react-native";

export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleLogin() {
    setIsLoading(true);
    setError("");

    const result = await signInWithGoogle();

    if (!result.success) {
      setError("로그인에 실패하였습니다.");
      setIsLoading(false);
    }
  }

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}
