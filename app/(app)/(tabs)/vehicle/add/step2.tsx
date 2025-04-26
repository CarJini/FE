import { Card } from "@/src/components";
import { useVehicleAdd } from "@/src/context";
import { Card as KittenCard } from "@ui-kitten/components";
import { router } from "expo-router";
import { SafeAreaView, ScrollView, Text } from "react-native";

export default function VehicleAddStep2Screen() {
  const { vehicleData, updateVehicleData, vehicleModels } = useVehicleAdd();

  const models = vehicleModels.filter(
    (model) => model.brand === vehicleData.maker
  );

  function onClickCarModel({
    modelId,
    model,
  }: {
    modelId: number;
    model: string;
  }) {
    updateVehicleData({ ...vehicleData, id: modelId, model });
    router.push("/vehicle/add/step3");
  }

  return (
    <SafeAreaView className=" flex-1">
      <ScrollView className="flex-1 p-4">
        <Card>
          <Text className="mb-3 text-2xl font-bold">차종 선택</Text>
          <Text className="h7 mb-5 text-lg text-gray-700">
            보유하신 차량의 모델을 선택해주세요.
          </Text>
          {models.map((car) => (
            <KittenCard
              key={car.id}
              status="primary"
              // status={car.disabled ? "basic" : "primary"}
              // disabled={car.disabled}
              onPress={() =>
                onClickCarModel({ modelId: car.id, model: car.model })
              }
              style={{
                marginVertical: 4,
                // backgroundColor: car.disabled ? "#f0f0f0" : "#fff",
                backgroundColor: "#fff",
              }}
            >
              <Text>
                {car.model} (id: {car.id})
              </Text>
            </KittenCard>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
