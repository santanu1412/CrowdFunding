import { create } from 'zustand';
import api from '../lib/api';

/**
 * Global store for managing campaign data.
 * Includes a real-time update helper for Socket.io integration.
 */
export const useCampaignStore = create((set, get) => ({
  campaigns: [],
  currentCampaign: null,
  loading: false,
  error: null,

  // Fetch a list of campaigns (supports search, filters, pagination)
  fetchCampaigns: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const queryString = new URLSearchParams(params).toString();
      const res = await api.get(`/campaigns?${queryString}`);
      set({ 
        campaigns: res.data.data, 
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch a specific campaign's details
  fetchCampaignById: async (id) => {
    set({ loading: true, currentCampaign: null, error: null });
    try {
      const res = await api.get(`/campaigns/${id}`);
      set({ 
        currentCampaign: res.data.data, 
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Create a new campaign and append it to the current list
  createCampaign: async (campaignData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/campaigns', campaignData);
      const newCampaign = res.data.data;
      
      // Add the new campaign to the start of the list in state
      set((state) => ({ 
        campaigns: [newCampaign, ...state.campaigns],
        loading: false 
      }));
      return newCampaign;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Real-time helper: Synchronously update campaign stats via WebSocket data
  // without needing to make a heavy HTTP request to the database.
  updateCampaignProgress: (id, raised, backers) => {
    const { campaigns, currentCampaign } = get();
    
    // Update the campaign inside the list (e.g., Explore Page)
    const updatedList = campaigns.map(c => 
      c._id === id ? { ...c, raisedAmount: raised, backersCount: backers } : c
    );

    // Update the single active campaign view (e.g., Campaign Detail Page)
    let updatedCurrent = currentCampaign;
    if (currentCampaign && currentCampaign._id === id) {
      updatedCurrent = { ...currentCampaign, raisedAmount: raised, backersCount: backers };
    }

    set({ 
      campaigns: updatedList, 
      currentCampaign: updatedCurrent 
    });
  }
}));