import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";

type Car = {
  id: string;
  name: string;
  model: string;
  year: string;
  image: string;
  lastMaintenance: string;
  nextMaintenance: string;
};

const dummyCars: Car[] = [
  {
    id: "1",
    name: "내 차",
    model: "아반떼",
    year: "2020",
    image: "https://via.placeholder.com/150",
    lastMaintenance: "2024-02-15",
    nextMaintenance: "2024-05-15",
  },
  {
    id: "2",
    name: "회사 차",
    model: "소나타",
    year: "2021",
    image: "https://via.placeholder.com/150",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-04-20",
  },
];

export default function Carcreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* 차량 목록 */}
        <View style={styles.vehicleList}>
          {dummyCars.map((vehicle) => (
            <Pressable
              key={vehicle.id}
              style={({ pressed }) => [
                styles.vehicleCard,
                pressed && styles.pressedCard,
              ]}
            >
              <Image
                source={{ uri: vehicle.image }}
                style={styles.vehicleImage}
              />
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleName}>{vehicle.name}</Text>
                <Text style={styles.vehicleModel}>
                  {vehicle.model} ({vehicle.year})
                </Text>
                <View style={styles.maintenanceInfo}>
                  <Text style={styles.maintenanceText}>
                    마지막 정비: {vehicle.lastMaintenance}
                  </Text>
                  <Text style={styles.maintenanceText}>
                    다음 정비: {vehicle.nextMaintenance}
                  </Text>
                </View>
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
            <IconSymbol name="car.fill" size={24} color="#007AFF" />
            <Text style={styles.menuText}>차량 등록</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.pressedItem,
            ]}
          >
            <IconSymbol name="wrench.fill" size={24} color="#007AFF" />
            <Text style={styles.menuText}>정비 기록</Text>
            <Text style={styles.menuArrow}>›</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.pressedItem,
            ]}
          >
            <IconSymbol name="message.fill" size={24} color="#007AFF" />
            <Text style={styles.menuText}>정비 상담</Text>
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
  vehicleList: {
    padding: 16,
  },
  vehicleCard: {
    flexDirection: "row",
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
  vehicleImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  vehicleModel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  maintenanceInfo: {
    backgroundColor: "#f5f5f5",
    padding: 8,
    borderRadius: 8,
  },
  maintenanceText: {
    fontSize: 12,
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
