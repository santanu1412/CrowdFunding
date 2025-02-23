import React from 'react';
import { useNavigate } from 'react-router-dom';

const CampaignCard = ({ campaign }) => {
  const navigate = useNavigate();
  const progress = (campaign.currentAmount / campaign.goal) * 100;

  return (
    <div 
      className="campaign-card"
      onClick={() => navigate(`/campaign/${campaign.id}`)}
    >
      <img 
        src={campaign.image} 
        alt={campaign.title}
        loading="lazy"
        className="campaign-image"
      />
      <div className="campaign-content">
        <div className="campaign-header">
          <h3>{campaign.title}</h3>
          {campaign.verified && <span className="verified-badge">✓ Verified</span>}
        </div>
        <p className="campaign-creator">By {campaign.creator}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="campaign-stats">
          <div>
            <strong>${campaign.currentAmount.toLocaleString()}</strong>
            <span>pledged of ${campaign.goal.toLocaleString()}</span>
          </div>
          <div>
            <strong>{campaign.backers}</strong>
            <span>backers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;