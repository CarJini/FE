import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import { MaintenanceItemStatus } from "@/src/components/vehicle";
import { Button } from "@/src/components";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { dummyCars } from "@/src/dummydata/data";
import {
  MaintenanceItem,
  MaintenanceItemStatusType,
  VehicleModel,
} from "@/src/types";
import { useEffect, useState } from "react";
import {
  Tab,
  TabBar,
  Text as KittenText,
  Divider,
} from "@ui-kitten/components";
import { useVehicleAdd } from "@/src/context";

const statuses = ["교체 필요", "양호", "주의"] as const;
const statusMap: Record<MaintenanceItemStatusType, string> = {
  "교체 필요": "점검 필요",
  양호: "정상",
  주의: "예정",
};

export default function VehicleScreen() {
  const { myVehicles, fetchMyVehicles } = useVehicleAdd();

  useEffect(() => {
    fetchMyVehicles();
  }, []);

  function onClickAddVehicle() {
    router.push("/vehicle/add/step1");
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 min-h-full">
        {myVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
        {dummyCars.length === 0 && (
          <View className="items-center justify-center">
            <View className="w-[80px] h-[80px] rounded-lg bg-slate-300 justify-center items-center mb-4">
              <Ionicons name="car" size={32} />
            </View>
            <Text className="text-xl font-bold mb-2">
              등록된 차량이 없습니다.
            </Text>
            <Text className="text-gray-600 opacity-80">
              차량을 등록하고 관리해보세요.
            </Text>
          </View>
        )}
        {/* TODO: 버튼 하단에 붙이기 */}
        <View className="w-full p-4">
          <Button
            label={dummyCars.length === 0 ? "차량 등록" : "차량 추가 등록"}
            onPress={onClickAddVehicle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function VehicleCard({ vehicle }: { vehicle: VehicleModel }) {
  const { maintenanceItemsByVehicle, fetchMaintenanceItems } = useVehicleAdd();
  const [selectedStatus, setSelectedStatus] = useState(0);

  useEffect(() => {
    fetchMaintenanceItems(vehicle.id);
  }, []);

  function onClickVehicle() {
    router.push(`/vehicle/${vehicle.id}/edit`);
  }

  function onClickMaintenanceItems() {
    router.push(`/vehicle/${vehicle.id}/maintenance/items`);
  }

  function onClickMaintenanceItem(item: MaintenanceItem) {
    router.push(`/vehicle/${vehicle.id}/maintenance/${item.id}`);
  }

  const itemStatusCount = {
    "교체 필요": 0,
    양호: 0,
    주의: 0,
  };

  // const itemStatusCount = vehicle.maintenanceItems.reduce(
  //   (acc, item) => {
  //     acc[item.status] = (acc[item.status] || 0) + 1;
  //     return acc;
  //   },
  //   {
  //     danger: 0,
  //     good: 0,
  //     warning: 0,
  //   }
  // );

  // const maintenanceItems = vehicle.maintenanceItems.filter(
  //   (item) => item.status === statuses[selectedStatus]
  // );

  return (
    <View className="p-4">
      <Pressable
        className="bg-white active:bg-gray-100 rounded-lg p-4 border border-gray-200"
        onPress={onClickVehicle}
      >
        <View className="flex-row items-center">
          <Image
            source={{ uri: vehicle.image }}
            className="w-[70px] h-[70px] rounded-lg mr-4"
          />
          <View className="flex-1">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-lg font-bold mb-1">{vehicle.model}</Text>
              </View>
              <View>
                <Text className="bg-gray-100 px-2 py-1.5 rounded-lg text-blue-500">
                  {vehicle.nowKm.toLocaleString()}km
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>

      <View className="bg-white rounded-lg p-4 border border-gray-200 mt-4">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-lg font-bold">차량 정비 현황</Text>
          <Pressable className="" onPress={onClickMaintenanceItems}>
            {({ pressed }) => (
              <Text className={pressed ? "text-blue-300" : "text-blue-500"}>
                전체 보기 {">"}
              </Text>
            )}
          </Pressable>
        </View>
        <TabBar
          selectedIndex={selectedStatus}
          onSelect={(index) => setSelectedStatus(index)}
        >
          {statuses.map((status) => (
            <Tab
              key={status}
              title={(_) => (
                <View className="flex-1 items-center justify-center">
                  <KittenText
                    style={{
                      fontSize: 18,
                      fontWeight: "heavy",
                    }}
                    status={
                      selectedStatus === statuses.indexOf(status)
                        ? "primary"
                        : "basic"
                    }
                  >
                    {itemStatusCount[status]}
                  </KittenText>

                  <KittenText
                    style={{
                      fontSize: 14,
                      marginTop: 3,
                      marginBottom: 8,
                    }}
                    status={
                      selectedStatus === statuses.indexOf(status)
                        ? "primary"
                        : "basic"
                    }
                  >
                    {statusMap[status]}
                  </KittenText>
                </View>
              )}
            />
          ))}
        </TabBar>
        <Divider style={styles.dividerMargin} />
        {maintenanceItemsByVehicle[vehicle.id]?.map((item, idx) => (
          <View key={item.id}>
            <Pressable
              className="active:bg-gray-200 rounded-lg"
              onPress={() => onClickMaintenanceItem(item)}
            >
              <MaintenanceItemStatus vehicleNowKm={vehicle.nowKm} item={item} />
            </Pressable>
            {idx !== maintenanceItemsByVehicle[vehicle.id].length - 1 && (
              <Divider style={styles.dividerMargin} />
            )}
          </View>
        ))}
        {maintenanceItemsByVehicle[vehicle.id]?.length === 0 && (
          <View className="flex-row items-center justify-center py-4">
            <Text className="text-gray-400 text-sm">점검 항목이 없습니다.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dividerMargin: {
    marginVertical: 4,
  },
});
