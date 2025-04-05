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
        name="index"
        options={{
          title: "차량 관리",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: "차량 등록",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id]/index"
        options={{
          title: "차량 상세",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id]/edit"
        options={{
          title: "차량 편집",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
