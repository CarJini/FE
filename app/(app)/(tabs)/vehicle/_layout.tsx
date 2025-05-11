import { Stack } from "expo-router";

export default function VehicleLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="vehicle-list" />
      <Stack.Screen name="vehicle-edit" />
      <Stack.Screen name="maintenance-items" />
      <Stack.Screen name="maintenance-item-form" />
      <Stack.Screen name="maintenance-item-detail" />
      <Stack.Screen name="maintenance-history-form" />
      <Stack.Screen name="vehicle-add-step1" />
      <Stack.Screen name="vehicle-add-step2" />
      <Stack.Screen name="vehicle-add-step3" />
    </Stack>
  );
}
