import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, children }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-dark border-2 border-white/10 rounded-xl shadow-2xl overflow-hidden shadow-cyan/10"
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-cyan to-violet" />
            
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-xl font-orbitron font-bold text-white">{title}</h3>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-cyan transition-colors focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto font-sora">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Use React Portal to render modal at the end of the DOM to avoid z-index conflicts
  return createPortal(modalContent, document.getElementById('root'));
};

export default Modal;