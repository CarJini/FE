import { Colors } from "@/src/constants";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Pressable, useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: (props) => (
          <Pressable
            {...props}
            android_ripple={{ color: "transparent" }}
            style={() => [
              {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="vehicle"
        options={{
          title: "차량",
          tabBarIcon: ({ color }) => (
            <Ionicons name="car" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: "챗봇",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "프로필",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
