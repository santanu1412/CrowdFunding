import { useState, useCallback } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import api from '../lib/api';
import toast from 'react-hot-toast';

/**
 * Custom hook for campaign-related actions that require localized loading states 
 * or don't necessarily need to be stored in the global Zustand store (e.g., deletion, edits).
 */
export const useCampaign = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { fetchCampaigns, fetchCampaignById } = useCampaignStore();

  // Function to handle campaign deletion (localized action)
  const deleteCampaign = useCallback(async (campaignId, onSuccess) => {
    setIsProcessing(true);
    try {
      await api.delete(`/campaigns/${campaignId}`);
      toast.success('Campaign successfully scrubbed from the network.');
      
      // Refresh the global store after deletion
      await fetchCampaigns();
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.message || 'Failed to delete campaign.');
    } finally {
      setIsProcessing(false);
    }
  }, [fetchCampaigns]);

  // Function to handle fetching a single campaign with a local loading state
  const getSingleCampaign = useCallback(async (id) => {
    setIsProcessing(true);
    try {
      await fetchCampaignById(id);
    } catch (error) {
      toast.error('Failed to retrieve campaign data.');
    } finally {
      setIsProcessing(false);
    }
  }, [fetchCampaignById]);

  return {
    isProcessing,
    deleteCampaign,
    getSingleCampaign
  };
};

export default useCampaign;