import { Card } from "@/src/components";
import { useVehicleAdd } from "@/src/context";
import { Card as KittenCard } from "@ui-kitten/components";
import { router } from "expo-router";
import { SafeAreaView, ScrollView, Text } from "react-native";

/**
 * 1. 제조사 선택 현대, 기아, 르노삼성, 쉐보레 BMW, 벤츠,아우디 나오고 현대 기아만 선택가능하고 나머진 disabled
 * 2. 차종 선택 마찬가지로 백엔드에서 지원가능한거만 선택하고 나머지는 disabled
 * 3. 연료 선택
 * 4.
 * @returns
 */
// 현대 (스타리아,  그랜저 , gn7 ) 기아 ( 쏘렌토)
const carModels = [
  {
    name: "스타리아",
    makerId: 1,
    disabled: false,
  },
  {
    name: "소나타",
    makerId: 1,
    disabled: true,
  },
  {
    name: "gn7",
    makerId: 2,
    disabled: false,
  },
  {
    name: "쏘렌토",
    makerId: 2,
    disabled: false,
  },
  {
    name: "K5",
    makerId: 2,
    disabled: true,
  },
  {
    name: "K7",
    makerId: 2,
    disabled: true,
  },
  {
    name: "K9",
    makerId: 2,
    disabled: true,
  },
  {
    name: "K3",
    makerId: 2,
    disabled: true,
  },
];
export default function VehicleAddStep2Screen() {
  const { vehicleData, updateVehicleData, vehicleModels } = useVehicleAdd();

  const models = vehicleModels.filter(
    (model) => model.brand === vehicleData.maker
  );

  function onClickCarModel(model: string) {
    updateVehicleData({ ...vehicleData, model });
    router.push("/vehicle/add/step3");
  }

  return (
    <SafeAreaView className=" flex-1">
      <ScrollView className="flex-1 p-4">
        <Card>
          <Text className="mb-3 text-2xl font-bold">차종 선택</Text>
          <Text className="h7 mb-5 text-lg text-gray-700">
            보유하신 차량의 모델을 선택해주세요.
          </Text>
          {models.map((car) => (
            <KittenCard
              key={car.id}
              status="primary"
              // status={car.disabled ? "basic" : "primary"}
              // disabled={car.disabled}
              onPress={() => onClickCarModel(car.model)}
              style={{
                marginVertical: 4,
                // backgroundColor: car.disabled ? "#f0f0f0" : "#fff",
                backgroundColor: "#fff",
              }}
            >
              <Text>
                {car.model} (id: {car.id})
              </Text>
            </KittenCard>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
