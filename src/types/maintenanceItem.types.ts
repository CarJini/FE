// export type MaintenanceItemStatusType = "danger" | "good" | "warning";
export type MaintenanceItemStatusType = "주의" | "교체 필요" | "양호";
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

export type MaintenanceItemMap = Record<number, MaintenanceItem[]>;

export type MaintenanceItem = {
  id: number;
  name: string;
  category: MaintenanceItemCategoryType;
  cycleAlarm?: boolean;
  replacementCycle?: string;
  lastReplacementDate: string | Date;
  status: MaintenanceItemStatusType;
  progress?: number;
  kmAlarm?: boolean;
  remainingKm?: number;
  replacementKm?: number;
  kmProgress?: number;
  dayProgress?: number;
};
