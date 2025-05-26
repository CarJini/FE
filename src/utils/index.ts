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
    alarm: response.alarm ?? false,
    replacementCycle: response.replacementCycle ?? 0,
    replacementKm: response.replacementKm ?? 0,
  };
}

export function replacePathParams(
  url: string,
  params: Record<string, string | number>
): string {
  return url.replace(/{([^}]+)}/g, (_, key) => {
    const value = params[key];
    if (value === undefined) {
      throw new Error(`Missing parameter for: ${key}`);
    }
    return encodeURIComponent(String(value));
  });
}
