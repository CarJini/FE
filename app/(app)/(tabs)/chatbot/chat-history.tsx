import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";
import { replacePathParams } from "@/src/utils";
import { IconButton, ScreenLayout } from "@/src/components";
import { useVehicleStore } from "@/src/store";
import { router } from "expo-router";
import Markdown from "react-native-markdown-display";
import Toast from "react-native-toast-message";
import { modelImageMap } from "@/src/constants/Vehicle";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type HistoryMessage = {
  id: string;
  sender: string;
  message: string;
  carOwnerId: number;
  createdAt: string;
};

export default function ChatHistoryScreen() {
  const myVehicles = useVehicleStore((state) => state.myVehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(
    null
  );
  const [chatHistory, setChatHistory] = useState<HistoryMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // 대화 내역 불러오기
  const fetchChatHistory = async () => {
    if (loading || !hasMore || !selectedVehicleId) return;

    setLoading(true);
    try {
      const { url, method } = API_ENDPOINTS.CHATBOT.HISTORY || {
        url: "/api/chatbot/history/{carOwnerId}",
        method: "GET",
      };

      const response = await apiClient.request({
        method,
        url: replacePathParams(url, {
          carOwnerId: selectedVehicleId,
        }),
        params: {
          page,
          size: 10,
          sort: "createdAt,asc",
        },
      });

      const newMessages = response.data.data.content || [];
      setHasMore(!Boolean(response.data.data.last) || false);

      if (newMessages.length > 0) {
        setChatHistory((prev) => [...prev, ...newMessages]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
      setHasMore(false);
      Toast.show({
        type: "error",
        text1: "대화 내역을 불러오는데 실패했습니다.",
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  // 차량 변경 시 히스토리 초기화 및 다시 로드
  useEffect(() => {
    if (!selectedVehicleId) {
      return;
    }

    setChatHistory([]);
    setPage(0);
    setHasMore(true);
  }, [selectedVehicleId]);

  // 메세지 렌더링
  function renderHistoryItem({
    item,
    index,
  }: {
    item: HistoryMessage;
    index: number;
  }) {
    return (
      <View
        className={`p-4 rounded-xl mt-2 ${
          item.sender === "USER"
            ? "bg-blue-600 self-end"
            : "bg-white self-start"
        }`}
      >
        {item.sender === "USER" ? (
          <Text className="text-base leading-6 text-white">{item.message}</Text>
        ) : (
          <Markdown
            style={{
              body: { color: "#1f2937", fontSize: 16 },
            }}
          >
            {item.message}
          </Markdown>
        )}
        <Text
          className={`text-xs mt-1 self-end ${
            item.sender === "USER" ? "text-blue-200" : "text-gray-400"
          }`}
        >
          {format(item.createdAt, "HH:mm", { locale: ko })}
        </Text>
      </View>
    );
  }

  // 로딩 인디케이터
  function renderFooter() {
    if (!loading) return null;
    return (
      <View className="py-4 items-center">
        <ActivityIndicator size="large" color="#4a87fd" />
        <Text className="text-gray-500 text-sm mt-2">
          대화 내역 불러오는 중...
        </Text>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View className="bg-white rounded-xl p-4 shadow-sm">
        <Text className="text-gray-700 font-medium mb-2">
          🚗 대화 이력을 확인할 차량
        </Text>
        <View className="border border-gray-300 rounded-lg p-2">
          <Pressable
            onPress={() => setDropdownVisible(!dropdownVisible)}
            className="flex-row justify-between items-center"
          >
            <Text className="text-base text-gray-800">
              {myVehicles.find((v) => v.id.toString() === selectedVehicleId)
                ?.model || "차량을 선택해주세요"}
            </Text>
            <Ionicons
              name={dropdownVisible ? "chevron-up" : "chevron-down"}
              size={20}
              color="#666"
            />
          </Pressable>

          {dropdownVisible && (
            <View className="mt-2 border-t border-gray-200 pt-2">
              {myVehicles.map((vehicle) => (
                <Pressable
                  key={vehicle.id}
                  className={`rounded-md mb-1 ${
                    selectedVehicleId === vehicle.id.toString()
                      ? "bg-blue-100"
                      : ""
                  }`}
                  onPress={() => {
                    setSelectedVehicleId(vehicle.id.toString());
                    setDropdownVisible(false);
                  }}
                >
                  <View className="flex-row items-center">
                    {vehicle.model && (
                      <Image
                        source={modelImageMap[vehicle.model]}
                        className="w-8 h-8 rounded-md mr-2"
                        resizeMode="contain"
                      />
                    )}
                    <View>
                      <Text className="text-base font-medium">
                        {vehicle.model}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {vehicle.brand} • {vehicle.nowKm.toLocaleString()}km
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  }

  function onBackPress() {
    router.replace(`/chatbot/chat`);
  }

  return (
    <ScreenLayout
      headerTitle="대화 이력"
      LeftHeader={<IconButton iconName="chevron-back" onPress={onBackPress} />}
      scroll={false}
    >
      <StatusBar style="dark" backgroundColor="#ffffff" />

      {/* 대화 내역 리스트 */}
      <FlatList
        data={chatHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        onEndReached={fetchChatHistory}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <View className="py-12 items-center justify-center">
            {!loading && (
              <>
                <Ionicons name="chatbubble-outline" size={48} color="#999" />
                <Text className="text-gray-500 text-base mt-2">
                  대화 내역이 없습니다.
                </Text>
              </>
            )}
          </View>
        }
      />
    </ScreenLayout>
  );
}
