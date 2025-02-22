import React, { useEffect, useState } from 'react';
import CampaignCard from './CampaignCard';
import { getCampaigns } from '../services/api';

const HomePage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading campaigns...</div>;

  return (
    <div className="home-page">
      <h1>Active Campaigns</h1>
      <div className="campaigns-container">
        {campaigns.map(campaign => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;