import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 w-full">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-9xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan to-violet/20 mb-2 drop-shadow-lg"
      >
        404
      </motion.h1>
      <h2 className="text-2xl font-orbitron font-bold text-white mb-6 uppercase tracking-widest">
        Sector Not Found
      </h2>
      <p className="text-gray-400 max-w-md mb-8 font-sora">
        The coordinates you entered do not exist in the current mainframe. The campaign may have been scrubbed or the link is corrupted.
      </p>
      <Link 
        to="/" 
        className="px-8 py-3 bg-cyan text-dark font-bold font-orbitron hover:bg-cyan/80 hover:shadow-neon transition-all rounded text-sm uppercase tracking-widest"
      >
        Return to Base
      </Link>
    </div>
  );
};

export default NotFound;