import { ScrollView, SafeAreaView, Text, View, Pressable } from "react-native";
import { Button } from "@/src/components";
import { useRoute } from "@react-navigation/native";
import { dummyCars } from "@/src/dummydata/data";
import { MaintenanceItemStatus } from "@/src/components/vehicle";
import { router } from "expo-router";
import { MaintenanceItem } from "@/src/types";

export default function MaintenanceItemsScreen() {
  const route = useRoute();
  const params = route.params as { vehicleId: string };
  const vehicleId = Number(params.vehicleId);
  const vehicleInfo = dummyCars.find((car) => car.id === vehicleId);

  function onAddMaintenance() {
    router.push(`/vehicle/${vehicleId}/maintenance/form?mode=add`);
  }

  function onClickMaintenanceItem(itemId: string) {
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
            {vehicleInfo.name} 차량 정비 현황
          </Text>
          <Text className="text-sm mt-2 mb-4">
            차량에 등록된 정비 내역입니다. 정비를 위한 품목을 추가하거나 교체
            이력을 확인할 수 있습니다.
          </Text>
          {vehicleInfo?.maintenanceItems.length === 0 && (
            <Text className="text-sm text-gray-500 text-center">
              등록된 정비 항목이 없습니다.
            </Text>
          )}
          {vehicleInfo?.maintenanceItems.map((item, idx) => (
            <Pressable
              key={item.name}
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
