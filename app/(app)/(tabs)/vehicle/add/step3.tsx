import { useVehicleAdd } from "@/src/context";
import { FuelType } from "@/src/types";
import { Card } from "@ui-kitten/components";
import { router } from "expo-router";
import { SafeAreaView, View, Text } from "react-native";

const fuelTypes: {
  name: FuelType;
  disabled: boolean;
}[] = [
  { name: "가솔린", disabled: false },
  { name: "디젤", disabled: false },
  { name: "전기", disabled: true },
  { name: "하이브리드", disabled: true },
];
export default function VehicleAddStep3Screen() {
  const { vehicleData, updateVehicleData } = useVehicleAdd();

  function onClickFuelType(fuelType: FuelType) {
    updateVehicleData({ ...vehicleData, fuelType });
    router.push("/vehicle/add/step4");
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="p-4">
        <Text className="mb-3 text-2xl font-bold">유종 선택</Text>
        <Text className="h7 mb-5 text-lg text-gray-700">
          보유하신 차량의 유종을 선택해주세요.
        </Text>
        {fuelTypes.map((fuelType) => (
          <Card
            key={fuelType.name}
            status={fuelType.disabled ? "basic" : "primary"}
            disabled={fuelType.disabled}
            onPress={() => onClickFuelType(fuelType.name)}
            style={{
              marginVertical: 4,
              backgroundColor: fuelType.disabled ? "#f0f0f0" : "#fff",
            }}
          >
            <Text>{fuelType.name}</Text>
          </Card>
        ))}
      </View>
    </SafeAreaView>
  );
}
