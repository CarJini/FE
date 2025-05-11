import { Pressable, Text } from "react-native";

export function Button({
  label,
  color = "primary",
  customClassName,
  onPress,
}: {
  label: string;
  color?: "primary" | "secondary" | "success";
  customClassName?: string;
  onPress: () => void;
}) {
  const colorMap = {
    primary: "bg-blue-500 active:bg-blue-300 ",
    secondary: "bg-white active:bg-gray-100 border border-red-300 ",
    success: "bg-green-500 active:bg-green-300 ",
  };
  const textColorMap = {
    primary: "text-white ",
    secondary: "text-red-500 ",
    success: "text-white ",
  };
  return (
    <Pressable
      className={`w-full p-3 rounded-lg mt-3 ${colorMap[color]} ${
        customClassName || ""
      }`}
      onPress={onPress}
    >
      <Text className={`text-center ${textColorMap[color]}`}>{label}</Text>
    </Pressable>
  );
}
