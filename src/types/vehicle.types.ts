import { Consumable } from "./consumable.types";

export type FuelType = "가솔린" | "디젤" | "전기" | "하이브리드";

export type Vehicle = {
  id: string;
  name: string;
  maker: string;
  model: string;
  year: number;
  image?: string;
  fuelType: FuelType;
  distance: number;
  buyDate: string;
  consumables: Consumable[];
};
