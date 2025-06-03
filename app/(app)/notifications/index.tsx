import { Button, IconButton, ScreenLayout } from "@/src/components";
import { apiClient } from "@/src/services/api";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { Notification, useNotificationStore } from "@/src/store";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { View, Text, Pressable, RefreshControl } from "react-native";
import Toast from "react-native-toast-message";

// 알림 조회
export default function NotificationsScreen() {
  const unreadCount = useNotificationStore((state) => state.unreadCount);
  const notifications = useNotificationStore((state) => state.notifications);
  const allNotifications = useNotificationStore(
    (state) => state.allNotifications
  );
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications
  );
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const markAsReadAll = useNotificationStore((state) => state.markAsReadAll);
  const deleteNotification = useNotificationStore(
    (state) => state.deleteNotification
  );
  const deleteAllNotifications = useNotificationStore(
    (state) => state.deleteAllNotifications
  );
  const fetchNotifications = useNotificationStore(
    (state) => state.fetchNotifications
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  useLayoutEffect(() => {
    fetchNotifications();
  }, []);

  function onBackPress() {
    router.replace(`/vehicle/vehicle-list`);
  }

  function onClickNotification(n: Notification) {
    router.push(
      `/vehicle/maintenance-item-detail?vehicleId=${n.carId}&itemId=${n.maintenanceItemId}`
    );
  }

  async function onRefresh() {
    await fetchNotifications();

    if (selectedIndex === 1) {
      // 읽지 않은 알림만 새로고침
      const unreadNotifications = notifications.filter((n) => !n.read);
      setNotifications(unreadNotifications);
    } else {
      // 전체 알림 새로고침
      setNotifications(allNotifications);
    }
  }

  function onChangeTab(index: number) {
    setSelectedIndex(index);
    if (index === 1) {
      const unreadNotifications = notifications.filter((n) => !n.read);
      setNotifications(unreadNotifications);
    } else {
      setNotifications(allNotifications);
    }
  }

  function onClickRead(id: number) {
    markAsRead(id);
  }

  function onClickDelete(id: number) {
    deleteNotification(id);
  }

  function onClickAllRead() {
    markAsReadAll();
  }

  function onClickAllDelete() {
    deleteAllNotifications();
  }

  return (
    <ScreenLayout
      headerTitle="알림"
      LeftHeader={<IconButton iconName="home" onPress={onBackPress} />}
      containerStyle={{ paddingBottom: 20 }}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
    >
      <View className="flex-row border-b border-gray-200 mb-3">
        {[
          { key: 0, label: "전체", count: allNotifications.length },
          {
            key: 1,
            label: "읽지 않음",
            count: unreadCount,
          },
        ].map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => onChangeTab(tab.key)}
            className={`flex-1 items-center py-2 ${
              selectedIndex === tab.key ? "border-b-2 border-blue-500" : ""
            }`}
          >
            <View className="flex-row items-center space-x-1">
              <Text
                className={`text-base ${
                  selectedIndex === tab.key
                    ? "text-blue-500 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {tab.label}
              </Text>
              <View
                className={`px-2 py-0.5 rounded-full ${
                  selectedIndex === tab.key ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <Text className="text-xs text-white">{tab.count}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
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
          onPress={onClickNotification}
          onClickRead={onClickRead}
          onClickDelete={onClickDelete}
        />
      ))}
      {notifications.length > 0 && (
        <View className="">
          <Button label="모두 읽음 처리" onPress={onClickAllRead} />
          <Button
            label="모두 삭제 요청"
            color="secondary"
            onPress={onClickAllDelete}
          />
        </View>
      )}
    </ScreenLayout>
  );
}

function NotificationItem({
  notification,
  onPress,
  onClickRead,
  onClickDelete,
}: {
  notification: Notification;
  onPress: (notification: Notification) => void;
  onClickRead?: (id: number) => void;
  onClickDelete?: (id: number) => void;
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

  return notification.maintenanceItemId ? (
    <Pressable
      className="flex-row p-4 rounded-lg mb-2 bg-white"
      onPress={() => onPress(notification)}
    >
      <View className="w-10 h-10 rounded-full justify-center items-center bg-gray-100 mr-3">
        <Ionicons name={icon.name} size={24} color={icon.color} />
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-base font-semibold text-gray-900">
            {notification.title}
          </Text>
          {!notification.read && (
            <View className="w-2 h-2 bg-blue-500 rounded-full ml-2" />
          )}
        </View>

        <Text className="text-sm text-gray-700 mb-1" numberOfLines={2}>
          {notification.message}
        </Text>

        <Text className="text-xs text-gray-400">{formattedDate}</Text>

        <View className="flex-row justify-end gap-x-2 items-center">
          {!notification.read && (
            <Pressable
              className="px-3 py-1 rounded-full bg-blue-50"
              onPress={() => {
                onClickRead?.(notification.id);
              }}
            >
              <Text className="text-xs text-blue-600">
                <MaterialIcons name="check" />
                읽음
              </Text>
            </Pressable>
          )}

          <Pressable
            className="px-3 py-1 rounded-full bg-red-50"
            onPress={() => {
              onClickDelete?.(notification.id);
            }}
          >
            <Text className="text-xs text-red-600">
              <MaterialIcons name="delete-forever" />
              삭제
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  ) : (
    <View className="flex-row p-4 rounded-lg mb-2 bg-white">
      <View className="w-10 h-10 rounded-full justify-center items-center bg-gray-100 mr-3">
        <Ionicons name={icon.name} size={24} color={icon.color} />
      </View>

      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-base font-semibold text-gray-900">
            {notification.title}
          </Text>
          {!notification.read && (
            <View className="w-2 h-2 bg-blue-500 rounded-full ml-2" />
          )}
        </View>

        <Text className="text-sm text-gray-700 mb-1" numberOfLines={2}>
          {notification.message}
        </Text>

        <Text className="text-xs text-gray-400">{formattedDate}</Text>

        <View className="flex-row justify-end gap-x-2 items-center">
          {!notification.read && (
            <Pressable
              className="px-3 py-1 rounded-full bg-blue-50"
              onPress={() => {
                onClickRead?.(notification.id);
              }}
            >
              <Text className="text-xs text-blue-600">
                <MaterialIcons name="check" />
                읽음
              </Text>
            </Pressable>
          )}

          <Pressable
            className="px-3 py-1 rounded-full bg-red-50"
            onPress={() => {
              onClickDelete?.(notification.id);
            }}
          >
            <Text className="text-xs text-red-600">
              <MaterialIcons name="delete-forever" />
              삭제
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
