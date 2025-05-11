import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  color?: string;
  className?: string;
}

export function IconButton({
  iconName,
  onPress,
  size = 24,
  color = "black",
  className,
}: IconButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className={className}>
      <Ionicons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
}
