import { createContext, useContext, useEffect, useState } from "react";
import { Vehicle, VehicleModel } from "../types";
import apiClient from "../services/api";
import { useAuth } from "../hooks";

const initData: Vehicle = {
  id: "",
  name: "",
  maker: "",
  model: "",
  fuelType: "가솔린",
  nowKm: 0,
  startKm: 0,
  startDate: "",
  maintenanceItems: [],
};

interface VehicleAddContextType {
  vehicleData: Vehicle;
  vehicleModels: VehicleModel[];
  updateVehicleData: (newData: Partial<Vehicle>) => void;
  resetVehicleData: () => void;
}

const VehicleAddContext = createContext<VehicleAddContextType | null>(null);

export function VehicleAddProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const [vehicleData, setVehicleData] = useState<Vehicle>(
    JSON.parse(JSON.stringify(initData))
  );
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);

  useEffect(() => {
    fetchCarModels();
  }, [isAuthenticated]);

  function updateVehicleData(newData: Partial<Vehicle>) {
    setVehicleData((prev) => ({ ...prev, ...newData }));
  }

  function resetVehicleData() {
    setVehicleData(JSON.parse(JSON.stringify(initData)));
  }

  async function fetchCarModels() {
    try {
      const res = await apiClient.get("/api/car");
      if (res && res.status === 200) {
        const { data } = res.data;
        setVehicleModels(data);
      }
    } catch (error) {
      console.error("Error fetching car makers", error);
    }
  }

  return (
    <VehicleAddContext.Provider
      value={{
        vehicleData,
        updateVehicleData,
        resetVehicleData,
        vehicleModels: vehicleModels,
      }}
    >
      {children}
    </VehicleAddContext.Provider>
  );
}

export const useVehicleAdd = (): VehicleAddContextType => {
  const context = useContext(VehicleAddContext);
  if (!context) {
    throw new Error(
      "useVehicleRegistration must be used within a VehicleRegistrationProvider"
    );
  }
  return context;
};
