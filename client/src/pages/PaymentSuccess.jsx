import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 w-full">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="mb-8"
      >
        <CheckCircle className="w-24 h-24 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
      </motion.div>
      
      <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4 text-white uppercase tracking-widest">
        Transfer <span className="text-emerald-400">Complete</span>
      </h1>
      <p className="text-gray-400 max-w-md mb-10 font-sora leading-relaxed">
        Capital has been successfully allocated. The smart contract is verified and the creator has been notified of your support.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/dashboard" 
          className="px-8 py-3 bg-transparent border border-white/20 hover:border-white/40 text-white rounded font-bold font-orbitron uppercase tracking-widest transition-colors text-sm"
        >
          Command Center
        </Link>
        <Link 
          to="/explore" 
          className="px-8 py-3 bg-cyan text-dark hover:bg-cyan/90 hover:shadow-neon rounded font-bold font-orbitron uppercase tracking-widest transition-all text-sm"
        >
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;