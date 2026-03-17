import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import api from '../../lib/api';

const DonationWidget = ({ campaign }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();

  const handleDonate = async () => {
    if (!user) return toast.error('Authentication required to fund projects.');
    if (!amount || Number(amount) < 1) return toast.error('Minimum contribution is $1');

    setLoading(true);
    try {
      const res = await api.post(`/donations/checkout/${campaign._id}`, {
        amount: Number(amount),
        anonymous: false,
      });
      // Redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Transaction failed to initialize.');
      setLoading(false);
    }
  };

  const percent = Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-6 sticky top-24 border-t-4 border-t-cyan"
    >
      <h3 className="text-xl font-orbitron font-bold mb-6 text-white uppercase tracking-wider">Fund this vision</h3>
      
      {/* Real-time Stats */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-end">
          <span className="text-3xl font-orbitron font-bold text-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]">
            ${campaign.raisedAmount?.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400 font-sora pb-1">
            of ${campaign.goalAmount?.toLocaleString()}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan shadow-[0_0_10px_#00f5ff] transition-all duration-1000 ease-out" 
            style={{ width: `${percent}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-400 font-sora pt-2">
          <span><strong className="text-white">{campaign.backersCount || 0}</strong> Backers</span>
          <span><strong className="text-white">{campaign.daysLeft || 0}</strong> Days Left</span>
        </div>
      </div>

      {/* Input Field */}
      <div className="mb-6">
        <label className="text-sm text-gray-400 mb-2 block font-sora">Contribution Amount (USD)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan font-bold font-orbitron">$</span>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg py-4 pl-10 pr-4 text-xl font-bold text-white focus:border-cyan outline-none transition-all font-sora"
            placeholder="50"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleDonate}
        disabled={loading || campaign.status !== 'Active'}
        className="w-full py-4 bg-cyan text-dark font-bold font-orbitron rounded hover:bg-cyan/80 hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-widest"
      >
        {loading ? 'Processing...' : campaign.status === 'Active' ? 'Pledge Support' : 'Campaign Closed'}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4 font-sora">
        Secured by Stripe Neural Network.
      </p>
    </motion.div>
  );
};

export default DonationWidget;