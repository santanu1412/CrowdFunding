import { useEffect, useState } from 'react';
import { useCampaignStore } from '../store/campaignStore';
import CampaignCard from '../components/campaigns/CampaignCard';

const Explore = () => {
  const { campaigns, fetchCampaigns, loading } = useCampaignStore();
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Tech', 'Art', 'Games', 'Music', 'Film', 'Health', 'Environment'];

  useEffect(() => {
    // If 'All' is selected, don't pass a category filter
    fetchCampaigns(filter === 'All' ? {} : { category: filter });
  }, [filter, fetchCampaigns]);

  return (
    <div className="pt-10 pb-20 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
          Discover <span className="text-cyan">Projects</span>
        </h1>
        <p className="text-gray-400 font-sora">Find and fund the next big breakthrough.</p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-orbitron text-sm font-bold transition-all duration-300 ${
              filter === cat 
                ? 'bg-cyan text-dark shadow-[0_0_15px_rgba(0,245,255,0.4)]' 
                : 'bg-white/5 border border-white/10 text-gray-300 hover:border-cyan/50 hover:text-cyan'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-cyan animate-pulse font-orbitron tracking-widest text-xl">SCANNING DATABASE...</div>
        </div>
      ) : campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 glass-card">
          <p>No projects found in this sector.</p>
        </div>
      )}
    </div>
  );
};

export default Explore;