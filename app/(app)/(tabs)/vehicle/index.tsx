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
import { Vehicle } from "@/src/types";
import { VehicleCard } from "@/src/components/vehicle";
import { FloatingButton } from "@/src/components";

const dummyCars: Vehicle[] = [
  {
    id: "1",
    name: "내 차",
    model: "아반떼",
    year: "2020",
    fuelType: "가솔린",
    distance: 15000,
    image: "https://placehold.co/100x100@3x.png",
    lastMaintenance: "2024-02-15",
    nextMaintenance: "2024-05-15",
    consumables: [
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
    ],
  },
  {
    id: "2",
    name: "회사 차",
    model: "소나타",
    year: "2021",
    fuelType: "가솔린",
    distance: 35000,
    image: "https://placehold.co/100x100@3x.png",
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-04-20",
    consumables: [
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
    ],
  },
];

export default function VehicleScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.vehicleList}>
          {dummyCars.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </View>
      </ScrollView>
      <FloatingButton label={"+"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  vehicleList: {
    padding: 16,
  },
});
