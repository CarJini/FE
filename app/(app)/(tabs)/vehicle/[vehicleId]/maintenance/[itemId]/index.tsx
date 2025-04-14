import { ScrollView, SafeAreaView, Text, View, Pressable } from "react-native";
import { Card } from "@/src/components";
import { useRoute } from "@react-navigation/native";
import { dummyCars } from "@/src/dummydata/data";
import { MaintenanceItemStatus } from "@/src/components/vehicle";
import { MaintenanceItem } from "@/src/types";
import { router } from "expo-router";

const dummyHistories = [
  {
    id: 1,
    replacementDate: "2023-01-01",
    replaceKm: 10000,
  },
  {
    id: 2,
    replacementDate: "2023-06-01",
    replaceKm: 20000,
  },
  {
    id: 3,
    replacementDate: "2023-09-01",
    replaceKm: 30000,
  },
  {
    id: 4,
    replacementDate: "2023-12-01",
    replaceKm: 40000,
  },
  {
    id: 5,
    replacementDate: "2024-03-01",
    replaceKm: 50000,
  },
];

export default function MaintenanceDetailScreen() {
  const route = useRoute();
  const params = route.params as { vehicleId: string; itemId: string };
  const vehicleId = Number(params.vehicleId);
  const itemId = Number(params.itemId);

  const vehicleInfo = dummyCars.find((car) => car.id === vehicleId);
  const item = vehicleInfo?.maintenanceItems.find((item) => item.id === itemId);

  console.log("vehicleId, itemId", { vehicleId, itemId, vehicleInfo, item });
  function onEditMaintenance() {
    router.push(
      `/vehicle/${vehicleId}/maintenance/form?mode=edit&itemId=${itemId}`
    );
  }

  if (!vehicleInfo || !item) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 min-h-full">
        <View className="p-4">
          <MaintenanceItemComponent
            key={item.name}
            nowKm={vehicleInfo.nowKm}
            item={item}
            onPress={onEditMaintenance}
          />
          <View className="p-4 bg-white rounded-lg border border-gray-200">
            <Text className="text-lg font-bold mb-4">정비 이력</Text>
            {dummyHistories.length === 0 && (
              <Text className="mt-6 text-sm text-gray-400 text-center">
                등록된 정비 이력이 없습니다.
              </Text>
            )}
            <View className="gap-3">
              {dummyHistories
                .sort(
                  (a, b) =>
                    new Date(b.replacementDate).getTime() -
                    new Date(a.replacementDate).getTime()
                )
                .map((history) => (
                  <Card key={history.id}>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-sm font-semibold ">
                        {history.replacementDate}
                      </Text>
                      <Text className="text-sm text-blue-500">
                        {history.replaceKm.toLocaleString()} Km
                      </Text>
                    </View>
                    <Text>{item.name} 교체 완료</Text>
                  </Card>
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MaintenanceItemComponent({
  nowKm,
  item,
  onPress,
}: {
  nowKm: number;
  item: MaintenanceItem;
  onPress?: () => void;
}) {
  return (
    <View className="p-4 bg-white active:bg-gray-200 rounded-xl border border-gray-200 my-2">
      <MaintenanceItemStatus vehicleNowKm={nowKm} item={item} />
      <View className="flex-row flex-1 justify-between gap-2">
        <Pressable
          className={`flex-1 p-3 rounded-lg mt-3 bg-blue-500 active:bg-blue-300`}
          onPress={onPress}
        >
          <Text className={`text-center text-white`}>품목 수정</Text>
        </Pressable>
        <Pressable
          className={`flex-1 p-3 rounded-lg mt-3 bg-blue-500 active:bg-blue-300`}
        >
          <Text className={`text-center text-white`}>이력 추가</Text>
        </Pressable>
      </View>
    </View>
  );
}
