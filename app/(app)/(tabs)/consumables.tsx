import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";

type Consumable = {
  id: string;
  name: string;
  category: string;
  lastChange: string;
  nextChange: string;
  status: "good" | "warning" | "danger";
};

const dummyConsumables: Consumable[] = [
  {
    id: "1",
    name: "엔진오일",
    category: "엔진",
    lastChange: "2024-01-15",
    nextChange: "2024-07-15",
    status: "good",
  },
  {
    id: "2",
    name: "브레이크 패드",
    category: "제동장치",
    lastChange: "2023-12-20",
    nextChange: "2024-06-20",
    status: "warning",
  },
  {
    id: "3",
    name: "타이어",
    category: "구동장치",
    lastChange: "2023-11-10",
    nextChange: "2024-05-10",
    status: "danger",
  },
];

const getStatusColor = (status: Consumable["status"]) => {
  switch (status) {
    case "good":
      return "#34C759";
    case "warning":
      return "#FF9500";
    case "danger":
      return "#FF3B30";
  }
};

export default function ConsumablesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* 소모품 목록 */}
        <View style={styles.consumablesList}>
          {dummyConsumables.map((consumable) => (
            <Pressable
              key={consumable.id}
              style={({ pressed }) => [
                styles.consumableCard,
                pressed && styles.pressedCard,
              ]}
            >
              <View style={styles.consumableHeader}>
                <Text style={styles.consumableName}>{consumable.name}</Text>
                <View
                  style={[
                    styles.statusIndicator,
                    { backgroundColor: getStatusColor(consumable.status) },
                  ]}
                />
              </View>
              <Text style={styles.consumableCategory}>
                {consumable.category}
              </Text>
              <View style={styles.changeInfo}>
                <Text style={styles.changeText}>
                  마지막 교체: {consumable.lastChange}
                </Text>
                <Text style={styles.changeText}>
                  다음 교체: {consumable.nextChange}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* 메뉴 리스트 */}
        <View style={styles.menuList}>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.pressedItem,
            ]}
          >
            <IconSymbol name="wrench.fill" size={24} color="#007AFF" />
            <Text style={styles.menuText}>소모품 교체 기록</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.pressedItem,
            ]}
          >
            <IconSymbol name="message.fill" size={24} color="#007AFF" />
            <Text style={styles.menuText}>교체 상담</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.pressedItem,
            ]}
          >
            <IconSymbol name="car.fill" size={24} color="#007AFF" />
            <Text style={styles.menuText}>정비소 찾기</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  consumablesList: {
    padding: 16,
  },
  consumableCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressedCard: {
    opacity: 0.8,
  },
  consumableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  consumableName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  consumableCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  changeInfo: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
  },
  changeText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  menuList: {
    backgroundColor: "white",
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pressedItem: {
    backgroundColor: "#f5f5f5",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  menuArrow: {
    fontSize: 20,
    color: "#999",
  },
});
