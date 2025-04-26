import { VehicleProvider } from "@/src/context";
import { Stack } from "expo-router";

export default function VehicleLayout() {
  return (
    <VehicleProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerBackTitle: "뒤로",
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "차량 관리",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="[vehicleId]/edit"
          options={{
            title: "차량 상세",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="[vehicleId]/maintenance/items"
          options={{
            title: "차량 정비현황",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="[vehicleId]/maintenance/form"
          options={{
            title: "정비 품목 등록/수정",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="[vehicleId]/maintenance/[itemId]/index"
          options={{
            title: "정비 품목 상세",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="[vehicleId]/maintenance/[itemId]/add-history"
          options={{
            title: "정비 이력 등록",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="add/step1"
          options={{
            title: "차량 등록",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="add/step2"
          options={{
            title: "차량 등록",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="add/step3"
          options={{
            title: "차량 등록",
            headerShown: true,
          }}
        />
      </Stack>
    </VehicleProvider>
  );
}
