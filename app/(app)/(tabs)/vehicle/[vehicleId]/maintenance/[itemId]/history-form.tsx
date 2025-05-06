import { ScrollView, SafeAreaView, Text, View } from "react-native";
import { useState } from "react";
import { Button, InputBox } from "@/src/components";
import { useRouter } from "expo-router";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";
import { MaintenanceHistory } from "@/src/types";
import { replacePathParams } from "@/src/utils";
import { useMaintenanceParams } from "@/src/hooks";
import { useMaintenanceHistoryStore } from "@/src/store/maintenance";

export default function MaintenanceHistoryFormScreen() {
  const {
    vehicleId,
    itemId: maintenanceItemId,
    historyId,
    isEditMode,
  } = useMaintenanceParams();
  const history = useMaintenanceHistoryStore((state) => state.current);
  const [maintenanceHistory, setMaintenanceHistory] =
    useState<MaintenanceHistory>(
      isEditMode && history
        ? {
            replacementDate: history.replacementDate,
            replacementKm: history.replacementKm,
          }
        : {
            replacementDate: "",
            replacementKm: 0,
          }
    );
  const router = useRouter();

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
    if (isEditMode && historyId) {
      ({ method, url } = API_ENDPOINTS.MAINTENANCE_HISTORY.UPDATE);
      finalUrl = replacePathParams(url, {
        carOwnerId,
        maintenanceItemId: maintenanceItemId.toString(),
        id: historyId.toString(),
      });
    } else {
      ({ method, url } = API_ENDPOINTS.MAINTENANCE_HISTORY.CREATE);
      finalUrl = replacePathParams(url, {
        carOwnerId,
        maintenanceItemId: maintenanceItemId.toString(),
      });
    }

    try {
      await apiClient.request({
        method,
        url: finalUrl,
        data: maintenanceHistory,
      });
      router.push(`/vehicle/${vehicleId}/maintenance/${maintenanceItemId}`);
    } catch (error) {
      console.error("Error saving maintenance item:", error);
    }
  }

  async function onDelete() {
    if (!historyId) return;

    const { method, url } = API_ENDPOINTS.MAINTENANCE_HISTORY.DELETE;
    try {
      await apiClient.request({
        method,
        url: replacePathParams(url, {
          carOwnerId: vehicleId.toString(),
          maintenanceItemId: maintenanceItemId.toString(),
          id: historyId.toString(),
        }),
      });
      router.push(`/vehicle/${vehicleId}/maintenance/${maintenanceItemId}`);
    } catch (error) {
      console.error("Error deleting maintenance item:", error);
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
        {isEditMode && (
          <Button label="삭제" color="secondary" onPress={onDelete} />
        )}
        <Button label={isEditMode ? "저장" : "추가"} onPress={onSave} />
      </ScrollView>
    </SafeAreaView>
  );
}
