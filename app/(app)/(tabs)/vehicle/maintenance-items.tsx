import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  Pressable,
  RefreshControl,
} from "react-native";
import { Button } from "@/src/components";
import { MaintenanceItemStatus } from "@/src/components/vehicle";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useVehicleStore } from "@/src/store";
import { useMaintenanceParams } from "@/src/hooks";

// 차량 정비 현황
export default function MaintenanceItemsScreen() {
  const { vehicleId } = useMaintenanceParams();
  const myVehicles = useVehicleStore((state) => state.myVehicles);
  const maintenanceItemsByVehicle = useVehicleStore(
    (state) => state.maintenanceItemsByVehicle
  );
  const fetchMaintenanceItems = useVehicleStore(
    (state) => state.fetchMaintenanceItems
  );
  const vehicleInfo = myVehicles.find((vehicle) => vehicle.id === vehicleId);

  useFocusEffect(
    useCallback(() => {
      if (!vehicleId) return;
      fetchMaintenanceItems(vehicleId);
    }, [])
  );

  function onAddMaintenanceItem() {
    router.push(
      `/vehicle/maintenance-item-form?mode=add&vehicleId=${vehicleId}`
    );
  }

  function onClickDetail(itemId: number) {
    router.push(
      `/vehicle/maintenance-item-detail?mode=edit&vehicleId=${vehicleId}&itemId=${itemId}`
    );
  }

  if (!vehicleInfo) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="flex-1 min-h-full"
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              fetchMaintenanceItems(vehicleId);
            }}
          />
        }
      >
        <View className="p-4 min-h-full">
          <Text className="text-xl font-bold">
            {vehicleInfo.model} 차량 정비 현황
          </Text>
          <Text className="text-sm mt-2 mb-4">
            차량에 등록된 정비 내역입니다. 정비를 위한 품목을 추가하거나 교체
            이력을 확인할 수 있습니다.
          </Text>
          {maintenanceItemsByVehicle[vehicleId]?.length === 0 && (
            <View className="flex-1 justify-center items-center">
              <Text className="text-sm text-gray-500 text-center">
                등록된 정비 항목이 없습니다.
              </Text>
            </View>
          )}
          {maintenanceItemsByVehicle[vehicleId]?.map((item, idx) => (
            <Pressable
              key={item.id}
              className="p-2 bg-white active:bg-gray-200 rounded-xl border border-gray-200 my-2"
              onPress={() => onClickDetail(item.id)}
            >
              <MaintenanceItemStatus
                vehicleNowKm={vehicleInfo.nowKm}
                item={item}
              />
            </Pressable>
          ))}
          <View className="w-full">
            <Button label="새 정비 품목 추가" onPress={onAddMaintenanceItem} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
