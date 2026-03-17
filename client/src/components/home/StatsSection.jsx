import { motion } from 'framer-motion';

const stats = [
  { label: 'Capital Deployed', value: '$12.4M', color: 'text-cyan' },
  { label: 'Active Protocols', value: '3,402', color: 'text-violet' },
  { label: 'Network Nodes', value: '84K+', color: 'text-emerald-500' }
];

const StatsSection = () => {
  return (
    <section className="py-20 border-t border-white/5 bg-dark/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="p-8 glass-card border border-white/5 hover:border-white/10 transition-colors"
            >
              <h3 className={`text-5xl md:text-6xl font-orbitron font-bold mb-4 ${stat.color} drop-shadow-[0_0_15px_currentColor]`}>
                {stat.value}
              </h3>
              <p className="text-gray-400 font-sora font-bold uppercase tracking-[0.2em] text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;