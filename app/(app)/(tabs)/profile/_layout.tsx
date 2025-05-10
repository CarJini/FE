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
        name="user-profile"
        options={{
          title: "프로필",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
