import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export function NoVehicles() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-[80px] h-[80px] rounded-lg bg-slate-300 justify-center items-center mb-4">
        <Ionicons name="car" size={32} />
      </View>
      <Text className="text-xl font-bold mb-2">등록된 차량이 없습니다.</Text>
      <Text className="text-gray-600 opacity-80">
        차량을 등록하고 관리해보세요.
      </Text>
    </View>
  );
}
