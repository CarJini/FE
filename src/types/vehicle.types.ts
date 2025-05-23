import { MaintenanceItemResponse } from "./maintenanceItem.types";

export type FuelType = "가솔린" | "디젤" | "전기" | "하이브리드";

export type Vehicle = {
  id: number;
  name: string;
  maker: string;
  model: string;
  image?: string;
  startDate: Date;
  startKm: number;
  nowKm: number;
  maintenanceItems: MaintenanceItemResponse[];
};

export type VehicleModel = {
  id: number;
  image: string;
  brand: string;
  model: string;
  startDate: Date;
  startKm: number;
  nowKm: number;
};
