import { Vehicle } from "../types";

export const dummyCars: Vehicle[] = [
  {
    id: 1,
    name: "내 차",
    maker: "현대",
    model: "아반떼",
    startDate: new Date("2020-02-15"),
    startKm: 0,
    nowKm: 15000,
    image: "https://placehold.co/100x100@3x.png",
    maintenanceItems: [],
  },
];
