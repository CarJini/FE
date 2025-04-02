import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Pressable, useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="car"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        tabBarButton: (props) => (
          <Pressable
            {...props}
            android_ripple={{ color: "transparent" }}
            style={({ pressed }) => [
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
        name="car"
        options={{
          title: "차량",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="car" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="consumables"
        options={{
          title: "소모품",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="build" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: "챗봇",
          tabBarIcon: ({ color, focused }) => (
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
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
