import { Consumable } from "./consumable.types";

export type Vehicle = {
  id: string;
  name: string;
  model: string;
  year: string;
  image: string;
  fuelType: "가솔린" | "디젤" | "전기";
  distance: number;
  lastMaintenance: string;
  nextMaintenance: string;
  consumables: Consumable[];
};
