import { create } from 'zustand';
import type { AuthProfile, UserPreferences, RegisterRequest, UpdateProfileRequest } from '../types';
import { api } from '../services/api';
import { getErrorMessage } from '../utils/errorHandler';

interface AuthState {
  user: AuthProfile | null;
  preferences: UserPreferences | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: UpdateProfileRequest) => Promise<void>;
  fetchPreferences: () => Promise<void>;
  updatePreferences: (preferences: UserPreferences) => Promise<void>;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  preferences: null,
  isAuthenticated: api.isAuthenticated(),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.login({ email, password });
      const profile = await api.getProfile();
      set({ user: profile, isAuthenticated: true, isLoading: false });
      // Fetch preferences after login
      get().fetchPreferences();
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
      throw error;
    }
  },

  register: async (data: RegisterRequest) => {
    set({ isLoading: true, error: null });
    try {
      await api.register(data);
      set({ isLoading: false });
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
      throw error;
    }
  },

  logout: () => {
    api.logout();
    set({ user: null, preferences: null, isAuthenticated: false, error: null });
  },

  fetchProfile: async () => {
    if (!api.isAuthenticated()) return;
    
    set({ isLoading: true });
    try {
      const profile = await api.getProfile();
      set({ user: profile, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false, isAuthenticated: false });
    }
  },

  updateProfile: async (data: UpdateProfileRequest) => {
    set({ isLoading: true, error: null });
    try {
      const profile = await api.updateProfile(data);
      set({ user: profile, isLoading: false });
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
      throw error;
    }
  },

  fetchPreferences: async () => {
    if (!api.isAuthenticated()) return;
    
    try {
      const preferences = await api.getPreferences();
      set({ preferences });
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  },

  updatePreferences: async (preferences: UserPreferences) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await api.updatePreferences(preferences);
      set({ preferences: updated, isLoading: false });
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  checkAuth: async () => {
    if (!api.isAuthenticated()) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    try {
      const profile = await api.getProfile();
      set({ user: profile, isAuthenticated: true });
      get().fetchPreferences();
    } catch {
      api.logout();
      set({ isAuthenticated: false, user: null });
    }
  },
}));
