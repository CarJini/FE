import { createContext, useContext, useState } from "react";
import { Vehicle } from "../types";

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
  updateVehicleData: (newData: Partial<Vehicle>) => void;
  resetVehicleData: () => void;
}

const VehicleAddContext = createContext<VehicleAddContextType | null>(null);

export function VehicleAddProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [vehicleData, setVehicleData] = useState<Vehicle>(
    JSON.parse(JSON.stringify(initData))
  );

  const updateVehicleData = (newData: Partial<Vehicle>) => {
    setVehicleData((prev) => ({ ...prev, ...newData }));
  };

  const resetVehicleData = () => {
    setVehicleData(JSON.parse(JSON.stringify(initData)));
  };

  return (
    <VehicleAddContext.Provider
      value={{
        vehicleData,
        updateVehicleData,
        resetVehicleData,
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
