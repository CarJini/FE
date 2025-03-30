export interface User {
  id: number;
  email: string;
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<{ success: boolean; error?: any }>;
  signOut: () => Promise<void>;
}
