import { useAuth } from "@/src/hooks";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function LoginScreen() {
  const { signInWithGoogle } = useAuth();

  async function handleLogin() {
    await signInWithGoogle();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoTitle}>카지니</Text>
        <Text style={styles.info}>
          내 차를 더 스마트하게 관리하는 {"\n"} 최고의 자동차 관리 앱
        </Text>
      </View>
      <View style={styles.middle}>
        <IconComponent iconName="wrench" text={"소모품 관리\n자동 알림"} />
        <IconComponent iconName="comment" text={"AI 챗봇\n장비 조언"} />
        <IconComponent iconName="bar-chart" text={"차량 관리\n통계 제공"} />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.info}>
          간편하게 시작하고{"\n"}나만의 차량 관리를 시작하세요
        </Text>
        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.loginButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <View style={styles.googleLoginContainer}>
            <Image
              source={require("@/assets/images/g-logo.png")}
              style={styles.googleLogo}
              resizeMode="contain"
            />
            <Text style={styles.googleLoginButtonText}>
              Google 계정으로 계속하기
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function IconComponent({ iconName, text }: { iconName: string; text: string }) {
  return (
    <View style={styles.IconComponent}>
      <View style={styles.iconCircle}>
        <Icon name={iconName} size={24} color="#000" />
      </View>
      <Text style={styles.iconText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  top: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  middle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  bottom: {
    flex: 1,
    gap: 15,
    alignItems: "center",
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  info: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 24,
    color: "#666666",
    opacity: 0.8,
  },
  IconComponent: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexBasis: "30%",
    gap: 8,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e6e6fa",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: "80%",
  },
  buttonPressed: {
    opacity: 0.5,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  googleLogo: {
    width: 24,
    height: 24,
  },
  googleLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  googleLoginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
