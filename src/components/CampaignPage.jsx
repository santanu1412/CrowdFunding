import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CampaignMediaGallery from './CampaignMediaGallery';

const CampaignPage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [pledgeAmount, setPledgeAmount] = useState('');

  useEffect(() => {
    // Fetch campaign data from API
    const fetchCampaign = async () => {
      // Add your API call here
      const mockData = {
        id: 1,
        title: "Smart Home Gardening System",
        creator: "GreenTech Innovations",
        currentAmount: 45000,
        goal: 100000,
        backers: 234,
        story: "<p>Revolutionizing home gardening...</p>",
        rewards: [
          { amount: 50, description: "Early Bird Special" },
          { amount: 100, description: "Deluxe Kit" }
        ]
      };
      setCampaign(mockData);
    };
    
    fetchCampaign();
  }, [id]);

  if (!campaign) return <div>Loading...</div>;

  return (
    <div className="campaign-page">
      <CampaignMediaGallery campaign={campaign} />
      
      <div className="campaign-details">
        <h1>{campaign.title}</h1>
        <div className="creator-section">
          <h3>By {campaign.creator}</h3>
          <div className="social-proof">
            <span>⭐ 4.8/5 (120 reviews)</span>
            <span>🔒 Verified Creator</span>
          </div>
        </div>

        <div className="funding-section">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(campaign.currentAmount / campaign.goal) * 100}%` }}
            ></div>
          </div>
          <div className="funding-stats">
            <div>
              <h2>${campaign.currentAmount.toLocaleString()}</h2>
              <p>pledged of ${campaign.goal.toLocaleString()}</p>
            </div>
            <div>
              <h2>{campaign.backers}</h2>
              <p>backers</p>
            </div>
          </div>
        </div>

        <div className="pledge-section">
          <h3>Select Your Pledge</h3>
          {campaign.rewards.map((reward, index) => (
            <div key={index} className="reward-tier">
              <h4>${reward.amount}</h4>
              <p>{reward.description}</p>
              <button className="pledge-button">
                Select Pledge
              </button>
            </div>
          ))}
        </div>

        <div className="campaign-story" dangerouslySetInnerHTML={{ __html: campaign.story }} />
      </div>
    </div>
  );
};

export default CampaignPage;