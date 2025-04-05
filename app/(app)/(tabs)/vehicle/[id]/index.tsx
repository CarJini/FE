import { ScrollView, SafeAreaView, Text, View } from "react-native";
import React from "react";
import { FloatingButton } from "@/src/components";
import { useRoute } from "@react-navigation/native";
import { dummyCars } from "@/src/dummydata/data";
import { ConsumableStatus } from "@/src/components/vehicle";
import { Divider, Input } from "@ui-kitten/components";

export default function VehicleInfoScreen() {
  const route = useRoute();
  const { id } = route.params;
  const vehicleInfo = dummyCars.find((car) => car.id === id);

  if (!vehicleInfo) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="p-4 mb-2">
          <Text className="text-xl font-bold mb-3">차량 정보</Text>
          <View className="items-center gap-y-2">
            {Object.entries(vehicleInfo).map(([key, value]) => {
              if (key === "consumables" || !value) return null;
              return (
                <Input key={key} label={key} value={value} readOnly={true} />
              );
            })}
          </View>
        </View>
        <Divider />
        <View className="p-4">
          <Text className="text-xl font-bold mb-3">차량 소모품 현황</Text>
          {vehicleInfo?.consumables?.map((consumable) => (
            <ConsumableStatus key={consumable.id} consumable={consumable} />
          ))}
        </View>
      </ScrollView>
      <FloatingButton label={"+"} />
    </SafeAreaView>
  );
}
