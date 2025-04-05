import { ConsumableStatusType, Vehicle } from "@/src/types";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { ConsumableStatus } from "./ConsumableStatus";
import { useState } from "react";
import {
  Divider,
  Tab,
  TabBar,
  Text as KittenText,
} from "@ui-kitten/components";
import { router } from "expo-router";

const statuses = ["danger", "good", "warning"] as const;
const statusMap: Record<ConsumableStatusType, string> = {
  danger: "점검 필요",
  good: "정상",
  warning: "예정",
};
export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [selectedStatus, setSelectedStatus] = useState(0);

  function onClickVehicle() {
    router.push(`/vehicle/${vehicle.id}`);
  }

  const consumableStatusCount = vehicle.consumables.reduce(
    (acc, consumable) => {
      acc[consumable.status] = (acc[consumable.status] || 0) + 1;
      return acc;
    },
    {
      danger: 0,
      good: 0,
      warning: 0,
    }
  );

  const consumables = vehicle.consumables.filter(
    (consumable) => consumable.status === statuses[selectedStatus]
  );

  return (
    <View className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
      <View>
        <Pressable onPress={onClickVehicle}>
          <View className="flex-row items-center">
            <Image
              source={{ uri: vehicle.image }}
              className="w-[70px] h-[70px] rounded-lg mr-4"
            />
            <View className="flex-1">
              <View className="flex-row justify-between items-center">
                <View>
                  <Text className="text-lg font-bold mb-1">{vehicle.name}</Text>
                  <Text className="text-sm text-gray-600 mb-2">
                    {vehicle.model} ({vehicle.year})
                  </Text>
                </View>
                <View>
                  <Text className="bg-gray-100 px-2 py-1.5 rounded-lg text-blue-500">
                    {vehicle.distance.toLocaleString()}km
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>

        <Divider style={styles.dividerMargin} />

        <TabBar
          selectedIndex={selectedStatus}
          onSelect={(index) => setSelectedStatus(index)}
        >
          {statuses.map((status) => (
            <Tab
              key={status}
              title={(evaProps) => (
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
                    {consumableStatusCount[status]}
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
      </View>

      <View>
        {consumables.map((consumable, idx) => (
          <Pressable key={consumable.id} onPress={onClickVehicle}>
            <ConsumableStatus consumable={consumable} />
            {idx !== vehicle.consumables.length - 1 && (
              <Divider style={styles.dividerMargin} />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dividerMargin: {
    marginVertical: 4,
  },
});
