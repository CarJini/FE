export type MaintenanceItemStatusType = "danger" | "good" | "warning";
export type MaintenanceItem = {
  id: string;
  name: string;
  replacementCycle?: string;
  remainingKm: number;
  iconColor: string;
  lastReplacementDate: string | Date;
  status: MaintenanceItemStatusType;
  kmProgress?: number;
  dayProgress?: number;
};
