import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  RefreshControl,
} from "react-native";
import { MaintenanceItemStatus } from "@/src/components/vehicle";
import { Button } from "@/src/components";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import {
  MaintenanceItemResponse,
  MaintenanceItemStatusType,
  VehicleModel,
} from "@/src/types";
import { useCallback, useLayoutEffect, useState } from "react";
import {
  Tab,
  TabBar,
  Text as KittenText,
  Divider,
} from "@ui-kitten/components";
import { useVehicleStore } from "@/src/store";

const statuses = ["점검 필요", "정상", "예상"] as const;
const statusMap: Record<MaintenanceItemStatusType, string> = {
  "점검 필요": "점검 필요",
  정상: "정상",
  예상: "예상",
};

// 차량 관리
export default function VehicleListScreen() {
  const myVehicles = useVehicleStore((state) => state.myVehicles);
  const fetchMyVehicles = useVehicleStore((state) => state.fetchMyVehicles);
  const maintenanceItemsByVehicle = useVehicleStore(
    (state) => state.maintenanceItemsByVehicle
  );
  const fetchMaintenanceItems = useVehicleStore(
    (state) => state.fetchMaintenanceItems
  );
  const [selectedStatusByVehicle, setSelectedStatusByVehicle] = useState<
    Record<number, number>
  >({});

  function onSelectStatus(vehicleId: number, statusIndex: number) {
    setSelectedStatusByVehicle((prev) => ({
      ...prev,
      [vehicleId]: statusIndex,
    }));
  }

  useFocusEffect(
    useCallback(() => {
      fetchMyVehicles();
    }, [])
  );

  useLayoutEffect(() => {
    myVehicles.forEach((vehicle) => {
      fetchMaintenanceItems(vehicle.id);
    });
  }, [myVehicles]);

  function onClickAddVehicle() {
    router.push("/vehicle/vehicle-add-step1");
  }

  return (
    <SafeAreaView className="flex-1 justify-center">
      <ScrollView
        className="flex-1 min-h-full"
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              fetchMyVehicles();
            }}
          />
        }
      >
        {myVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            maintenanceItems={maintenanceItemsByVehicle[vehicle.id] || []}
            selectedStatus={selectedStatusByVehicle[vehicle.id] || 0}
            onSelectStatus={(index) => onSelectStatus(vehicle.id, index)}
          />
        ))}
        {myVehicles.length === 0 && (
          <View className="flex-1 items-center justify-center">
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
        <View className="w-full p-4">
          <Button
            label={myVehicles.length === 0 ? "차량 등록" : "차량 추가 등록"}
            onPress={onClickAddVehicle}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function VehicleCard({
  vehicle,
  maintenanceItems,
  selectedStatus,
  onSelectStatus,
}: {
  vehicle: VehicleModel;
  maintenanceItems: MaintenanceItemResponse[];
  selectedStatus: number;
  onSelectStatus: (index: number) => void;
}) {
  function onClickVehicle() {
    router.push(`/vehicle/vehicle-edit?vehicleId=${vehicle.id}`);
  }

  function onClickMaintenanceItems() {
    router.push(`/vehicle/maintenance-items?vehicleId=${vehicle.id}`);
  }

  function onClickMaintenanceItem(item: MaintenanceItemResponse) {
    router.push(
      `/vehicle/maintenance-item-detail?vehicleId=${vehicle.id}&itemId=${item.id}`
    );
  }

  const itemStatusCount = maintenanceItems.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {
      "점검 필요": 0,
      정상: 0,
      예상: 0,
    }
  );

  const filteredMaintenanceItems = maintenanceItems.filter(
    (item) => item.status === statuses[selectedStatus]
  );

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

      <View className="bg-white rounded-lg p-4 border border-gray-200 mt-2">
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
          onSelect={(index) => onSelectStatus(index)}
        >
          {statuses.map((status) => (
            <Tab
              key={`${vehicle.id}-${status}`}
              title={() => (
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
        {filteredMaintenanceItems.map((item, idx) => (
          <View key={item.id}>
            <Pressable
              className="active:bg-gray-200 rounded-lg"
              onPress={() => onClickMaintenanceItem(item)}
            >
              <MaintenanceItemStatus vehicleNowKm={vehicle.nowKm} item={item} />
            </Pressable>
            {idx !== maintenanceItems.length - 1 && (
              <Divider style={styles.dividerMargin} />
            )}
          </View>
        ))}
        {filteredMaintenanceItems.length === 0 && (
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
