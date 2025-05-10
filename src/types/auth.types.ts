export interface User {
  email: string;
  name: string;
  profile: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasUser: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}
