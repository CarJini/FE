import { Button, Card, InputBox } from "@/src/components";
import { useVehicleAdd } from "@/src/context";
import apiClient from "@/src/services/api";
import { router } from "expo-router";
import { Text, SafeAreaView, ScrollView } from "react-native";

export default function VehicleAddStep4Screen() {
  const { vehicleData, updateVehicleData } = useVehicleAdd();

  async function onAdd() {
    try {
      const res = await apiClient.post("/api/car-owner", {
        carId: vehicleData.id,
        startDate: vehicleData.startDate,
        startKm: vehicleData.startKm,
        nowKm: vehicleData.nowKm,
      });
      router.push("/vehicle");
    } catch (error) {
      console.error("Error adding vehicle", error);
    }
  }

  function onChangeInput(key: string, value: string) {
    updateVehicleData({ ...vehicleData, [key]: value });
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Card>
          <Text className="mb-3 text-2xl font-bold">기본 정보</Text>
          <InputBox
            label={"제조사"}
            value={vehicleData.maker}
            disabled={true}
          />
          <InputBox label={"차종"} value={vehicleData.model} disabled={true} />
          <InputBox
            label={"유종"}
            value={vehicleData.fuelType}
            disabled={true}
          />
          <InputBox
            label={"차량 별명"}
            value={vehicleData.name}
            onChangeText={(nextValue) => onChangeInput("name", nextValue)}
          />
          <InputBox
            label={"구매 일자"}
            value={vehicleData.startDate.toString()}
            onChangeText={(nextValue) => onChangeInput("startDate", nextValue)}
          />
          <InputBox
            label={"시작 주행 거리"}
            value={vehicleData.startKm.toString()}
            onChangeText={(nextValue) => onChangeInput("startKm", nextValue)}
          />
          <InputBox
            label={"지금 주행 거리"}
            value={vehicleData.nowKm.toString()}
            onChangeText={(nextValue) => onChangeInput("nowKm", nextValue)}
          />
          <Button label="차량 등록하기" onPress={onAdd} />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
