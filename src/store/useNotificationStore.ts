import { create } from "zustand";
import { apiClient } from "../services/api";
import { API_ENDPOINTS } from "../services/apiEndpoints";

export type Notification = {
  id: number;
  title: string;
  message: string;
  type: string;
  maintenanceItemId: number;
  createdAt: Date;
  read: boolean;
};

type NotificationStore = {
  notifications: Notification[];
  allNotifications: Notification[];
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: number) => void;
  markAsReadAll: () => void;
  deleteNotification: (id: number) => void;
  deleteAllNotifications: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  allNotifications: [],
  unreadCount: 0,
  fetchNotifications: async () => {
    const { method, url } = API_ENDPOINTS.NOTIFICATION.LIST;
    try {
      const res = await apiClient.request<Notification[]>({
        method,
        url,
      });
      if (res.status === 200) {
        set({
          notifications: res.data,
          allNotifications: res.data,
          unreadCount: res.data.filter((n) => !n.read).length,
        });
        console.log("알림 조회 성공:", res.data);
      }
    } catch (error) {
      console.error("알림 조회 실패:", error);
    }
  },
  setNotifications: (notifications) =>
    set(() => {
      return { notifications };
    }),
  markAsRead: (id) =>
    set((state) => {
      const { method, url } = API_ENDPOINTS.NOTIFICATION.READ;
      apiClient.request({
        method,
        url: url.replace("{id}", String(id)),
      });
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),
  markAsReadAll: () =>
    set((state) => {
      const { method, url } = API_ENDPOINTS.NOTIFICATION.READ_ALL;
      apiClient.request({
        method,
        url,
      });
      const updated = state.notifications.map((n) => ({ ...n, read: true }));
      return {
        notifications: updated,
        unreadCount: 0,
      };
    }),
  deleteNotification: (id) =>
    set((state) => {
      const { method, url } = API_ENDPOINTS.NOTIFICATION.DELETE;
      apiClient.request({
        method,
        url: url.replace("{id}", String(id)),
      });
      const updated = state.notifications.filter((n) => n.id !== id);
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),
  deleteAllNotifications: () =>
    set(() => {
      const { method, url } = API_ENDPOINTS.NOTIFICATION.CLEAR;
      apiClient.request({
        method,
        url,
      });

      return {
        notifications: [],
        unreadCount: 0,
      };
    }),
}));
