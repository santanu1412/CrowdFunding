import { motion } from 'framer-motion';

const CampaignHero = ({ campaign }) => {
  return (
    <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden border-b border-white/10">
      {/* Background Image & Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent z-10" />
      <img 
        src={campaign.coverImage} 
        alt={campaign.title} 
        className="absolute inset-0 w-full h-full object-cover scale-105" 
      />
      
      {/* Content Container */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-cyan/10 text-cyan border border-cyan/20 px-3 py-1 rounded text-xs font-bold mb-4 inline-block tracking-widest uppercase">
              {campaign.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 text-white drop-shadow-lg leading-tight max-w-4xl">
              {campaign.title}
            </h1>
            
            <div className="flex items-center gap-4 bg-dark/40 w-fit px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
              <img 
                src={campaign.creator?.avatar || '/default-avatar.png'} 
                alt="Creator" 
                className="w-10 h-10 rounded-full border border-white/20" 
              />
              <div className="text-sm font-sora">
                <p className="text-gray-400 text-xs">Architect</p>
                <p className="text-white font-bold">{campaign.creator?.name || 'Unknown Entity'}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CampaignHero;