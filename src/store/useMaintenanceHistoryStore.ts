import { create } from "zustand";
import { MaintenanceHistory } from "../types";

type MaintenanceHistoryState = {
  current: MaintenanceHistory | null;
  setCurrent: (item: MaintenanceHistory) => void;
  clear: () => void;
};

export const useMaintenanceHistoryStore = create<MaintenanceHistoryState>(
  (set) => ({
    current: null,
    setCurrent: (item) => set({ current: item }),
    clear: () => set({ current: null }),
  })
);
