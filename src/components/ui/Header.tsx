import { View, Text, ViewStyle } from "react-native";

interface HeaderProps {
  title: string;
  Left?: React.ReactNode;
  Right?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export function Header({ title, Left, Right, containerStyle }: HeaderProps) {
  return (
    <View
      className="flex-row items-center justify-between p-4 border-b border-gray-200 bg-white"
      style={containerStyle}
    >
      <View className="flex-row items-center">{Left}</View>
      <Text className="text-lg font-semibold">{title}</Text>
      <View className="flex-row items-center">{Right}</View>
    </View>
  );
}
