import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCampaignStore } from '../store/campaignStore';
import { useSocket } from '../hooks/useSocket';
import CampaignHero from '../components/campaigns/CampaignHero';
import DonationWidget from '../components/campaigns/DonationWidget';

const CampaignDetail = () => {
  const { id } = useParams();
  const { currentCampaign: campaign, fetchCampaignById, loading } = useCampaignStore();
  
  // Attach real-time WebSocket listener for this specific campaign
  useSocket(id);

  useEffect(() => {
    fetchCampaignById(id);
  }, [id, fetchCampaignById]);

  if (loading || !campaign) {
    return (
      <div className="pt-32 flex justify-center h-screen w-full">
        <div className="text-cyan animate-pulse font-orbitron tracking-widest text-xl">
          DECRYPTING CAMPAIGN DATA...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 w-full">
      <CampaignHero campaign={campaign} />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* Left Column: Story & Data */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-8 mb-8 border-b border-white/10 pb-4 font-orbitron font-bold tracking-widest text-sm uppercase">
            <button className="text-cyan border-b-2 border-cyan pb-4 -mb-4">Mission Briefing</button>
            <button className="text-gray-500 hover:text-gray-300 transition-colors pb-4">Updates</button>
            <button className="text-gray-500 hover:text-gray-300 transition-colors pb-4">Backers</button>
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-300 font-sora leading-relaxed">
            {campaign.description.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Right Column: Interaction & Payments */}
        <div className="lg:col-span-1">
          <DonationWidget campaign={campaign} />
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;