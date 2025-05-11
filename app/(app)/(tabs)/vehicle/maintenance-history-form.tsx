import { ScrollView, SafeAreaView, Platform, BackHandler } from "react-native";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  DateInput,
  IconButton,
  InputBox,
  ScreenLayout,
} from "@/src/components";
import { useRouter } from "expo-router";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";
import { MaintenanceHistory } from "@/src/types";
import { replacePathParams } from "@/src/utils";
import { useMaintenanceParams, useSafeBackRedirect } from "@/src/hooks";
import { useMaintenanceHistoryStore } from "@/src/store/useMaintenanceHistoryStore";
import Toast from "react-native-toast-message";

// 정비 이력 등록/수정
export default function MaintenanceHistoryFormScreen() {
  const router = useRouter();
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
            replacementDate: new Date(),
            replacementKm: 0,
          }
    );
  useSafeBackRedirect(onBackPress);

  function onBackPress() {
    router.replace(
      `/vehicle/maintenance-item-detail?vehicleId=${vehicleId}&itemId=${maintenanceItemId}`
    );
  }

  function onChangeInput(value: number) {
    setMaintenanceHistory((prev) => ({
      ...prev,
      replacementKm: value,
    }));
  }

  function onDateChange(date: Date) {
    setMaintenanceHistory((prev) => ({
      ...prev,
      replacementDate: date,
    }));
  }

  async function onSave() {
    if (maintenanceHistory.replacementKm <= 0) {
      Toast.show({
        type: "error",
        text1: "주행 거리를 입력하세요.",
        position: "bottom",
      });
      return;
    }
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

      Toast.show({
        type: "success",
        text1: isEditMode ? "저장 완료" : "추가 완료",
        position: "bottom",
      });

      router.replace(
        `/vehicle/maintenance-item-detail?vehicleId=${vehicleId}&itemId=${maintenanceItemId}`
      );
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

      Toast.show({
        type: "success",
        text1: "삭제 완료",
        position: "bottom",
      });

      router.replace(
        `/vehicle/maintenance-item-detail?vehicleId=${vehicleId}&itemId=${maintenanceItemId}`
      );
    } catch (error) {
      console.error("Error deleting maintenance item:", error);
    }
  }

  return (
    <ScreenLayout
      headerTitle={`정비 이력 ${isEditMode ? "수정" : "추가"}`}
      scroll={true}
      LeftHeader={<IconButton iconName="chevron-back" onPress={onBackPress} />}
    >
      <Card>
        <DateInput
          label="정비 날짜"
          date={maintenanceHistory.replacementDate}
          onChange={onDateChange}
        />
        <InputBox
          label="누적 주행 거리(km)"
          value={maintenanceHistory.replacementKm.toString()}
          onChangeText={(nextValue) =>
            onChangeInput(nextValue.trim() === "" ? 0 : parseInt(nextValue))
          }
          keyboardType={Platform.select({
            ios: "decimal-pad",
            android: "numeric",
          })}
        />
        {isEditMode && (
          <Button label="삭제" color="secondary" onPress={onDelete} />
        )}
        <Button label={isEditMode ? "저장" : "추가"} onPress={onSave} />
      </Card>
    </ScreenLayout>
  );
}
