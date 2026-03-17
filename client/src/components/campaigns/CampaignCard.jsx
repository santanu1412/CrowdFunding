import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProgressBar from '../ui/ProgressBar'; // Assuming you have this UI component

const CampaignCard = ({ campaign }) => {
  const percent = Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden group hover:border-cyan/50 transition-colors duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden shrink-0">
        <img 
          src={campaign.coverImage || '/placeholder.jpg'} 
          alt={campaign.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 bg-dark/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-cyan border border-cyan/20 uppercase tracking-wider">
          {campaign.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/campaigns/${campaign._id}`}>
          <h3 className="font-orbitron font-bold text-lg mb-2 line-clamp-1 group-hover:text-cyan transition-colors">
            {campaign.title}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow font-sora">
          {campaign.description}
        </p>
        
        <div className="mb-2 flex justify-between text-xs font-bold font-orbitron">
          <span className="text-white">${campaign.raisedAmount?.toLocaleString()}</span>
          <span className="text-gray-500">of ${campaign.goalAmount?.toLocaleString()}</span>
        </div>
        
        <ProgressBar progress={percent} color="cyan" />
        
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400 font-sora">
          <div className="flex items-center gap-2 truncate pr-2">
            <img 
              src={campaign.creator?.avatar || 'https://res.cloudinary.com/demo/image/upload/v1631700000/default-avatar.png'} 
              alt="Creator" 
              className="w-6 h-6 rounded-full border border-white/20 shrink-0" 
            />
            <span className="truncate">by {campaign.creator?.name || 'Unknown User'}</span>
          </div>
          <span className="shrink-0">{campaign.daysLeft || 0} days left</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignCard;