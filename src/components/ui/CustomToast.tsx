// CustomToast.tsx
import { View, Text } from "react-native";
import { ToastConfigParams } from "react-native-toast-message";

function SimpleToast({
  text1,
  text2,
  type,
}: ToastConfigParams<any> & { type: "success" | "error" | "info" }) {
  const emoji = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";

  return (
    <View
      style={{
        backgroundColor: "#111827", // 진회색
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 50,
        shadowColor: "transparent",
      }}
    >
      <Text
        style={{
          color: "#f9fafb",
          fontSize: 14,
          fontWeight: "600",
        }}
      >
        {`${emoji} ${text1}`}
      </Text>
      {text2 && (
        <Text
          style={{
            color: "#d1d5db",
            fontSize: 12,
            marginTop: 2,
          }}
        >
          {text2}
        </Text>
      )}
    </View>
  );
}

export const toastConfig = {
  success: (props: ToastConfigParams<any>) => (
    <SimpleToast {...props} type="success" />
  ),
  error: (props: ToastConfigParams<any>) => (
    <SimpleToast {...props} type="error" />
  ),
  info: (props: ToastConfigParams<any>) => (
    <SimpleToast {...props} type="info" />
  ),
};
