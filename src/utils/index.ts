import {
  MaintenanceItemRequest,
  MaintenanceItemResponse,
} from "../types/maintenanceItem.types";

export function toNumber(value: unknown): number {
  const n = Number(value);
  if (isNaN(n)) {
    throw new Error(`Invalid number value: ${value}`);
  }
  return n;
}

export function mapMaintenanceResponseToRequest(
  response: MaintenanceItemResponse
): MaintenanceItemRequest {
  return {
    name: response.name,
    category: response.category,
    cycleAlarm: response.cycleAlarm ?? false,
    kmAlarm: response.kmAlarm ?? false,
    replacementCycle: response.replacementCycle ?? 0,
    replacementKm: response.replacementKm ?? 0,
  };
}
