import { create } from 'zustand';
import api from '../lib/api';

/**
 * Global store for managing user identity and authentication status.
 */
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true, // Starts true to prevent UI flashes before initial auth check
  error: null,

  // Verify session cookie on initial app load
  checkAuth: async () => {
    try {
      const res = await api.get('/users/profile');
      set({ 
        user: res.data.data, 
        isAuthenticated: true, 
        loading: false,
        error: null 
      });
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false 
      });
    }
  },

  // Authenticate user and update store
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/auth/login', { email, password });
      set({ 
        user: res.data.data.user, 
        isAuthenticated: true, 
        loading: false 
      });
    } catch (error) {
      set({ 
        loading: false, 
        error: error.message 
      });
      throw error;
    }
  },

  // Destroy session cookie and clear store
  logout: async () => {
    set({ loading: true });
    try {
      await api.post('/auth/logout');
      set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false 
      });
    } catch (error) {
      set({ loading: false });
      console.error("Logout failed:", error);
    }
  }
}));