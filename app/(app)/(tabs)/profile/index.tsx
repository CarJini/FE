import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useColorScheme } from "react-native";
import { MenuButton } from "@/src/components";
import { useAuth } from "@/src/hooks";
import { router } from "expo-router";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="flex-1">
        <View className="bg-white p-4 m-4 border rounded-xl border-gray-200">
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

          <View className="flex-row justify-around border-t border-gray-200 pt-4">
            <View className="flex-1 items-center">
              <Text className="text-xl text-blue-500 font-bold">5</Text>
              <Text className="text-sm text-gray-500">등록차량</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-xl text-blue-500 font-bold">5</Text>
              <Text className="text-sm text-gray-500">정비기록</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-xl text-blue-500 font-bold">5</Text>
              <Text className="text-sm text-gray-500">예정정비</Text>
            </View>
          </View>
        </View>

        <View className="pl-4 pr-4 flex-1">
          <MenuButton
            size={20}
            iconName="person-circle-outline"
            text="FAQ"
            onPress={() => router.push("/profile/faq")}
          />
          <MenuButton
            size={20}
            iconName="notifications-outline"
            text="알림 설정"
          />
          <MenuButton
            size={20}
            iconName="information-circle-outline"
            text="약관"
          />
          <MenuButton
            size={20}
            iconName="information-circle-outline"
            text="버전"
          />
          <MenuButton
            size={20}
            iconName="trash-outline"
            text="탈퇴"
            onPress={signOut}
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
