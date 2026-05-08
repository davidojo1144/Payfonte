import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  setToken: async (token: string) => {
    await SecureStore.setItemAsync('auth_token', token);
    set({ token, isAuthenticated: true });
  },
  logout: async () => {
    await SecureStore.deleteItemAsync('auth_token');
    set({ token: null, isAuthenticated: false });
  },
  checkAuth: async () => {
    const token = await SecureStore.getItemAsync('auth_token');
    if (token) {
      set({ token, isAuthenticated: true });
    } else {
      set({ token: null, isAuthenticated: false });
    }
  },
}));
