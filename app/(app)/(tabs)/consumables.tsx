import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Consumable = {
  id: string;
  name: string;
  currentKm: number;
  changeKm: number;
  status: "good" | "warning" | "danger";
};

const dummyConsumables: Consumable[] = [
  {
    id: "1",
    name: "엔진오일",
    currentKm: 8080,
    changeKm: 15000,
    status: "good",
  },
  {
    id: "2",
    name: "연료 필터",
    currentKm: 8800,
    changeKm: 60000,
    status: "warning",
  },
  {
    id: "3",
    name: "타이어",
    currentKm: 30000,
    changeKm: 80000,
    status: "warning",
  },
  {
    id: "4",
    name: "미션오일",
    currentKm: 120000,
    changeKm: 140000,
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
        <View style={styles.consumablesList}>
          {dummyConsumables.map((consumable) => (
            <ConsumableStatus key={consumable.id} consumable={consumable} />
          ))}
        </View>
      </ScrollView>
      <AddConsumableButton />
    </SafeAreaView>
  );
}

function AddConsumableButton() {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.floatingButton,
        pressed && styles.pressedButton,
      ]}
    >
      <Text style={styles.floatingButtonText}>+</Text>
    </Pressable>
  );
}

function ConsumableStatus({ consumable }: { consumable: Consumable }) {
  const progress = Math.min(consumable.currentKm / consumable.changeKm, 1);
  const progressPercentage = Math.round(progress * 100);

  return (
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
      <View style={styles.kmInfoContainer}>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${progressPercentage}%`,
                backgroundColor: getStatusColor(consumable.status),
              },
            ]}
          />
        </View>
        <View style={styles.kmTextContainer}>
          <Text style={styles.kmText}>
            {consumable.currentKm.toLocaleString()} km
          </Text>
          <Text style={styles.kmText}>
            {consumable.changeKm.toLocaleString()} km
          </Text>
        </View>
      </View>
    </Pressable>
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
  },
  consumableName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  kmInfoContainer: {
    marginTop: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 8,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  kmTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  kmText: {
    fontSize: 12,
    color: "#666",
  },

  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  floatingButton: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonText: {
    fontSize: 24,
    color: "white",
  },
  pressedButton: {
    opacity: 0.8,
    backgroundColor: "#0056b3",
  },
});
