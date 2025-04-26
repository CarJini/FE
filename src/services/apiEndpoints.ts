export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: {
      method: "GET",
      url: "/api/auth/login/google",
    },
    REFRESH_TOKEN: {
      method: "POST",
      url: "/api/auth/token/refresh",
    },
  },
  USER: {
    UPDATE_NICKNAME: {
      method: "PUT",
      url: "/api/profile/nickname",
    },
    UPDATE_FCM_TOKEN: {
      method: "PUT",
      url: "/api/profile/fcm-token",
    },
    PROFILE: {
      method: "GET",
      url: "/api/profile",
    },
  },
  VEHICLE: {
    MODELS: {
      method: "GET",
      url: "/api/car",
    },
    CREATE: {
      method: "POST",
      url: "/api/car-owner",
    },
    MY_CARS: {
      method: "GET",
      url: "/api/car-owner",
    },
    UPDATE: {
      method: "PUT",
      url: "/api/car-owner/{carOwnerId}",
    },
    DELETE: {
      method: "DELETE",
      url: "/api/car-owner/{carOwnerId}",
    },
  },
  MAINTENANCE_ITEM: {
    DETAIL: {
      method: "GET",
      url: "/api/car/{carOwnerId}/maintenance-items/{id}",
    },
    UPDATE: {
      method: "PUT",
      url: "/api/car/{carOwnerId}/maintenance-items/{id}",
    },
    DELETE: {
      method: "DELETE",
      url: "/api/car/{carOwnerId}/maintenance-items/{id}",
    },
    LIST: {
      method: "GET",
      url: "/api/car/{carOwnerId}/maintenance-items",
    },
    CREATE: {
      method: "POST",
      url: "/api/car/{carOwnerId}/maintenance-items",
    },
  },
  MAINTENANCE_HISTORY: {
    UPDATE: {
      method: "PUT",
      url: "/api/car/{carOwnerId}/maintenance-items/{maintenanceItemId}/maintenance-history",
    },
    CREATE: {
      method: "POST",
      url: "/api/maintenance-history",
    },
    DELETE: {
      method: "DELETE",
      url: "/api/maintenance-history/{historyId}",
    },
    LIST: {
      method: "GET",
      url: "/api/maintenance-history",
    },
  },
};
