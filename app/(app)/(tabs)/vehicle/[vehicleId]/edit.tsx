import { ScrollView, SafeAreaView, View, TextInput } from "react-native";
import { Button, Card, InputBox } from "@/src/components";
import { useRoute } from "@react-navigation/native";
import { toNumber, replacePathParams } from "@/src/utils";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";
import { router } from "expo-router";
import { useVehicleStore } from "@/src/store";

const skipInputNames = ["id"];
const readOnlyNames = ["image", "brand", "model"];

const displayNameMap: Record<string, string> = {
  brand: "브랜드",
  model: "모델명",
  image: "이미지 URL",
  startDate: "시작일",
  startKm: "시작 주행거리",
  nowKm: "현재 주행거리",
};

function getKeyboardType(value: any): "default" | "numeric" | "url" {
  if (typeof value === "number") return "numeric";
  if (typeof value === "string" && value.startsWith("http")) return "url";
  return "default";
}

export default function VehicleEditScreen() {
  const myVehicles = useVehicleStore((state) => state.myVehicles);
  const vehicleModels = useVehicleStore((state) => state.vehicleModels);
  const fetchCarModels = useVehicleStore((state) => state.fetchCarModels);

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

    const carId = vehicleModels.find(
      (vehicle) =>
        vehicle.brand === vehicleData.brand &&
        vehicle.model === vehicleData.model
    )?.id;
    if (!carId) {
      console.error("Car ID not found");
      return;
    }

    const { method, url } = API_ENDPOINTS.VEHICLE.UPDATE;
    try {
      const res = await apiClient.request({
        method,
        url: replacePathParams(url, {
          carOwnerId: vehicleData.id.toString(),
        }),
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

    const { method, url } = API_ENDPOINTS.VEHICLE.DELETE;
    try {
      const res = await apiClient.request({
        method,
        url: replacePathParams(url, {
          carOwnerId: vehicleData.id.toString(),
        }),
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
                ) {
                  return null;
                }

                return (
                  <InputBox
                    key={key}
                    label={displayNameMap[key] || key}
                    value={value.toString()}
                    onChangeText={(value) => onChangeInput(key, value)}
                    readOnly={readOnlyNames.includes(key)}
                    keyboardType={getKeyboardType(value)}
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
