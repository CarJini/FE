import { createContext, useContext, useState } from "react";
import {
  MaintenanceItemResponse,
  MaintenanceItemResponseMap,
  Vehicle,
  VehicleModel,
} from "../types";
import { apiClient } from "../services/api";
import { API_ENDPOINTS } from "../services/apiEndpoints";
import { startOfDay } from "date-fns/fp";
import { cloneDeep } from "lodash";

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

interface VehicleContextType {
  vehicleData: Vehicle;
  vehicleModels: VehicleModel[];
  myVehicles: VehicleModel[];
  updateVehicleData: (newData: Partial<Vehicle>) => void;
  resetVehicleData: () => void;
  fetchCarModels: () => void;
  fetchMyVehicles: () => void;
  fetchMaintenanceItems: (vehicleId: string | number) => void;
  maintenanceItemsByVehicle: MaintenanceItemResponseMap;
}

const VehicleContext = createContext<VehicleContextType | null>(null);

export function VehicleProvider({ children }: { children: React.ReactNode }) {
  const [vehicleData, setVehicleData] = useState<Vehicle>(cloneDeep(initData));
  const [myVehicles, setMyVehicles] = useState<VehicleModel[]>([]);
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
  const [maintenanceItemsByVehicle, setMaintenanceItemsByVehicle] =
    useState<MaintenanceItemResponseMap>({});

  function updateVehicleData(newData: Partial<Vehicle>) {
    setVehicleData((prev) => ({ ...prev, ...newData }));
  }

  function resetVehicleData() {
    setVehicleData(cloneDeep(initData));
  }

  async function fetchMaintenanceItems(vehicleId: string | number) {
    try {
      const { method, url } = API_ENDPOINTS.MAINTENANCE_ITEM.LIST;
      const carOwnerId =
        typeof vehicleId === "string" ? vehicleId : vehicleId.toString();
      const finalUrl = url.replace("{carOwnerId}", carOwnerId.toString());
      const res = await apiClient.request<{
        data: {
          content: MaintenanceItemResponse[];
        };
      }>({
        method,
        url: finalUrl,
        params: {
          page: 0,
          size: 100,
          sort: "DESC",
        },
      });
      if (res.status === 200) {
        console.log(
          'Fetching maintenance items for vehicle ID:", vehicleId);',
          { data: res.data.data.content }
        );

        setMaintenanceItemsByVehicle((prev) => ({
          ...prev,
          [vehicleId]: res.data.data.content,
        }));
      }
    } catch (error) {
      console.error("Error saving maintenance item:", error);
    }
  }

  async function fetchCarModels() {
    try {
      const { method, url } = API_ENDPOINTS.VEHICLE.MODELS;
      const res = await apiClient.request({ method, url });
      if (res && res.status === 200) {
        const { data } = res.data;
        setVehicleModels(data);
      }
    } catch (error) {
      console.error("Error fetching car makers", error);
    }
  }

  async function fetchMyVehicles() {
    try {
      // TODO: 가져오는 아이템으로 렌더링하기
      // 매번 가져오지 않게 개선필요
      const { method, url } = API_ENDPOINTS.VEHICLE.MY_CARS;
      const res = await apiClient.request<{ data: VehicleModel[] }>({
        method,
        url,
      });
      if (res && res.status === 200) {
        const response = res.data.data;
        setMyVehicles(response);
      }
    } catch (error) {
      console.error("Error fetching vehicles", error);
    }
  }

  return (
    <VehicleContext.Provider
      value={{
        vehicleData,
        updateVehicleData,
        resetVehicleData,
        vehicleModels,
        myVehicles,
        maintenanceItemsByVehicle,
        fetchCarModels,
        fetchMyVehicles,
        fetchMaintenanceItems,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
}

export const useVehicleAdd = (): VehicleContextType => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error(
      "useVehicleRegistration must be used within a VehicleRegistrationProvider"
    );
  }
  return context;
};
