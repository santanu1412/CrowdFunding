import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const CampaignCard = ({ campaign }) => {
  const daysLeft = dayjs(campaign.deadline).diff(dayjs(), 'day');

  return (
    <div className="campaign-card">
      <h3>{campaign.title}</h3>
      <p>{campaign.description.substring(0, 100)}...</p>
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${(campaign.raisedAmount / campaign.target) * 100}%` }}
        ></div>
      </div>
      <div className="campaign-stats">
        <span>${campaign.raisedAmount.toLocaleString()} raised</span>
        <span>${campaign.target.toLocaleString()} goal</span>
      </div>
      <div className="campaign-footer">
        <span>{daysLeft} days left</span>
        <Link to={`/campaign/${campaign.id}`} className="view-btn">View Campaign</Link>
      </div>
    </div>
  );
};

export default CampaignCard;