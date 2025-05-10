import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Card, MenuButton } from "@/src/components";
import { useAuth } from "@/src/hooks";

export default function UserProfileScreen() {
  const { user, signOut } = useAuth();
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1 p-4">
        <Card>
          <View className="mb-5 flex-row items-center">
            <Image
              source={{ uri: "https://placehold.co/40x40@3x.png" }}
              className="radius-full w-20 h-20 rounded-full mr-4"
            />
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: "white",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    // iOS용 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android용 그림자
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
});
