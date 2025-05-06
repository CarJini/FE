import { ScrollView, SafeAreaView, Text, View, Pressable } from "react-native";
import { Button } from "@/src/components";
import { useRoute } from "@react-navigation/native";
import { MaintenanceItemStatus } from "@/src/components/vehicle";
import { router } from "expo-router";
import { useEffect } from "react";
import { useVehicleStore } from "@/src/store";

export default function MaintenanceItemsScreen() {
  const myVehicles = useVehicleStore((state) => state.myVehicles);
  const maintenanceItemsByVehicle = useVehicleStore(
    (state) => state.maintenanceItemsByVehicle
  );
  const fetchMaintenanceItems = useVehicleStore(
    (state) => state.fetchMaintenanceItems
  );
  const route = useRoute();
  const params = route.params as { vehicleId: string };
  const vehicleId = Number(params.vehicleId);
  const vehicleInfo = myVehicles.find((vehicle) => vehicle.id === vehicleId);

  useEffect(() => {
    if (
      !maintenanceItemsByVehicle[vehicleId] ||
      maintenanceItemsByVehicle[vehicleId].length === 0
    ) {
      fetchMaintenanceItems(vehicleId);
    }
  }, [vehicleId]);

  function onAddMaintenance() {
    router.push(`/vehicle/${vehicleId}/maintenance/form?mode=add`);
  }

  function onClickMaintenanceItem(itemId: number) {
    router.push(`/vehicle/${vehicleId}/maintenance/${itemId}?mode=edit`);
  }

  if (!vehicleInfo) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="text-xl font-bold">
            {vehicleInfo.model} 차량 정비 현황
          </Text>
          <Text className="text-sm mt-2 mb-4">
            차량에 등록된 정비 내역입니다. 정비를 위한 품목을 추가하거나 교체
            이력을 확인할 수 있습니다.
          </Text>
          {maintenanceItemsByVehicle[vehicleId]?.length === 0 && (
            <Text className="text-sm text-gray-500 text-center">
              등록된 정비 항목이 없습니다.
            </Text>
          )}
          {maintenanceItemsByVehicle[vehicleId]?.map((item, idx) => (
            <Pressable
              key={item.id}
              className="p-2 bg-white active:bg-gray-200 rounded-xl border border-gray-200 my-2"
              onPress={() => onClickMaintenanceItem(item.id)}
            >
              <MaintenanceItemStatus
                vehicleNowKm={vehicleInfo.nowKm}
                item={item}
              />
            </Pressable>
          ))}
          <View className="w-full">
            <Button label="새 정비 품목 추가" onPress={onAddMaintenance} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
