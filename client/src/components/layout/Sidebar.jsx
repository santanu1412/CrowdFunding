import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose, user, handleLogout }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[280px] bg-dark border-l border-white/10 z-40 shadow-2xl flex flex-col md:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-6 flex-grow">
              <Link to="/explore" onClick={onClose} className="text-lg font-orbitron text-white hover:text-cyan transition-colors">
                Explore Projects
              </Link>
              
              {user ? (
                <>
                  <div className="h-px w-full bg-white/10 my-2" />
                  <Link to="/create" onClick={onClose} className="text-lg font-orbitron text-cyan hover:text-cyan/80 transition-colors font-bold">
                    + Launch Campaign
                  </Link>
                  <Link to="/dashboard" onClick={onClose} className="text-lg font-sora text-gray-300 hover:text-white transition-colors">
                    Command Center
                  </Link>
                  <Link to="/profile" onClick={onClose} className="text-lg font-sora text-gray-300 hover:text-white transition-colors">
                    Identity Settings
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-4 mt-4">
                  <Link 
                    to="/login" 
                    onClick={onClose} 
                    className="w-full py-3 text-center border border-white/20 rounded font-orbitron text-white hover:bg-white/5 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={onClose} 
                    className="w-full py-3 text-center bg-cyan text-dark rounded font-orbitron font-bold hover:bg-cyan/90 hover:shadow-neon transition-all"
                  >
                    Join Grid
                  </Link>
                </div>
              )}
            </div>

            {/* Bottom Section */}
            {user && (
              <div className="mb-8 mt-auto">
                <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 rounded-lg border border-white/10">
                  <img src={user.avatar || 'https://res.cloudinary.com/demo/image/upload/v1631700000/default-avatar.png'} alt="Avatar" className="w-10 h-10 rounded-full" />
                  <div className="overflow-hidden">
                    <p className="text-sm text-white font-bold truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => { onClose(); handleLogout(); }}
                  className="w-full py-3 text-center border border-red-500/30 text-red-400 rounded font-orbitron hover:bg-red-500/10 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;