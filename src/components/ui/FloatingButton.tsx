import { Pressable, Text } from "react-native";

export function FloatingButton({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      className="absolute right-5 bottom-5 w-12 h-12 items-center justify-center bg-blue-500 active:bg-blue-300 rounded-xl"
      onPress={onPress}
    >
      <Text className="text-3xl text-white">{label}</Text>
    </Pressable>
  );
}
