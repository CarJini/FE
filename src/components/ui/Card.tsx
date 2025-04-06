import { StyleProp, View, ViewStyle } from "react-native";

export function Card({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}) {
  return (
    <View
      className={`p-4 bg-white active:bg-gray-200 rounded-xl border border-gray-200 ${
        className || ""
      }`}
      style={style}
    >
      {children}
    </View>
  );
}
