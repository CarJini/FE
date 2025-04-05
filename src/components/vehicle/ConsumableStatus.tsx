import { Consumable } from "@/src/types";
import { View, Text, StyleSheet } from "react-native";

export function ConsumableStatus({ consumable }: { consumable: Consumable }) {
  const progress = Math.min(consumable.currentKm / consumable.changeKm, 1);
  const progressPercentage = Math.round(progress * 100);

  return (
    <View>
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
    </View>
  );
}

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

const styles = StyleSheet.create({
  consumableHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  consumableName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  kmInfoContainer: {
    marginTop: 4,
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
});
