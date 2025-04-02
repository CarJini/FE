import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";
import { Consumable } from "@/src/types";
import { ConsumableStatus } from "@/src/components/vehicle";
import { FloatingButton } from "@/src/components";
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

export default function VehicleInfoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.consumablesList}>
          {dummyConsumables.map((consumable) => (
            <ConsumableStatus key={consumable.id} consumable={consumable} />
          ))}
        </View>
      </ScrollView>
      <FloatingButton label={"+"} />
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
});
