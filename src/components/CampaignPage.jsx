import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCampaign, donateToCampaign } from '../services/api';
import dayjs from 'dayjs';

const CampaignPage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const data = await getCampaign(id);
        setCampaign(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id]);

  const handleDonate = async () => {
    if (!donationAmount || donationAmount <= 0) return;
    
    try {
      await donateToCampaign(id, donationAmount);
      const updatedCampaign = await getCampaign(id);
      setCampaign(updatedCampaign);
      setDonationAmount('');
    } catch (error) {
      console.error('Donation failed:', error);
    }
  };

  if (loading) return <div>Loading campaign...</div>;
  if (!campaign) return <div>Campaign not found</div>;

  return (
    <div className="campaign-page">
      <h1>{campaign.title}</h1>
      <p className="description">{campaign.description}</p>
      
      <div className="campaign-stats">
        <div className="stat-item">
          <h3>${campaign.raisedAmount.toLocaleString()}</h3>
          <p>raised of ${campaign.target.toLocaleString()} goal</p>
        </div>
        <div className="stat-item">
          <h3>{dayjs(campaign.deadline).diff(dayjs(), 'day')}</h3>
          <p>days left</p>
        </div>
      </div>

      <div className="donate-section">
        <input
          type="number"
          min="1"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          placeholder="Enter donation amount"
        />
        <button onClick={handleDonate}>Donate Now</button>
      </div>
    </div>
  );
};

export default CampaignPage;