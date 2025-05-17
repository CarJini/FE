import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";
import { replacePathParams } from "@/src/utils";
import { Header, IconButton, ScreenLayout } from "@/src/components";
import Markdown from "react-native-markdown-display";
import { useVehicleStore } from "@/src/store";
import { router, useFocusEffect } from "expo-router";
import Toast from "react-native-toast-message";
import { modelImageMap } from "../../../../src/constants/Vehicle";
import { VehicleModel } from "@/src/types";
import { NoVehicles } from "@/src/components/vehicle";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type Message = {
  message: string;
  isUser?: boolean;
  createdAt: Date;
};

export default function ChatScreen() {
  const myVehicles = useVehicleStore((state) => state.myVehicles);
  const fetchMyVehicles = useVehicleStore((state) => state.fetchMyVehicles);
  const [carOwnerId, setCarOwnerId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      message:
        "안녕하세요! 카지니 챗봇입니다. 어떤 도움이 필요하신가요? 차량을 선택 후 메시지를 입력해주세요!",
      isUser: false,
      createdAt: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchMyVehicles();
    }, [])
  );

  useEffect(() => {
    if (myVehicles.length > 0) {
      setCarOwnerId(myVehicles[0].id.toString());
    }
  }, [myVehicles]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  async function onSendMessage() {
    setInputText("");
    if (!carOwnerId) {
      Toast.show({
        type: "error",
        text1: "일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
        position: "bottom",
      });
      return;
    }
    if (!inputText.trim()) return;

    const { url, method } = API_ENDPOINTS.CHATBOT.MESSAGE;
    const userMessage: Message = {
      message: inputText,
      isUser: true,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsBotTyping(true);

    try {
      const res = await apiClient.request({
        method,
        url: replacePathParams(url, {
          carOwnerId: carOwnerId.toString(),
        }),
        data: {
          message: inputText,
        },
      });

      if (res.status !== 200) {
        console.error("Error sending message:", res);
        return;
      }

      const botMessage: Message = {
        message: res.data.data.message,
        isUser: false,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsBotTyping(false);
    }
  }

  function onClickChatHistory() {
    router.push("/chatbot/chat-history");
  }

  if (myVehicles.length === 0) {
    return (
      <ScreenLayout headerTitle="챗봇">
        <NoVehicles />
      </ScreenLayout>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 80 : keyboardVisible ? 50 : 0
      }
    >
      <SafeAreaView className="flex-1" edges={["top"]}>
        <StatusBar style="dark" backgroundColor="#ffffff" />
        <Header
          title="챗봇"
          Right={
            <IconButton
              iconName="reader-outline"
              onPress={onClickChatHistory}
            />
          }
        />
        <View className="flex-1">
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ padding: 16 }}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            {/* 차량 선택 드롭다운 */}
            {myVehicles.length > 0 && (
              <SelectVehicle
                myVehicles={myVehicles}
                carOwnerId={carOwnerId}
                setCarOwnerId={setCarOwnerId}
              />
            )}

            {/* 메시지 리스트 */}
            {messages.map((message) => (
              <View
                key={message.message + message.createdAt}
                className={`max-w-4/5 p-3 rounded-2xl mb-2 ${
                  message.isUser
                    ? "self-end bg-blue-600"
                    : "self-start bg-white"
                }`}
              >
                {message.isUser ? (
                  <Text className="text-base leading-6 text-white">
                    {message.message}
                  </Text>
                ) : (
                  <Markdown
                    style={{
                      body: { color: "#1f2937", fontSize: 16 }, // Tailwind: text-gray-800
                    }}
                  >
                    {message.message}
                  </Markdown>
                )}
                <Text className="text-xs text-gray-400 mt-1 self-end">
                  {format(message?.createdAt, "HH:mm", {
                    locale: ko,
                  })}
                </Text>
              </View>
            ))}
            {isBotTyping && (
              <View className="max-w-4/5 p-3 rounded-2xl mb-2 self-start bg-white">
                <TypingIndicator />
              </View>
            )}
          </ScrollView>

          {/* 메시지 입력창 */}
          <View className="flex-row p-4 bg-white border-t border-gray-200">
            <TextInput
              className="flex-1 bg-gray-200 rounded-full px-4 py-2 mr-2 text-base max-h-24"
              value={inputText}
              onChangeText={setInputText}
              placeholder="메시지를 입력하세요..."
              placeholderTextColor="#999"
              multiline
            />
            <Pressable
              className="w-10 h-10 rounded-full bg-blue-600 justify-center items-center"
              onPress={onSendMessage}
            >
              <Ionicons name="paper-plane" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function SelectVehicle({
  myVehicles,
  carOwnerId,
  setCarOwnerId,
}: {
  myVehicles: VehicleModel[];
  carOwnerId: string | null;
  setCarOwnerId: (id: string | null) => void;
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  return (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
      <Text className="text-gray-700 font-medium mb-2">
        🚗 대화할 차량 선택
      </Text>
      <View className="border border-gray-300 rounded-lg p-2">
        <Pressable
          onPress={() => setDropdownVisible(!dropdownVisible)}
          className="flex-row justify-between items-center"
        >
          <Text className="text-base text-gray-800">
            {myVehicles.find((v) => v.id.toString() === carOwnerId)?.model ||
              "차량을 선택해주세요"}
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
                className={`p-2 rounded-md mb-1 ${
                  carOwnerId === vehicle.id.toString() ? "bg-blue-100" : ""
                }`}
                onPress={() => {
                  setCarOwnerId(vehicle.id.toString());
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

function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      );

    createAnimation(dot1, 0).start();
    createAnimation(dot2, 150).start();
    createAnimation(dot3, 300).start();
  }, []);

  return (
    <View className="flex-row items-center h-6">
      <Animated.View
        style={{ opacity: dot1 }}
        className="w-2 h-2 rounded-full bg-gray-500 mx-1"
      />
      <Animated.View
        style={{ opacity: dot2 }}
        className="w-2 h-2 rounded-full bg-gray-500 mx-1"
      />
      <Animated.View
        style={{ opacity: dot3 }}
        className="w-2 h-2 rounded-full bg-gray-500 mx-1"
      />
    </View>
  );
}
