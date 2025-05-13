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
      url: "/api/car/{carOwnerId}/maintenance-items/{maintenanceItemId}/maintenance-history/{id}",
    },
    DELETE: {
      method: "DELETE",
      url: "/api/car/{carOwnerId}/maintenance-items/{maintenanceItemId}/maintenance-history/{id}",
    },
    CREATE: {
      method: "POST",
      url: "/api/car/{carOwnerId}/maintenance-items/{maintenanceItemId}/maintenance-history",
    },
    LIST: {
      method: "GET",
      url: "/api/car/{carOwnerId}/maintenance-items/{maintenanceItemId}/maintenance-history",
    },
  },
  CHATBOT: {
    MESSAGE: {
      method: "POST",
      url: "/api/chatbot/{carOwnerId}",
    },
    HISTORY: {
      method: "GET",
      url: "/api/chatbot/history/{carOwnerId}",
    },
  },
  NOTIFICATION: {
    READ: {
      method: "PUT",
      url: "/api/notification/{id}/read",
    },
    READ_ALL: {
      method: "PUT",
      url: "/api/notification/read-all",
    },
    LIST: {
      method: "GET",
      url: "/api/notification",
    },
    CLEAR: {
      method: "DELETE",
      url: "/api/notification",
    },
    GET: {
      method: "GET",
      url: "/api/notification/{id}",
    },
    DELETE: {
      method: "DELETE",
      url: "/api/notification/{id}",
    },
    UNREAD: {
      method: "GET",
      url: "/api/notification/unread",
    },
  },
};
