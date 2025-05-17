import { Card, IconButton, ScreenLayout } from "@/src/components";
import { modelImageMap } from "@/src/constants";
import { useSafeBackRedirect } from "@/src/hooks";
import { useVehicleStore } from "@/src/store";
import { Card as KittenCard } from "@ui-kitten/components";
import { router } from "expo-router";
import { Text, Image, View } from "react-native";

export default function VehicleAddStep2Screen() {
  const vehicleData = useVehicleStore((state) => state.vehicleData);
  const updateVehicleData = useVehicleStore((state) => state.updateVehicleData);
  const vehicleModels = useVehicleStore((state) => state.vehicleModels);

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

  useSafeBackRedirect(onBackPress);

  function onBackPress() {
    router.replace(`/vehicle/vehicle-list`);
  }

  return (
    <ScreenLayout
      headerTitle="차량 등록"
      LeftHeader={<IconButton iconName="home" onPress={onBackPress} />}
    >
      <Card>
        <Text className="mb-3 text-2xl font-bold">차종 선택</Text>
        <Text className="h7 mb-5 text-lg text-gray-700">
          보유하신 차종을 선택해주세요.
        </Text>
        {models.map((car) => (
          <KittenCard
            key={car.id}
            onPress={() =>
              onClickCarModel({ modelId: car.id, model: car.model })
            }
            style={{
              marginVertical: 4,
              backgroundColor: "#fff",
            }}
          >
            <View className="flex-row items-center">
              <Image
                source={modelImageMap[car.model]}
                style={{
                  width: 100,
                  height: 50,
                  resizeMode: "contain",
                }}
              />
              <Text>{car.model}</Text>
            </View>
          </KittenCard>
        ))}
      </Card>
    </ScreenLayout>
  );
}
