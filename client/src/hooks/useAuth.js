import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

/**
 * Custom hook to manage authentication state and lifecycle.
 * It automatically checks the user's session on initial load.
 */
export const useAuth = () => {
  const { user, isAuthenticated, loading, checkAuth, login, logout } = useAuthStore();

  useEffect(() => {
    // If we haven't checked auth yet, check it on mount
    if (!isAuthenticated && loading) {
      checkAuth();
    }
  }, [isAuthenticated, loading, checkAuth]);

  return { 
    user, 
    isAuthenticated, 
    isLoading: loading, 
    login, 
    logout 
  };
};

export default useAuth;