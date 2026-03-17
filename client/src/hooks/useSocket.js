import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useCampaignStore } from '../store/campaignStore';

/**
 * Custom hook to establish a WebSocket connection for real-time funding updates.
 * Automatically joins the specific campaign room and listens for telemetry data.
 * * @param {string} campaignId - The ID of the campaign to listen to.
 */
export const useSocket = (campaignId) => {
  const updateCampaignProgress = useCampaignStore((state) => state.updateCampaignProgress);
  const socketRef = useRef(null);

  useEffect(() => {
    // Define the backend URL depending on the environment
    const backendUrl = import.meta.env.VITE_API_URL 
      ? import.meta.env.VITE_API_URL.replace('/api', '') 
      : 'http://localhost:5000';

    // Initialize socket connection
    socketRef.current = io(backendUrl, {
      transports: ['websocket'],
      autoConnect: true,
    });

    const socket = socketRef.current;

    // Join the specific campaign room when the component mounts
    if (campaignId) {
      socket.emit('joinCampaign', campaignId);
      console.log(`[Socket] Connected to telemetry for campaign: ${campaignId}`);
    }

    // Listen for the 'fundingUpdate' event broadcasted by the Stripe Webhook
    socket.on('fundingUpdate', (data) => {
      if (campaignId && data.raisedAmount !== undefined) {
        // Dispatch the update to the global Zustand store so the UI updates instantly
        updateCampaignProgress(campaignId, data.raisedAmount, data.backersCount);
      }
    });

    // Cleanup phase: Leave room and disconnect when component unmounts
    return () => {
      if (campaignId) {
        socket.emit('leaveCampaign', campaignId);
      }
      socket.disconnect();
    };
  }, [campaignId, updateCampaignProgress]);

  return socketRef.current;
};

export default useSocket;