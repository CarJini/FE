import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Card, MenuButton, ScreenLayout } from "@/src/components";
import { useAuth } from "@/src/hooks";

export default function UserProfileScreen() {
  const { user, signOut } = useAuth();
  return (
    <ScreenLayout headerTitle="내 프로필">
      <Card>
        <View className="flex-row items-center">
          <View className="w-20 h-20 rounded-full bg-gray-300 justify-center items-center mr-4">
            <Text className="text-2xl font-bold text-white">
              {user?.name?.charAt(0) ?? "U"}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="font-bold text-xl">{user?.name}</Text>
            <Text className="text-sm text-gray-600">{user?.email}</Text>
          </View>
        </View>
      </Card>

      <View className="flex-1 mt-4">
        <MenuButton
          size={20}
          iconName="notifications-outline"
          text="알림 설정"
        />
        <MenuButton
          size={20}
          iconName="log-out-outline"
          text="로그아웃"
          onPress={signOut}
        />
      </View>
    </ScreenLayout>
  );
}
