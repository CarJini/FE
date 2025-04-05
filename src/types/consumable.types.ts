export type ConsumableStatusType = "danger" | "good" | "warning";
export type Consumable = {
  id: string;
  name: string;
  currentKm: number;
  changeKm: number;
  status: ConsumableStatusType;
};
