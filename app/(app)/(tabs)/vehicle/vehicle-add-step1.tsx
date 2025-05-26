import { Card, IconButton, ScreenLayout } from "@/src/components";
import { router } from "expo-router";
import { Card as KittenCard } from "@ui-kitten/components";
import { Text } from "react-native";
import { VehicleModel } from "@/src/types";
import { useEffect } from "react";
import { useVehicleStore } from "@/src/store";
import { useSafeBackRedirect } from "@/src/hooks";
import { brandLogoMap, BrandName } from "@/src/constants";

type VehicleMaker = {
  brand: string;
  disabled: boolean;
  models: VehicleModel[];
};

export default function VehicleAddStep1Screen() {
  const fetchCarModels = useVehicleStore((state) => state.fetchCarModels);
  const vehicleData = useVehicleStore((state) => state.vehicleData);
  const updateVehicleData = useVehicleStore((state) => state.updateVehicleData);
  const vehicleModels = useVehicleStore((state) => state.vehicleModels);

  useEffect(() => {
    fetchCarModels();
  }, []);

  function onClickMaker(maker: string) {
    updateVehicleData({ ...vehicleData, maker });
    router.push("/vehicle/vehicle-add-step2");
  }

  const vehicleMakers: VehicleMaker[] = [];
  vehicleModels.forEach((model) => {
    const existingMaker = vehicleMakers.find(
      (maker) => maker.brand === model.brand
    );

    if (existingMaker) {
      existingMaker.models.push(model);
    } else {
      vehicleMakers.push({
        brand: model.brand,
        disabled: false,
        models: [model],
      });
    }
  });

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
        <Text className="mb-3 text-2xl font-bold">제조사 선택</Text>
        <Text className="h7 mb-5 text-lg text-gray-700">
          보유하신 차량의 제조사를 선택해주세요.
        </Text>
        {vehicleMakers.map((maker) => (
          <KittenCard
            key={maker.brand}
            disabled={maker.disabled}
            onPress={() => onClickMaker(maker.brand)}
            style={{
              marginVertical: 4,
              backgroundColor: maker.disabled ? "#f0f0f0" : "#fff",
              alignItems: "center",
            }}
          >
            {(() => {
              const BrandLogo = brandLogoMap[maker.brand as BrandName];
              return BrandLogo ? (
                <BrandLogo width={150} height={50} />
              ) : (
                <Text>{maker.brand}</Text>
              );
            })()}
          </KittenCard>
        ))}
      </Card>
    </ScreenLayout>
  );
}
