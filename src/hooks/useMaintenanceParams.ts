import { useRoute } from "@react-navigation/native";

export function useMaintenanceParams() {
  const route = useRoute();
  const params = route.params as {
    vehicleId: string;
    itemId: string;
    historyId?: string;
    mode?: string;
  };

  return {
    vehicleId: Number(params?.vehicleId),
    itemId: Number(params?.itemId),
    historyId: params?.historyId ? Number(params?.historyId) : undefined,
    isEditMode: params?.mode === "edit",
  };
}
