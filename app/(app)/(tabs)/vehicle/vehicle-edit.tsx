import {
  Button,
  Card,
  DateInput,
  IconButton,
  InputBox,
  ScreenLayout,
} from "@/src/components";
import { toNumber, replacePathParams } from "@/src/utils";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";
import { router } from "expo-router";
import { useVehicleStore } from "@/src/store";
import { useMaintenanceParams, useSafeBackRedirect } from "@/src/hooks";
import Toast from "react-native-toast-message";

// 차량 상세
export default function VehicleEditScreen() {
  const myVehicles = useVehicleStore((state) => state.myVehicles);
  const vehicleModels = useVehicleStore((state) => state.vehicleModels);
  const fetchCarModels = useVehicleStore((state) => state.fetchCarModels);

  const { vehicleId } = useMaintenanceParams();
  const vehicleInfo = myVehicles.find(
    (vehicle) => vehicle.id === toNumber(vehicleId)
  );
  const [currentVehicle, setCurrentVehicle] = useState(vehicleInfo);

  useEffect(() => {
    if (vehicleModels.length !== 0) return;

    fetchCarModels();
  }, []);

  async function onSave() {
    if (!currentVehicle) return;

    const carId = vehicleModels.find(
      (vehicle) =>
        vehicle.brand === currentVehicle.brand &&
        vehicle.model === currentVehicle.model
    )?.id;
    if (!carId) {
      Toast.show({
        type: "error",
        text1: "저장 실패",
        position: "bottom",
      });
      return;
    }

    const { method, url } = API_ENDPOINTS.VEHICLE.UPDATE;
    try {
      const res = await apiClient.request({
        method,
        url: replacePathParams(url, {
          carOwnerId: currentVehicle.id.toString(),
        }),
        data: {
          carId,
          startDate: currentVehicle.startDate,
          startKm: currentVehicle.startKm,
          nowKm: currentVehicle.nowKm,
        },
      });
      if (res.status === 200) {
        Toast.show({
          type: "success",
          text1: "저장 완료",
          position: "bottom",
        });

        router.push("/vehicle/vehicle-list");
      }
    } catch (error) {
      console.error("Error deleting vehicle", error);
    }
  }

  async function onDelete() {
    if (!currentVehicle) return;

    const { method, url } = API_ENDPOINTS.VEHICLE.DELETE;
    try {
      const res = await apiClient.request({
        method,
        url: replacePathParams(url, {
          carOwnerId: currentVehicle.id.toString(),
        }),
      });
      if (res.status === 200) {
        Toast.show({
          type: "success",
          text1: "삭제 완료",
          position: "bottom",
        });

        router.push("/vehicle/vehicle-list");
      }
    } catch (error) {
      console.error("Error deleting vehicle", error);
    }
  }

  function onChange(date: Date) {
    if (!currentVehicle) return;
    setCurrentVehicle({
      ...currentVehicle,
      startDate: date,
    });
  }

  useSafeBackRedirect(onBackPress);

  function onBackPress() {
    router.replace(`/vehicle/vehicle-list`);
  }

  if (!currentVehicle) {
    return null;
  }

  return (
    <ScreenLayout
      headerTitle="차량 상세"
      LeftHeader={<IconButton iconName="chevron-back" onPress={onBackPress} />}
    >
      <Card>
        <InputBox
          label="제조사"
          value={currentVehicle.brand}
          editable={false}
        />
        <InputBox label="차종" value={currentVehicle.model} editable={false} />
        <DateInput
          label="차량 등록일"
          date={currentVehicle.startDate}
          onChange={onChange}
        />
        <Button label="삭제" color="secondary" onPress={onDelete} />
        <Button label="저장" onPress={onSave} />
      </Card>
    </ScreenLayout>
  );
}
