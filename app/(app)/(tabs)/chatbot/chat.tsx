import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { API_ENDPOINTS } from "@/src/services/apiEndpoints";
import { apiClient } from "@/src/services/api";
import { replacePathParams } from "@/src/utils";
import { ScreenLayout } from "@/src/components";

type Message = {
  message: string;
  isUser?: boolean;
  createdAt?: Date;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      message: "안녕하세요! 카지니 챗봇입니다. 어떤 도움이 필요하신가요?",
      isUser: false,
      createdAt: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  async function onSendMessage() {
    setInputText("");
    if (!inputText.trim()) return;

    // TODO: 하드코딩 삭제
    const carOwnerId = "6";
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

  return (
    <ScreenLayout headerTitle="챗봇" scroll={true}>
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 p-4 pb-8"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={scrollToBottom}
        onLayout={scrollToBottom}
      >
        {messages.map((message) => (
          <View
            key={message.message + message.createdAt}
            className={`max-w-4/5 p-3 rounded-2xl mb-2 ${
              message.isUser ? "self-end bg-blue-600" : "self-start bg-white"
            }`}
          >
            <Text
              className={`text-base leading-6 ${
                message.isUser ? "text-white" : "text-gray-800"
              }`}
            >
              {message.message}
            </Text>
            <Text className="text-xs text-gray-400 mt-1 self-end">
              {message.createdAt?.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
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
    </ScreenLayout>
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
