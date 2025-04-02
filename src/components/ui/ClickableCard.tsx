import { Pressable, StyleSheet, ViewStyle, StyleProp } from "react-native";

interface ClickableCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function ClickableCard({
  children,
  style,
  onPress,
}: ClickableCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        style,
        pressed && styles.pressedCard,
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    // iOS용 그림자
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android용 그림자
    elevation: 2,
  },
  pressedCard: {
    opacity: 0.8,
  },
});
