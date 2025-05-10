import { Stack } from "expo-router";

export default function ChatbotLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "뒤로",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="chat"
        options={{
          title: "챗봇",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
