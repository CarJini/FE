import { Button, IconButton, ScreenLayout } from "@/src/components";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tab, TabBar } from "@ui-kitten/components";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import Toast from "react-native-toast-message";

type Notification = {
  id: number;
  title: string;
  message: string;
  type: string;
  maintenanceItemId: number;
  createdAt: Date;
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "엔진 오일 교체 알림",
    message: "엔진 오일 교체 주기가 다가왔습니다. 점검이 필요합니다.",
    type: "maintenance",
    maintenanceItemId: 101,
    createdAt: new Date(2025, 4, 10, 9, 30),
    read: false,
  },
  {
    id: 2,
    title: "타이어 공기압 확인",
    message: "타이어 공기압이 낮습니다. 확인해주세요.",
    type: "warning",
    maintenanceItemId: 102,
    createdAt: new Date(2025, 4, 9, 14, 15),
    read: false,
  },
  {
    id: 3,
    title: "정기 점검 예약 확인",
    message: "내일 오전 10시 정기 점검 예약이 확인되었습니다.",
    type: "appointment",
    maintenanceItemId: 103,
    createdAt: new Date(2025, 4, 8, 16, 45),
    read: false,
  },
  {
    id: 4,
    title: "브레이크 패드 마모",
    message: "브레이크 패드가 마모되었습니다. 교체가 필요합니다.",
    type: "urgent",
    maintenanceItemId: 104,
    createdAt: new Date(2025, 4, 7, 11, 20),
    read: true,
  },
  {
    id: 5,
    title: "차량 점검 완료",
    message: "차량 점검이 완료되었습니다. 자세한 내용은 앱에서 확인하세요.",
    type: "maintenance",
    maintenanceItemId: 105,
    createdAt: new Date(2025, 4, 6, 10, 0),
    read: true,
  },
  {
    id: 6,
    title: "배터리 상태 경고",
    message: "배터리 상태가 불안정합니다. 점검이 필요합니다.",
    type: "warning",
    maintenanceItemId: 106,
    createdAt: new Date(2025, 4, 5, 12, 30),
    read: false,
  },
  {
    id: 7,
    title: "정기 점검 알림",
    message: "다음 주 월요일 정기 점검이 예정되어 있습니다.",
    type: "appointment",
    maintenanceItemId: 107,
    createdAt: new Date(2025, 4, 4, 8, 0),
    read: false,
  },
  {
    id: 8,
    title: "타이어 교체 필요",
    message: "타이어 마모가 심합니다. 교체를 권장합니다.",
    type: "urgent",
    maintenanceItemId: 108,
    createdAt: new Date(2025, 4, 3, 15, 0),
    read: true,
  },
];

// 알림 조회
export default function NotificationsScreen() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const [selectedIndex, setSelectedIndex] = useState(0);
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

  function onClickNotification(notification: Notification) {
    Toast.show({
      type: "error",
      text1: "알림 클릭",
      text2: `알림 ID: ${notification.id}`,
    });

    router.push(
      `/vehicle/maintenance-item-detail?vehicleId=${3}&itemId=${
        notification.maintenanceItemId
      }`
    );
  }

  function onChangeTab(index: number) {
    setSelectedIndex(index);
    if (index === 1) {
      setNotifications((prev) =>
        prev.filter((notification) => !notification.read)
      );
    } else {
      setNotifications(mockNotifications);
    }
  }

  function onBackPress() {
    router.replace(`/vehicle/vehicle-list`);
  }

  function onClickRead(id: number) {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);

    Toast.show({
      type: "error",
      text1: "읽기 요청",
      text2: `알림 ID: ${id}`,
    });
    // 서버에 읽음 상태 업데이트 요청
    // const { method, url } = API_ENDPOINTS.NOTIFICATION.READ;
    // apiClient.request({
    //   method,
    //   url: url.replace("{id}", String(id)),
    // });
  }

  function onClickDelete(id: number) {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);

    Toast.show({
      type: "error",
      text1: "삭제 요청",
      text2: `알림 ID: ${id}`,
    });
    // 서버에 알림 삭제 요청
    // const { method, url } = API_ENDPOINTS.NOTIFICATION.DELETE;
    // apiClient.request({
    //   method,
    //   url: url.replace("{id}", String(id)),
    // });
  }

  return (
    <ScreenLayout
      headerTitle="알림"
      LeftHeader={<IconButton iconName="home" onPress={onBackPress} />}
      containerStyle={{ paddingBottom: 20 }}
    >
      <View className="flex-row border-b border-gray-200 mb-3">
        {[
          { key: 0, label: "전체", count: mockNotifications.length },
          {
            key: 1,
            label: "읽지 않음",
            count: mockNotifications.filter((n) => !n.read).length,
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
      <View className="">
        <Button
          label="모두 읽음 처리"
          onPress={() => {
            Toast.show({
              type: "success",
              text1: "모두 읽음 처리 요청",
            });
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          }}
        />
        <Button
          label="모두 삭제 요청"
          color="secondary"
          onPress={() => {
            Toast.show({
              type: "success",
              text1: "모두 읽음 처리 요청",
            });
            // TODO: 실제 서버 요청 로직 연결
            setNotifications([]);
          }}
        />
      </View>
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

  // 하단 스타일을 tailwindcss로 변환

  return (
    <TouchableOpacity
      className={`flex-row p-4 rounded-lg mb-2 bg-white`}
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
    </TouchableOpacity>
  );
}
