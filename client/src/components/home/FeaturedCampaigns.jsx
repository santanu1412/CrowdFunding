import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCampaignStore } from '../../store/campaignStore';
import CampaignCard from '../campaigns/CampaignCard';

const FeaturedCampaigns = () => {
  const { campaigns, fetchCampaigns, loading } = useCampaignStore();

  useEffect(() => {
    // Fetch only the top 3 campaigns for the featured section
    fetchCampaigns({ limit: 3, sort: '-raisedAmount' });
  }, [fetchCampaigns]);

  return (
    <section className="py-24 relative z-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-2">
              Trending <span className="text-cyan drop-shadow-[0_0_10px_rgba(0,245,255,0.5)]">Prototypes</span>
            </h2>
            <p className="text-gray-400 font-sora">The most backed projects in the network right now.</p>
          </motion.div>
          
          <Link 
            to="/explore" 
            className="text-sm font-orbitron font-bold text-violet hover:text-cyan transition-colors uppercase tracking-widest flex items-center gap-2"
          >
            View All Database &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[400px] glass-card animate-pulse bg-white/5 border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign, i) => (
              <motion.div
                key={campaign._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <CampaignCard campaign={campaign} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCampaigns;