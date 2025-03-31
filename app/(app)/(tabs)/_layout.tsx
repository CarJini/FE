import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import React from "react";
import { Animated, Pressable, useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "white",
          elevation: 10,
          shadowOpacity: 0,
          height: 70,
        },
        tabBarItemStyle: {
          padding: 0,
          margin: 0,
        },
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
      initialRouteName="car"
    >
      <Tabs.Screen
        name="car"
        options={{
          title: "차량",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="car.fill" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="consumables"
        options={{
          title: "소모품",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="wrench.fill" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: "챗봇",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="message.fill" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "프로필",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person.fill" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  name,
  color,
  focused,
  size = 24,
}: {
  name: IconSymbolName;
  color: string;
  focused: boolean;
  size?: number;
}) {
  const scale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.3 : 1,
      friction: 4, // 마찰력 추가로 더 부드럽게
      tension: 20, // 장력 조절로 자연스러운 움직임
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <IconSymbol size={size} name={name} color={color} />
    </Animated.View>
  );
}
