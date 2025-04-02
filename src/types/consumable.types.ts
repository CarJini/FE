export type Consumable = {
  id: string;
  name: string;
  currentKm: number;
  changeKm: number;
  status: "good" | "warning" | "danger";
};
