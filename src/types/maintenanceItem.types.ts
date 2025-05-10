export type MaintenanceItemStatusType = "예상" | "점검 필요" | "정상";
export type MaintenanceItemCategoryType =
  | "ENGINE_OIL"
  | "BRAKE_PAD"
  | "TIRE"
  | "AIR_FILTER"
  | "COOLANT";

export const MaintenanceItemCategoryOptions = [
  { value: "ENGINE_OIL", label: "엔진 오일" },
  { value: "BRAKE_PAD", label: "브레이크 패드" },
  { value: "TIRE", label: "타이어" },
  { value: "AIR_FILTER", label: "에어 필터" },
  { value: "COOLANT", label: "냉각수" },
] as const;

export type MaintenanceItemResponseMap = Record<
  number,
  MaintenanceItemResponse[]
>;

type BaseMaintenanceItem = {
  name: string;
  category: MaintenanceItemCategoryType;
  cycleAlarm: boolean;
  kmAlarm: boolean;
  replacementCycle: number;
  replacementKm: number;
};

export type MaintenanceItemRequest = BaseMaintenanceItem;

export type MaintenanceItemResponse = BaseMaintenanceItem & {
  id: number;
  status: MaintenanceItemStatusType;
  remainingKm: number;
  remainingDay: number;
  kmProgress: number;
  dayProgress?: number;
};
