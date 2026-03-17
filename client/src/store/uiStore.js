import { create } from 'zustand';

/**
 * Global store for managing UI states like sidebars, modals, 
 * or global loading overlays. 
 * Prevents "prop-drilling" across deeply nested layout components.
 */
export const useUiStore = create((set) => ({
  isSidebarOpen: false,
  globalLoading: false,
  activeModal: null, // e.g., 'DONATION_MODAL', 'SHARE_MODAL', or null

  // Sidebar Controls
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  // Global Loading State (useful for full-screen network request blocking)
  setGlobalLoading: (status) => set({ globalLoading: status }),

  // Modal Controls
  openModal: (modalName) => set({ activeModal: modalName }),
  closeModal: () => set({ activeModal: null }),
}));