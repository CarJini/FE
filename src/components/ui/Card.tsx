import { View } from "react-native";

export function Card({
  children,
  customClassName,
}: {
  children: React.ReactNode;
  customClassName?: string;
}) {
  return (
    <View
      className={`p-4 bg-white active:bg-gray-200 rounded-xl border border-gray-200 ${
        customClassName || ""
      }`}
    >
      {children}
    </View>
  );
}
