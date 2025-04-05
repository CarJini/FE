import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { VehicleCard } from "@/src/components/vehicle";
import { FloatingButton } from "@/src/components";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { dummyCars } from "@/src/dummydata/data";

export default function VehicleScreen() {
  function onClickAddVehicle() {
    router.push("/vehicle/add");
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="p-4">
        {dummyCars.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
        {dummyCars.length === 0 && (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="car" size={20} />
            </View>
            <Text style={styles.emptyTitle}>등록된 차량이 없습니다.</Text>
            <Text style={styles.emptyDescription}>
              차량을 등록하고 관리해보세요.
            </Text>
          </View>
        )}
      </ScrollView>
      <FloatingButton label={"+"} onPress={onClickAddVehicle} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  vehicleList: {
    flex: 1,
    justifyContent: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    padding: 32,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5F1FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
});
