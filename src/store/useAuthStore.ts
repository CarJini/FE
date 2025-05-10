import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/src/types";

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  signOut: async () => {
    await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
    set({ user: null });
  },
}));
