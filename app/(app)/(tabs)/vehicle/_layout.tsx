import { Stack } from "expo-router";

export default function VehicleLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "뒤로",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="vehicle-list"
        options={{
          title: "차량 관리",
          headerShown: true,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="vehicle-edit"
        options={{
          title: "차량 상세",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="maintenance-items"
        options={{
          title: "차량 정비현황",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="maintenance-item-form"
        options={{
          title: "정비 품목 등록/수정",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="maintenance-item-detail"
        options={{
          title: "정비 품목 상세",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="maintenance-history-form"
        options={{
          title: "정비 이력 등록/수정",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="vehicle-add-step1"
        options={{
          title: "차량 등록",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="vehicle-add-step2"
        options={{
          title: "차량 등록",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="vehicle-add-step3"
        options={{
          title: "차량 등록",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
