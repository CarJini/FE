import { ScrollView, SafeAreaView, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { MaintenanceItem } from "@/src/types";
import { Button, InputBox } from "@/src/components";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function MaintenanceItemFormScreen() {
  const router = useRouter();
  const { mode, itemId } = useLocalSearchParams();
  const isEditMode = mode === "edit";

  //TODO: itemId로 품목 정보 가져오기

  const [maintenanceItem, setMaintenanceItem] = useState<MaintenanceItem>({
    id: "",
    name: "",
    replacementCycle: "0",
    remainingKm: 0,
    iconColor: "black",
    lastReplacementDate: new Date(),
    kmProgress: 0,
    dayProgress: 0,
    status: "good",
  });

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <View className="p-4 bg-white rounded-lg  border border-gray-200 mb-4">
          <Text className="text-base mb-2">기본 정보</Text>
          <InputBox label="품목 이름" />
          <InputBox label="아이콘 색상" />
        </View>
        <View className="p-4 bg-white rounded-lg  border border-gray-200">
          <Text className="text-base mb-2">교체 주기 설정</Text>
          <InputBox label="교체 주기 (km)" />
          <InputBox label="교체 주기 (일)" />
        </View>
        {isEditMode && (
          <Button label="삭제" color="secondary" onPress={() => {}} />
        )}
        <Button label={isEditMode ? "저장" : "추가"} onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
}
