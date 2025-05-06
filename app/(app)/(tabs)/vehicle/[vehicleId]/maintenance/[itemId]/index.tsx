import { ScrollView, SafeAreaView, Text, View, Pressable } from "react-native";
import { Card } from "@/src/components";
import { useRoute } from "@react-navigation/native";
import { MaintenanceItemStatus } from "@/src/components/vehicle";
import { router } from "expo-router";
import { useVehicleAdd } from "@/src/context";
import { useEffect, useState } from "react";
import { MaintenanceHistory } from "@/src/types";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";

export default function MaintenanceDetailScreen() {
  const { myVehicles, maintenanceItemsByVehicle } = useVehicleAdd();
  const [maintenanceHistories, setMaintenanceHistories] =
    useState<MaintenanceHistory[]>();
  const route = useRoute();
  const params = route.params as { vehicleId: string; itemId: string };
  const vehicleId = Number(params.vehicleId);
  const itemId = Number(params.itemId);
  const vehicleInfo = myVehicles.find((vehicle) => vehicle.id === vehicleId);
  const item = maintenanceItemsByVehicle[vehicleId].find(
    (item) => item.id === itemId
  );

  useEffect(() => {
    async function fetchMaintenanceHistories() {
      try {
        const { method, url } = API_ENDPOINTS.MAINTENANCE_HISTORY.LIST;
        const carOwnerId = vehicleId.toString();
        let finalUrl = url.replace("{carOwnerId}", carOwnerId.toString());
        finalUrl = finalUrl.replace("{maintenanceItemId}", itemId.toString());
        console.log("finalUrl !>>>>>>", { finalUrl });
        const res = await apiClient.request<{
          data: MaintenanceHistory[];
        }>({
          method,
          url: finalUrl,
        });
        if (res.status === 200) {
          setMaintenanceHistories(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching maintenance histories:", error);
      }
    }

    fetchMaintenanceHistories();
  }, []);

  function onEditMaintenance() {
    router.push(
      `/vehicle/${vehicleId}/maintenance/form?mode=edit&itemId=${itemId}`
    );
  }

  function onAddHistory() {
    router.push(
      `/vehicle/${vehicleId}/maintenance/${itemId}/add-history?mode=add`
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
          history.maintenanceItemId === itemId &&
          history.replacementDate &&
          history.replacementKm
      ) ?? [];

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 min-h-full">
        <View className="p-4">
          <View className="p-4 bg-white active:bg-gray-200 rounded-xl border border-gray-200 my-2">
            <MaintenanceItemStatus
              vehicleNowKm={vehicleInfo.nowKm}
              item={item}
            />
            <View className="flex-row flex-1 justify-between gap-2">
              <Pressable
                className={`flex-1 p-3 rounded-lg mt-3 bg-blue-500 active:bg-blue-300`}
                onPress={onEditMaintenance}
              >
                <Text className={`text-center text-white`}>품목 수정</Text>
              </Pressable>
            </View>
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
                <Card key={history.id}>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm font-semibold ">
                      {history.replacementDate}
                    </Text>
                    <Text className="text-sm text-blue-500">
                      {history.replacementKm?.toLocaleString()} Km
                    </Text>
                  </View>
                  <Text>{item.name} 교체 완료</Text>
                </Card>
              ))}
              <Pressable
                className={`flex-1 p-3 rounded-lg mt-3 bg-blue-500 active:bg-blue-300`}
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
