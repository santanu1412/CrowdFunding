const RewardTier = ({ reward, onSelect }) => {
  const isSoldOut = reward.limitedQuantity && reward.claimedCount >= reward.limitedQuantity;

  return (
    <div 
      className={`p-6 rounded-lg border transition-all duration-300 ${
        isSoldOut 
          ? 'bg-dark/30 border-white/5 opacity-50 cursor-not-allowed' 
          : 'bg-dark/50 border-white/10 hover:border-violet/50 cursor-pointer'
      }`}
      onClick={() => !isSoldOut && onSelect(reward.minimumAmount)}
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-lg font-orbitron font-bold text-white">{reward.title}</h4>
        <span className="text-violet font-bold font-orbitron text-xl">
          ${reward.minimumAmount}+
        </span>
      </div>
      
      <p className="text-gray-400 text-sm font-sora mb-6 leading-relaxed">
        {reward.description}
      </p>
      
      <div className="flex justify-between items-center text-xs font-sora">
        <div className="text-gray-500">
          <span className="block text-white/70 mb-1">Estimated Delivery</span>
          {new Date(reward.estimatedDelivery).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
        </div>
        
        {reward.limitedQuantity && (
          <div className="bg-white/5 px-3 py-1 rounded text-gray-400">
            {reward.claimedCount} / {reward.limitedQuantity} claimed
          </div>
        )}
      </div>

      {!isSoldOut && (
        <div className="mt-4 pt-4 border-t border-white/5 text-center text-violet text-sm font-bold font-orbitron opacity-0 hover:opacity-100 transition-opacity">
          SELECT TIER &rarr;
        </div>
      )}
    </div>
  );
};

export default RewardTier;