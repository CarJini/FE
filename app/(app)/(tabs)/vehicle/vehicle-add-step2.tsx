import { Card } from "@/src/components";
import { useSafeBackRedirect } from "@/src/hooks";
import { useVehicleStore } from "@/src/store";
import { Card as KittenCard } from "@ui-kitten/components";
import { router } from "expo-router";
import { SafeAreaView, ScrollView, Text } from "react-native";

export default function VehicleAddStep2Screen() {
  const vehicleData = useVehicleStore((state) => state.vehicleData);
  const updateVehicleData = useVehicleStore((state) => state.updateVehicleData);
  const vehicleModels = useVehicleStore((state) => state.vehicleModels);

  useSafeBackRedirect("/vehicle/vehicle-list");

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
    router.push("/vehicle/vehicle-add-step3");
  }

  return (
    <SafeAreaView className=" flex-1">
      <ScrollView className="flex-1 p-4">
        <Card>
          <Text className="mb-3 text-2xl font-bold">차종 선택</Text>
          <Text className="h7 mb-5 text-lg text-gray-700">
            보유하신 차종을 선택해주세요.
          </Text>
          {models.map((car) => (
            <KittenCard
              key={car.id}
              status="primary"
              onPress={() =>
                onClickCarModel({ modelId: car.id, model: car.model })
              }
              style={{
                marginVertical: 4,
                backgroundColor: "#fff",
              }}
            >
              <Text>{car.model}</Text>
            </KittenCard>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
