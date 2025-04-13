import { Card } from "@/src/components";
import { useVehicleAdd } from "@/src/context";
import { router } from "expo-router";
import { Card as KittenCard } from "@ui-kitten/components";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { VehicleModel } from "@/src/types";

type VehicleMaker = {
  brand: string;
  disabled: boolean;
  models: VehicleModel[];
};

export default function VehicleAddStep1Screen() {
  const { vehicleData, updateVehicleData, vehicleModels } = useVehicleAdd();

  function onClickMaker(maker: string) {
    updateVehicleData({ ...vehicleData, maker });
    router.push("/vehicle/add/step2");
  }
  const vehicleMakers: VehicleMaker[] = [];
  vehicleModels.forEach((model) => {
    const existingMaker = vehicleMakers.find(
      (maker) => maker.brand === model.brand
    );

    if (existingMaker) {
      existingMaker.models.push(model);
    } else {
      vehicleMakers.push({
        brand: model.brand,
        disabled: false,
        models: [model],
      });
    }
  });

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Card>
          <Text className="mb-3 text-2xl font-bold">제조사 선택</Text>
          <Text className="h7 mb-5 text-lg text-gray-700">
            보유하신 차량의 제조사를 선택해주세요.
          </Text>
          {vehicleMakers.map((maker) => (
            <KittenCard
              key={maker.brand}
              status={maker.disabled ? "basic" : "primary"}
              disabled={maker.disabled}
              onPress={() => onClickMaker(maker.brand)}
              style={{
                marginVertical: 4,
                backgroundColor: maker.disabled ? "#f0f0f0" : "#fff",
              }}
            >
              <Text>{maker.brand}</Text>
            </KittenCard>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
