import { create } from 'zustand';
import api from '../lib/api';

export const useCampaignStore = create((set, get) => ({
  campaigns: [],
  currentCampaign: null,
  loading: false,
  error: null,

  fetchCampaigns: async (params = {}) => {
    set({ loading: true });
    try {
      const queryString = new URLSearchParams(params).toString();
      const res = await api.get(`/campaigns?${queryString}`);
      set({ campaigns: res.data.data, loading: false, error: null });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCampaignById: async (id) => {
    set({ loading: true, currentCampaign: null });
    try {
      const res = await api.get(`/campaigns/${id}`);
      set({ currentCampaign: res.data.data, loading: false, error: null });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  createCampaign: async (campaignData) => {
    set({ loading: true });
    try {
      const res = await api.post('/campaigns', campaignData);
      set({ loading: false });
      return res.data.data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  // Real-time update helper
  updateCampaignProgress: (id, raised, backers) => {
    const { campaigns, currentCampaign } = get();
    
    // Update list
    const updatedList = campaigns.map(c => 
      c._id === id ? { ...c, raisedAmount: raised, backersCount: backers } : c
    );

    // Update current view if matches
    let updatedCurrent = currentCampaign;
    if (currentCampaign && currentCampaign._id === id) {
      updatedCurrent = { ...currentCampaign, raisedAmount: raised, backersCount: backers };
    }

    set({ campaigns: updatedList, currentCampaign: updatedCurrent });
  }
}));