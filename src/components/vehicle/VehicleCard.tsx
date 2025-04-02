import { Vehicle } from "@/src/types";
import { View, Image, Text, StyleSheet } from "react-native";
import { Divider } from "../ui/Divider";
import { ConsumableStatus } from "./ConsumableStatus";
import { ClickableCard } from "../ui/ClickableCard";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <ClickableCard style={styles.vehicleCard}>
      <View style={styles.vehicleArea}>
        <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />
        <View style={styles.vehicleSummary}>
          <View style={styles.vehicleInfo}>
            <View>
              <Text style={styles.vehicleName}>{vehicle.name}</Text>
              <Text style={styles.vehicleModel}>
                {vehicle.model} ({vehicle.year})
              </Text>
            </View>
            <View>
              <Text style={styles.vehicleDistance}>
                {vehicle.distance.toLocaleString()}km
              </Text>
            </View>
          </View>
          <View style={styles.maintenanceInfo}>
            <View style={styles.maintenanceItem}>
              <Text style={styles.maintenanceItemCount}>3</Text>
              <Text style={styles.maintenanceItemLabel}>점검 필요</Text>
            </View>
            <Divider length={"70%"} />
            <View style={styles.maintenanceItem}>
              <Text style={styles.maintenanceItemCount}>5</Text>
              <Text style={styles.maintenanceItemLabel}>정상</Text>
            </View>
            <Divider length={"70%"} />
            <View style={styles.maintenanceItem}>
              <Text style={styles.maintenanceItemCount}>2</Text>
              <Text style={styles.maintenanceItemLabel}>예정</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.consumablesSummary}>
        {vehicle.consumables.map((consumable, idx) => (
          <View key={consumable.id} style={styles.consumable}>
            <ConsumableStatus consumable={consumable} />
            {idx !== vehicle.consumables.length - 1 && (
              <Divider length={"100%"} orientation={"horizontal"} />
            )}
          </View>
        ))}
      </View>
    </ClickableCard>
  );
}

const styles = StyleSheet.create({
  vehicleCard: {
    gap: 16,
    marginBottom: 16,
  },
  pressedCard: {
    opacity: 0.8,
  },
  vehicleArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  vehicleSummary: {
    flex: 1,
  },
  vehicleImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  vehicleInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  vehicleDistance: {
    backgroundColor: "#eee",
    padding: 6,
    borderRadius: 8,
    color: "#007AFF",
  },
  maintenanceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    height: 60,
  },
  maintenanceItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  maintenanceItemCount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  maintenanceItemLabel: {
    fontSize: 12,
    color: "#666",
  },
  consumablesSummary: {
    flexDirection: "column",
    gap: 10,
  },
  consumable: {
    flexDirection: "column",
    gap: 10,
  },
});
