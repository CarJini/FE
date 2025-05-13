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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="basis-1/2 justify-center items-center">
        <Image
          source={require("@/assets/images/logo.png")}
          className="w-[100px] h-[100px] mb-5"
          resizeMode="contain"
        />
        <Text className="font-bold text-2xl">카지니</Text>
        <Text className="text-sm text-gray-500 text-center">
          내 차를 더 스마트하게 관리하는 {"\n"} 최고의 자동차 관리 앱
        </Text>
      </View>
      <View className="basis-1/4 flex-row justify-between p-12">
        <IconComponent iconName="wrench" text={"소모품 관리\n자동 알림"} />
        <IconComponent iconName="comment" text={"AI 챗봇\n장비 조언"} />
        <IconComponent iconName="bar-chart" text={"차량 관리\n통계 제공"} />
      </View>
      <View className="basis-1/4 gap-5 items-center">
        <Text className="text-sm text-gray-500 text-center">
          간편하게 시작하고{"\n"}나만의 차량 관리를 시작하세요
        </Text>
        <Pressable
          onPress={signInWithGoogle}
          className="bg-white items-center rounded-lg p-4 w-4/5 shadow-md border border-gray-200"
          style={({ pressed }) => [pressed && styles.buttonPressed]}
        >
          <View className="flex-row items-center gap-3">
            <Image
              source={require("@/assets/images/g-logo.png")}
              className="w-[24px] h-[24px]"
              resizeMode="contain"
            />
            <Text className="font-bold">Google 계정으로 계속하기</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function IconComponent({ iconName, text }: { iconName: string; text: string }) {
  return (
    <View className="flex-col items-center gap-3">
      <View className="w-[50px] h-[50px] rounded-full bg-slate-300 justify-center items-center">
        <Icon name={iconName} size={24} color="#000" />
      </View>
      <Text className="text-xs text-center">{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonPressed: {
    opacity: 0.5,
  },
});
