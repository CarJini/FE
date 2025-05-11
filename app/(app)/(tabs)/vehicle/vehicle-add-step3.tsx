import {
  Button,
  Card,
  DateInput,
  IconButton,
  InputBox,
  ScreenLayout,
} from "@/src/components";
import { apiClient } from "@/src/services/api";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { useVehicleStore } from "@/src/store";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { useSafeBackRedirect } from "@/src/hooks";
import Toast from "react-native-toast-message";

export default function VehicleAddStep3Screen() {
  const currentVehicle = useVehicleStore((state) => state.vehicleData);
  const updateVehicleData = useVehicleStore((state) => state.updateVehicleData);
  const resetVehicleData = useVehicleStore((state) => state.resetVehicleData);

  useEffect(() => {
    return () => {
      resetVehicleData();
    };
  }, []);

  async function onSave() {
    const { method, url } = API_ENDPOINTS.VEHICLE.CREATE;
    try {
      const res = await apiClient.request({
        method,
        url,
        data: {
          carId: currentVehicle.id,
          startDate: currentVehicle.startDate,
          startKm: currentVehicle.startKm,
          nowKm: currentVehicle.nowKm,
        },
      });
      if (res.status === 200) {
        Toast.show({
          type: "success",
          text1: "추가 완료",
          position: "bottom",
        });
        router.push("/vehicle/vehicle-list");
      }
    } catch (error) {
      console.error("Error adding vehicle", error);
    }
  }

  function onChangeDate(date: Date) {
    updateVehicleData((prev) => ({ ...prev, startDate: date }));
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
        <Text className="mb-3 text-2xl font-bold">기본 정보</Text>
        <InputBox
          label="제조사"
          value={currentVehicle.maker}
          editable={false}
        />
        <InputBox label="차종" value={currentVehicle.model} editable={false} />
        <DateInput
          label="차량 등록일"
          date={currentVehicle.startDate}
          onChange={onChangeDate}
        />
        <Button label="차량 등록하기" onPress={onSave} />
      </Card>
    </ScreenLayout>
  );
}
