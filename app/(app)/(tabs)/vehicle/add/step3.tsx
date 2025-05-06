import { Button, Card, InputBox } from "@/src/components";
import { apiClient } from "@/src/services/api";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { useVehicleStore } from "@/src/store";
import { Datepicker } from "@ui-kitten/components";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, SafeAreaView, ScrollView, View } from "react-native";

export default function VehicleAddStep3Screen() {
  const vehicleData = useVehicleStore((state) => state.vehicleData);
  const updateVehicleData = useVehicleStore((state) => state.updateVehicleData);
  const resetVehicleData = useVehicleStore((state) => state.resetVehicleData);
  const [tempDate, setTempDate] = useState<Date | null>(vehicleData.startDate);

  useEffect(() => {
    return () => {
      resetVehicleData();
    };
  }, []);

  useEffect(() => {
    if (tempDate) {
      updateVehicleData((prev) => ({ ...prev, startDate: tempDate }));
    }
  }, [tempDate]);

  async function onAdd() {
    try {
      const { method, url } = API_ENDPOINTS.VEHICLE.CREATE;
      const res = await apiClient.request({
        method,
        url,
        data: {
          carId: vehicleData.id,
          startDate: vehicleData.startDate,
          startKm: vehicleData.startKm,
          nowKm: vehicleData.nowKm,
        },
      });
      if (res.status === 200) {
        router.push("/vehicle");
      }
    } catch (error) {
      console.error("Error adding vehicle", error);
    }
  }

  function onChangeInput(key: string, value: string | number | Date) {
    if (key === "startDate") {
      value = new Date(value);
    } else if (key === "startKm" || key === "nowKm") {
      value = Number(value);
    }

    updateVehicleData((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Card>
            <Text className="mb-3 text-2xl font-bold">기본 정보</Text>
            <InputBox
              label={"제조사"}
              value={vehicleData.maker}
              readOnly={true}
            />
            <InputBox
              label={"차종"}
              value={vehicleData.model}
              readOnly={true}
            />
            <InputBox
              label={"차량 별명"}
              value={vehicleData.name}
              onChangeText={(nextValue) => onChangeInput("name", nextValue)}
            />
            <Datepicker
              label={"차량 등록일"}
              style={{
                marginVertical: 8,
              }}
              date={tempDate}
              onSelect={(nextValue) => setTempDate(nextValue)}
            />
            <InputBox
              label={"시작 주행 거리"}
              keyboardType="numeric"
              value={vehicleData.startKm.toString()}
              onChangeText={(nextValue) => onChangeInput("startKm", nextValue)}
            />
            <InputBox
              label={"지금 주행 거리"}
              keyboardType="numeric"
              value={vehicleData.nowKm.toString()}
              onChangeText={(nextValue) => onChangeInput("nowKm", nextValue)}
            />
            <Button label="차량 등록하기" onPress={onAdd} />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
