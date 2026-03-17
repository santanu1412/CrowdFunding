import { motion } from 'framer-motion';

const ProgressBar = ({ progress, color = "cyan", height = "h-2", className = '' }) => {
  const percentage = Math.min(Math.max(progress, 0), 100); // Clamp between 0 and 100
  
  const colorMap = {
    cyan: "bg-cyan shadow-[0_0_10px_#00f5ff]",
    violet: "bg-violet shadow-[0_0_10px_#8b5cf6]",
    emerald: "bg-emerald-500 shadow-[0_0_10px_#10b981]",
  };

  const activeColor = colorMap[color] || colorMap.cyan;

  return (
    <div className={`w-full bg-white/10 ${height} rounded-full overflow-hidden relative ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full absolute top-0 left-0 rounded-full ${activeColor}`}
      />
    </div>
  );
};

export default ProgressBar;