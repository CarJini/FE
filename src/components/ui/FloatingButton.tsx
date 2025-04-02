import {
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

export function FloatingButton({
  label,
  style,
  onPress,
}: {
  label: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.floatingButton,
        style,
        pressed && styles.pressedButton,
      ]}
      onPress={onPress}
    >
      <Text style={styles.floatingButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
    // iOS용 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android용 그림자
    elevation: 8,
  },
  pressedButton: {
    opacity: 0.8,
    backgroundColor: "#0056b3",
  },
  floatingButtonText: {
    fontSize: 24,
    color: "white",
  },
});
