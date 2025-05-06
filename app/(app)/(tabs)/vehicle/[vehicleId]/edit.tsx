import { ScrollView, SafeAreaView, View } from "react-native";
import { Button, Card, InputBox } from "@/src/components";
import { useRoute } from "@react-navigation/native";
import { useVehicleAdd } from "@/src/context";
import { toNumber } from "@/src/utils";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";
import { router } from "expo-router";

const skipInputNames = ["id"];
const readOnlyNames = ["image", "brand", "model"];
export default function VehicleEditScreen() {
  const { myVehicles, vehicleModels, fetchCarModels } = useVehicleAdd();
  const route = useRoute();
  const { vehicleId } = route.params as { vehicleId: string };
  const vehicleInfo = myVehicles.find(
    (vehicle) => vehicle.id === toNumber(vehicleId)
  );
  const [vehicleData, setVehicleData] = useState(vehicleInfo);

  useEffect(() => {
    if (vehicleModels.length === 0) {
      fetchCarModels();
    }
  }, []);

  async function onSave() {
    if (!vehicleData) return;
    console.log("save", {
      vehicleModels,
      vehicleData,
      find: vehicleModels.find(
        (vehicle) =>
          vehicle.brand === vehicleData.brand &&
          vehicle.model === vehicleData.model
      ),
    });
    const carId = vehicleModels.find(
      (vehicle) =>
        vehicle.brand === vehicleData.brand &&
        vehicle.model === vehicleData.model
    )?.id;
    if (!carId) {
      console.error("Car ID not found");
      return;
    }
    try {
      const { method, url } = API_ENDPOINTS.VEHICLE.UPDATE;
      const res = await apiClient.request({
        method,
        url: url.replace("{carOwnerId}", vehicleData.id.toString()),
        data: {
          carId,
          startDate: vehicleData.startDate,
          startKm: vehicleData.startKm,
          nowKm: vehicleData.nowKm,
        },
      });
      if (res.status === 200) {
        router.push("/vehicle");
      }
    } catch (error) {
      console.error("Error deleting vehicle", error);
    }
  }

  async function onDelete() {
    if (!vehicleData) return;

    try {
      const { method, url } = API_ENDPOINTS.VEHICLE.DELETE;
      const res = await apiClient.request({
        method,
        url: url.replace("{carOwnerId}", vehicleData.id.toString()),
      });
      if (res.status === 200) {
        router.push("/vehicle");
      }
    } catch (error) {
      console.error("Error deleting vehicle", error);
    }
  }

  function onChangeInput(key: string, value: string | number | Date) {
    if (!vehicleData) return;
    if (key === "startDate") {
      value = new Date(value);
    } else if (key === "startKm" || key === "nowKm") {
      value = Number(value);
    }

    setVehicleData({
      ...vehicleData,
      [key]: value,
      id: vehicleData.id,
    });
  }

  if (!vehicleData) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Card>
            <View className="items-center gap-y-2">
              {Object.entries(vehicleData).map(([key, value]) => {
                if (
                  skipInputNames.includes(key) ||
                  value === undefined ||
                  value === null
                )
                  return null;
                return (
                  <InputBox
                    key={key}
                    label={key}
                    value={value.toString()}
                    onChangeText={(value) => onChangeInput(key, value)}
                    readOnly={readOnlyNames.includes(key)}
                  />
                );
              })}
            </View>
            <Button label="삭제" color="secondary" onPress={onDelete} />
            <Button label="저장" onPress={onSave} />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
