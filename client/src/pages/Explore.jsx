import { useEffect, useState } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import CampaignGrid from '../components/campaigns/CampaignGrid';
import Badge from '../components/ui/Badge';

const Explore = () => {
  const { campaigns, fetchCampaigns, loading } = useCampaignStore();
  const [activeFilter, setActiveFilter] = useState('All');
  
  const categories = ['All', 'Tech', 'Art', 'Games', 'Music', 'Film', 'Health', 'Environment'];

  useEffect(() => {
    fetchCampaigns(activeFilter === 'All' ? {} : { category: activeFilter });
  }, [activeFilter, fetchCampaigns]);

  return (
    <div className="pt-8 pb-20 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 uppercase tracking-widest text-white">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">Projects</span>
        </h1>
        <p className="text-gray-400 font-sora">Locate and fund the next big breakthrough.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2 rounded-full font-orbitron text-xs font-bold transition-all duration-300 uppercase tracking-wider ${
              activeFilter === cat 
                ? 'bg-cyan text-dark shadow-neon' 
                : 'bg-white/5 border border-white/10 text-gray-400 hover:border-cyan hover:text-cyan'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <CampaignGrid campaigns={campaigns} loading={loading} />
    </div>
  );
};

export default Explore;