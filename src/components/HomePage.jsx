import React from 'react';
import CampaignCard from './CampaignCard';

const HomePage = () => {
  const [campaigns, setCampaigns] = useState([]);

  // Fetch featured campaigns (mock data)
  useEffect(() => {
    const mockCampaigns = [
      {
        id: 1,
        title: 'AI-Powered Home Assistant',
        creator: 'TechFuture Inc.',
        currentAmount: 150000,
        goal: 200000,
        backers: 890,
        image: 'https://example.com/ai-assistant.jpg',
        verified: true
      },
      // Add more mock campaigns
    ];
    setCampaigns(mockCampaigns);
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Fund Ideas That Matter</h1>
        <p>Join our community of innovators and backers</p>
        <button className="cta-button">Start a Campaign</button>
      </section>

      <section className="featured-campaigns">
        <h2>Trending Projects</h2>
        <div className="campaigns-grid">
          {campaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>

      <section className="value-proposition">
        <div className="value-card">
          <h3>💡 For Creators</h3>
          <p>Launch your dream project with our supportive community</p>
        </div>
        <div className="value-card">
          <h3>🔒 Trust & Safety</h3>
          <p>All campaigns are vetted by our team</p>
        </div>
        <div className="value-card">
          <h3>🌍 Global Reach</h3>
          <p>Available in 5 languages and multiple currencies</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;