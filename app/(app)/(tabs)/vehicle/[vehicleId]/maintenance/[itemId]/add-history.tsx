import { ScrollView, SafeAreaView, Text, View } from "react-native";
import { useState } from "react";
import { Button, InputBox } from "@/src/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";
import { MaintenanceHistory } from "@/src/types";

export default function MaintenanceHistoryAddScreen() {
  const [maintenanceHistory, setMaintenanceHistory] =
    useState<MaintenanceHistory>({
      replacementDate: "",
      replacementKm: 0,
    });
  const router = useRouter();
  const {
    mode,
    itemId: itemIdStr,
    vehicleId: vehicleIdStr,
  } = useLocalSearchParams();
  const vehicleId = Number(vehicleIdStr);
  const maintenanceItemId = Number(itemIdStr);
  const isEditMode = mode === "edit";

  function onChangeInput(
    field: keyof MaintenanceHistory,
    value: string | number | boolean
  ) {
    setMaintenanceHistory((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function onSave() {
    const carOwnerId = vehicleId.toString();
    let method: string;
    let url: string;
    let finalUrl: string;
    if (isEditMode) {
      ({ method, url } = API_ENDPOINTS.MAINTENANCE_HISTORY.UPDATE);
      finalUrl = url.replace(
        "{maintenanceItemId}",
        maintenanceItemId.toString()
      );
      finalUrl = finalUrl.replace("{carOwnerId}", carOwnerId);
    } else {
      ({ method, url } = API_ENDPOINTS.MAINTENANCE_HISTORY.CREATE);
      finalUrl = url.replace("{carOwnerId}", carOwnerId);
      finalUrl = finalUrl.replace(
        "{maintenanceItemId}",
        maintenanceItemId.toString()
      );
    }

    const newData = maintenanceHistory;
    console.log("finalUrl>>>>", { method, finalUrl, newData });
    try {
      await apiClient.request({
        method,
        url: finalUrl,
        data: newData,
      });
      router.push(`/vehicle/${vehicleId}/maintenance/${maintenanceItemId}`);
    } catch (error) {
      console.error("Error saving maintenance item:", error);
    }
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <View className="p-4 bg-white rounded-lg  border border-gray-200 mb-4">
          <Text className="text-base mb-2">정비 이력</Text>
          <InputBox
            label="교체 날짜"
            value={maintenanceHistory.replacementDate}
            onChangeText={(nextValue) =>
              onChangeInput("replacementDate", nextValue)
            }
          />
          <InputBox
            label="누적 주행 거리(km)"
            value={maintenanceHistory.replacementKm.toString()}
            onChangeText={(nextValue) =>
              onChangeInput("replacementKm", nextValue)
            }
          />
        </View>
        <Button label={isEditMode ? "저장" : "추가"} onPress={onSave} />
      </ScrollView>
    </SafeAreaView>
  );
}
