import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

export function MenuButton({
  text,
  description,
  size,
  iconName,
  onPress,
}: {
  text: string;
  description?: string;
  size: number;
  iconName: IoniconsName;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white p-3 mb-1 rounded-xl active:bg-gray-200 flex-row items-center border border-gray-200"
      style={({ pressed }) => [pressed && { opacity: 0.8 }]}
    >
      <Ionicons name={iconName} size={size} />
      <View>
        <Text className="flex-1 ml-3 text-lg">{text}</Text>
        {description && (
          <Text className="text-sm text-gray-300">{description}</Text>
        )}
      </View>
      <Text className="ml-auto text-xl text-gray-400">›</Text>
    </Pressable>
  );
}
