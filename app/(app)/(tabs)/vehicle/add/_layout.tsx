import { VehicleAddProvider } from "@/src/context";
import { Stack } from "expo-router";

export default function VehicleAddLayout() {
  return (
    <VehicleAddProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="step1"
          options={{
            title: "제조사 선택",
          }}
        />
        <Stack.Screen
          name="step2"
          options={{
            title: "차종 선택",
          }}
        />
        <Stack.Screen
          name="step3"
          options={{
            title: "유종 선택",
          }}
        />
        <Stack.Screen
          name="step4"
          options={{
            title: "차량 상세정보 입력",
          }}
        />
      </Stack>
    </VehicleAddProvider>
  );
}
