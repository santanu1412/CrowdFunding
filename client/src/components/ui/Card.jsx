import { motion } from 'framer-motion';

const Card = ({ children, hoverEffect = false, className = '', ...props }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, borderColor: 'rgba(0,245,255,0.5)' } : {}}
      className={`bg-dark/50 border border-white/10 rounded-xl backdrop-blur-md overflow-hidden transition-colors duration-300 shadow-xl shadow-black/50 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;