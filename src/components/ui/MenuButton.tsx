import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../../hooks/useThemeColor";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

export function MenuButton({
  text,
  description,
  size,
  iconName,
}: {
  text: string;
  description?: string;
  size: number;
  iconName: IoniconsName;
}) {
  const color = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");

  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuItem,
        { backgroundColor },
        pressed && styles.pressedItem,
      ]}
    >
      <Ionicons name={iconName} size={size} color={color} />
      <View>
        <Text style={styles.text}>{text}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    marginVertical: 2,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
    // iOS용 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android용 그림자
    elevation: 1,
  },
  pressedItem: {
    backgroundColor: "#f5f5f5",
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  description: {
    fontSize: 12,
    color: "#666",
  },
  arrow: {
    fontSize: 20,
    color: "#999",
    marginLeft: "auto",
  },
});
