import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { MaintenanceItemStatus } from "@/src/components/vehicle";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { MaintenanceHistory } from "@/src/types";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";
import { replacePathParams } from "@/src/utils";
import { useMaintenanceParams } from "@/src/hooks";
import { useMaintenanceHistoryStore } from "@/src/store/maintenance";
import { useVehicleStore } from "@/src/store";
import { format } from "date-fns";

// 정비 품목 상세
export default function MaintenanceItemDetailScreen() {
  const { vehicleId, itemId } = useMaintenanceParams();
  const myVehicles = useVehicleStore((state) => state.myVehicles);
  const maintenanceItemsByVehicle = useVehicleStore(
    (state) => state.maintenanceItemsByVehicle
  );
  const fetchMaintenanceItems = useVehicleStore(
    (state) => state.fetchMaintenanceItems
  );
  const [maintenanceHistories, setMaintenanceHistories] =
    useState<MaintenanceHistory[]>();
  const vehicleInfo = myVehicles.find((vehicle) => vehicle.id === vehicleId);
  const item = maintenanceItemsByVehicle[vehicleId].find(
    (item) => item.id === itemId
  );
  const setCurrentHistory = useMaintenanceHistoryStore(
    (state) => state.setCurrent
  );

  async function fetchMaintenanceHistories() {
    try {
      const { method, url } = API_ENDPOINTS.MAINTENANCE_HISTORY.LIST;
      const res = await apiClient.request<{ data: MaintenanceHistory[] }>({
        method,
        url: replacePathParams(url, {
          carOwnerId: vehicleId.toString(),
          maintenanceItemId: itemId.toString(),
        }),
      });
      if (res.status === 200) {
        res.data.data.forEach((history) => {
          history.replacementDate = new Date(history.replacementDate);
        });
        setMaintenanceHistories(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching maintenance histories:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchMaintenanceItems(vehicleId);
      fetchMaintenanceHistories();
    }, [])
  );

  function onEditMaintenance() {
    router.push(
      `/vehicle/maintenance-item-form?mode=edit&itemId=${itemId}&vehicleId=${vehicleId}`
    );
  }

  function onAddHistory() {
    router.push(
      `/vehicle/maintenance-history-form?mode=add&itemId=${itemId}&vehicleId=${vehicleId}`
    );
  }

  function onEditHistory(history: MaintenanceHistory) {
    setCurrentHistory(history);
    router.push(
      `/vehicle/maintenance-history-form?mode=edit&itemId=${itemId}&vehicleId=${vehicleId}&historyId=${history.id}`
    );
  }

  if (!vehicleInfo || !item) {
    return null;
  }

  const filteredHistories =
    maintenanceHistories
      ?.sort(
        (a, b) =>
          new Date(b.replacementDate).getTime() -
          new Date(a.replacementDate).getTime()
      )
      .filter(
        (history) =>
          history.maintenanceItemId === itemId && history.replacementDate
      ) ?? [];

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 min-h-full"
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              fetchMaintenanceItems(vehicleId);
              fetchMaintenanceHistories();
            }}
          />
        }
      >
        <View className="p-4">
          <View className="p-4 bg-white active:bg-gray-200 rounded-lg border border-gray-200 my-2">
            <MaintenanceItemStatus
              vehicleNowKm={vehicleInfo.nowKm}
              item={item}
            />

            <TouchableOpacity
              className="flex-1 p-3 rounded-lg mt-3 bg-blue-500 active:bg-blue-300"
              onPress={onEditMaintenance}
            >
              <Text className="text-center text-white">품목 수정</Text>
            </TouchableOpacity>
          </View>
          <View className="p-4 bg-white rounded-lg border border-gray-200">
            <Text className="text-lg font-bold mb-4">정비 이력</Text>
            {filteredHistories.length === 0 && (
              <Text className="mt-6 mb-6 text-sm text-gray-400 text-center">
                등록된 정비 이력이 없습니다.
              </Text>
            )}
            <View className="gap-3">
              {filteredHistories.map((history) => (
                <Pressable
                  key={history.id}
                  onPress={() => onEditHistory(history)}
                  className="rounded-lg bg-white p-4 mb-2 border border-gray-200 active:bg-gray-100 shadow-sm"
                >
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-sm font-semibold">
                      {format(history.replacementDate, "yyyy-MM-dd")}
                    </Text>
                    <Text className="text-sm text-blue-500">
                      {history.replacementKm?.toLocaleString()} Km
                    </Text>
                  </View>
                </Pressable>
              ))}
              <Pressable
                className="flex-1 p-3 rounded-lg mt-3 bg-blue-500 active:bg-blue-300"
                onPress={onAddHistory}
              >
                <Text className={`text-center text-white`}>이력 추가</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
