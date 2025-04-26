import { Pressable, Text } from "react-native";

export function Button({
  label,
  color = "primary",
  className,
  onPress,
}: {
  label: string;
  color?: "primary" | "secondary" | "success";
  className?: string;
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
      className={`p-3 rounded-lg mt-3 ${colorMap[color]} ${className || ""}`}
      onPress={onPress}
    >
      <Text className={`text-center ${textColorMap[color]}`}>{label}</Text>
    </Pressable>
  );
}
