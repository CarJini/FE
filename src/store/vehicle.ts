import { create } from "zustand";
import { Vehicle, VehicleModel, MaintenanceItemResponseMap } from "../types";
import { startOfDay } from "date-fns/fp";
import { cloneDeep } from "lodash";
import { API_ENDPOINTS } from "../services/apiEndpoints";
import { apiClient } from "../services/api";
import { replacePathParams } from "../utils";

const initData: Vehicle = {
  id: 0,
  name: "",
  maker: "",
  model: "",
  nowKm: 0,
  startKm: 0,
  startDate: startOfDay(new Date()),
  maintenanceItems: [],
};

interface VehicleStore {
  vehicleData: Vehicle;
  vehicleModels: VehicleModel[];
  myVehicles: VehicleModel[];
  maintenanceItemsByVehicle: MaintenanceItemResponseMap;

  updateVehicleData: (
    updater: Partial<Vehicle> | ((prev: Vehicle) => Vehicle)
  ) => void;
  resetVehicleData: () => void;

  fetchCarModels: () => Promise<void>;
  fetchMyVehicles: () => Promise<void>;
  fetchMaintenanceItems: (vehicleId: string | number) => Promise<void>;
}

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicleData: cloneDeep(initData),
  vehicleModels: [],
  myVehicles: [],
  maintenanceItemsByVehicle: {},

  updateVehicleData: (updater) =>
    set((state) => {
      const nextVehicle =
        typeof updater === "function"
          ? updater(state.vehicleData)
          : { ...state.vehicleData, ...updater };
      return { vehicleData: nextVehicle };
    }),
  resetVehicleData: () => set({ vehicleData: cloneDeep(initData) }),

  fetchCarModels: async () => {
    const { method, url } = API_ENDPOINTS.VEHICLE.MODELS;
    const res = await apiClient.request({ method, url });
    if (res.status === 200) {
      set({ vehicleModels: res.data.data });
    }
  },

  fetchMyVehicles: async () => {
    const { method, url } = API_ENDPOINTS.VEHICLE.MY_CARS;
    const res = await apiClient.request({ method, url });
    if (res.status === 200) {
      set({ myVehicles: res.data.data });
    }
  },

  fetchMaintenanceItems: async (vehicleId) => {
    const { method, url } = API_ENDPOINTS.MAINTENANCE_ITEM.LIST;
    const res = await apiClient.request({
      method,
      url: replacePathParams(url, {
        carOwnerId: vehicleId.toString(),
      }),
      params: {
        page: 0,
        size: 100,
        sort: "DESC",
      },
    });

    if (res.status === 200) {
      set((state) => ({
        maintenanceItemsByVehicle: {
          ...state.maintenanceItemsByVehicle,
          [vehicleId]: res.data.data.content,
        },
      }));
    }
  },
}));
