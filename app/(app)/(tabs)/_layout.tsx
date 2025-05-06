import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: (props) => (
          <TouchableOpacity
            {...(props as React.ComponentProps<typeof TouchableOpacity>)}
            activeOpacity={0.7}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
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
