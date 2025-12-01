import { useAuthStore } from '../stores/authStore';

export function useAuth() {
  const {
    user,
    preferences,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    fetchProfile,
    fetchPreferences,
    updatePreferences,
    clearError,
    checkAuth,
  } = useAuthStore();

  return {
    user,
    preferences,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    fetchProfile,
    fetchPreferences,
    updatePreferences,
    clearError,
    checkAuth,
  };
}
