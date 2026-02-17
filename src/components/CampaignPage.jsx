function CampaignPage({ campaign, onClose }) {
  return (
    <div className="campaign-page">
      <h2>{campaign.title}</h2>
      <img src={campaign.image} alt={campaign.title} className="campaign-image-large" />
      <p>Goal: ${campaign.goal} | Raised: ${campaign.raised}</p>
      <p>Description: Help us make a difference!</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default CampaignPage;
