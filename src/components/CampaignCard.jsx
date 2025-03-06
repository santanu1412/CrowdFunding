function CampaignCard({ campaign, onClick }) {
  const progress = (campaign.raised / campaign.goal) * 100;
  return (
    <div className="campaign-card" onClick={onClick}>
      <img src={campaign.image} alt={campaign.title} className="campaign-image" />
      <h3>{campaign.title}</h3>
      <p>Raised: ${campaign.raised} of ${campaign.goal}</p>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default CampaignCard;