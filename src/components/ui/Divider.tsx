import { View, ViewStyle } from "react-native";

export function Divider({
  color = "#e0e0e0",
  size = 1,
  length = "80%",
  orientation = "vertical",
}: {
  color?: string;
  size?: number;
  length?: number | string;
  orientation?: "vertical" | "horizontal";
}) {
  return (
    <View
      style={[
        {
          backgroundColor: color,
          ...(orientation === "vertical"
            ? { width: size, height: length as unknown as number }
            : { height: size, width: length as unknown as number }),
        } as ViewStyle,
      ]}
    />
  );
}
