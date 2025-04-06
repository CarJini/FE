import { Card } from "@/src/components";
import { useVehicleAdd } from "@/src/context";
import { router } from "expo-router";
import { Card as KittenCard } from "@ui-kitten/components";
import { SafeAreaView, ScrollView, Text } from "react-native";

/**
 * 1. 제조사 선택 현대, 기아, 르노삼성, 쉐보레 BMW, 벤츠,아우디 나오고 현대 기아만 선택가능하고 나머진 disabled
 * 2. 차종 선택 마찬가지로 백엔드에서 지원가능한거만 선택하고 나머지는 disabled
 * 3. 연료 선택
 * 4.
 * @returns
 */
const carMakers = [
  { name: "현대", disabled: false },
  { name: "기아", disabled: false },
  { name: "르노삼성", disabled: true },
  { name: "쉐보레", disabled: true },
  { name: "BMW", disabled: true },
  { name: "벤츠", disabled: true },
  { name: "아우디", disabled: true },
];
export default function VehicleAddStep1Screen() {
  const { vehicleData, updateVehicleData } = useVehicleAdd();

  function onClickMaker(maker: string) {
    updateVehicleData({ ...vehicleData, maker });
    router.push("/vehicle/add/step2");
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Card>
          <Text className="mb-3 text-2xl font-bold">제조사 선택</Text>
          <Text className="h7 mb-5 text-lg text-gray-700">
            보유하신 차량의 제조사를 선택해주세요.
          </Text>
          {carMakers.map((maker) => (
            <KittenCard
              key={maker.name}
              status={maker.disabled ? "basic" : "primary"}
              disabled={maker.disabled}
              onPress={() => onClickMaker(maker.name)}
              style={{
                marginVertical: 4,
                backgroundColor: maker.disabled ? "#f0f0f0" : "#fff",
              }}
            >
              <Text>{maker.name}</Text>
            </KittenCard>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
