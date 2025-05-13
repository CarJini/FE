import { IconButton, ScreenLayout } from "@/src/components";
import { apiClient } from "@/src/services/api";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

type Notification = {
  id: number;
  title: string;
  message: string;
  type: string;
  maintenanceItemId: number;
  createdAt: Date;
};

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "엔진 오일 교체 알림",
    message: "엔진 오일 교체 주기가 다가왔습니다. 점검이 필요합니다.",
    type: "maintenance",
    maintenanceItemId: 101,
    createdAt: new Date(2025, 4, 10, 9, 30),
  },
  {
    id: 2,
    title: "타이어 공기압 확인",
    message: "타이어 공기압이 낮습니다. 확인해주세요.",
    type: "warning",
    maintenanceItemId: 102,
    createdAt: new Date(2025, 4, 9, 14, 15),
  },
  {
    id: 3,
    title: "정기 점검 예약 확인",
    message: "내일 오전 10시 정기 점검 예약이 확인되었습니다.",
    type: "appointment",
    maintenanceItemId: 103,
    createdAt: new Date(2025, 4, 8, 16, 45),
  },
  {
    id: 4,
    title: "브레이크 패드 마모",
    message: "브레이크 패드가 마모되었습니다. 교체가 필요합니다.",
    type: "urgent",
    maintenanceItemId: 104,
    createdAt: new Date(2025, 4, 7, 11, 20),
  },
];

// 알림 조회
export default function NotificationsScreen() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  console.log("notifications>>>.", notifications);

  //   useEffect(() => {
  //     getNotifications();
  //   }, []);

  //   async function getNotifications() {
  //     const { method, url } = API_ENDPOINTS.NOTIFICATION.LIST;
  //     try {
  //       const res = await apiClient.request({
  //         method,
  //         url,
  //       });
  //       if (res.status === 200) {
  //         setNotifications(res.data);
  //       }
  //     } catch (error) {
  //       console.error("Error deleting vehicle", error);
  //     }
  //   }

  function onBackPress() {
    router.replace(`/vehicle/vehicle-list`);
  }

  return (
    <ScreenLayout
      headerTitle="알림"
      LeftHeader={<IconButton iconName="home" onPress={onBackPress} />}
    >
      {notifications.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text className="text-lg">알림이 없습니다.</Text>
        </View>
      )}
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onPress={() => {
            Toast.show({
              type: "error",
              text1: "알림 클릭",
              text2: `알림 ID: ${notification.id}`,
            });
          }}
        />
      ))}
    </ScreenLayout>
  );
}

function NotificationItem({
  notification,
  onPress,
}: {
  notification: Notification;
  onPress: () => void;
}) {
  const getIconByType = (type: string) => {
    switch (type) {
      case "maintenance":
        return { name: "build-outline", color: "#3498db" };
      case "warning":
        return { name: "warning-outline", color: "#f39c12" };
      case "appointment":
        return { name: "calendar-outline", color: "#2ecc71" };
      case "urgent":
        return { name: "alert-circle-outline", color: "#e74c3c" };
      default:
        return { name: "notifications-outline", color: "#95a5a6" };
    }
  };

  const icon = getIconByType(notification.type);
  const formattedDate = new Date(notification.createdAt).toLocaleDateString(
    "ko-KR",
    {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  // 하단 스타일을 tailwindcss로 변환

  return (
    <TouchableOpacity
      className={`flex-row p-4 rounded-lg mb-2 bg-white`}
      onPress={onPress}
    >
      <View className="w-10 h-10 rounded-full justify-center items-center bg-gray-100 mr-3">
        <Ionicons name={icon.name} size={24} color={icon.color} />
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-base font-semibold text-gray-900">
            {notification.title}
          </Text>
          {/* {!notification.isRead && (
            <View className="w-2 h-2 bg-blue-500 rounded-full ml-2" />
          )} */}
        </View>

        <Text className="text-sm text-gray-700 mb-1" numberOfLines={2}>
          {notification.message}
        </Text>

        <Text className="text-xs text-gray-400">{formattedDate}</Text>
      </View>
    </TouchableOpacity>
  );
}
