import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative font-orbitron font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center overflow-hidden";
  
  const variants = {
    primary: "bg-cyan text-dark hover:bg-cyan/90 hover:shadow-neon rounded shadow-[0_0_10px_rgba(0,245,255,0.2)]",
    secondary: "bg-violet text-white hover:bg-violet/90 hover:shadow-violet rounded shadow-[0_0_10px_rgba(139,92,246,0.2)]",
    outline: "bg-transparent border border-cyan text-cyan hover:bg-cyan/10 hover:shadow-neon rounded",
    ghost: "bg-transparent text-gray-300 hover:text-cyan hover:bg-white/5 rounded",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </motion.button>
  );
};

export default Button;