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
        headerShown: true,
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
        name="vehicle/index"
        options={{
          title: "차량",
          tabBarIcon: ({ color }) => (
            <Ionicons name="car" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot/index"
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
        name="profile/index"
        options={{
          title: "프로필",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vehicle/[id]/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="vehicle/[id]/edit"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="vehicle/add"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
