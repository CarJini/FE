import { Stack } from "expo-router";

export default function ProfileLayout() {
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
          title: "프로필",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "유저 상세",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
