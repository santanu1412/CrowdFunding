const Badge = ({ children, variant = 'cyan', className = '' }) => {
  const variants = {
    cyan: 'bg-cyan/10 text-cyan border-cyan/20',
    violet: 'bg-violet/10 text-violet border-violet/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    dark: 'bg-dark text-gray-300 border-white/10',
  };

  return (
    <span 
      className={`px-3 py-1 rounded-full border text-xs font-bold font-orbitron uppercase tracking-widest backdrop-blur-sm ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;