import { motion } from 'framer-motion';

const stats = [
  { label: 'Total Funded', value: '$12.4M', color: 'text-cyan' },
  { label: 'Live Projects', value: '3,402', color: 'text-violet' },
  { label: 'Global Backers', value: '84K+', color: 'text-emerald' }
];

const StatsSection = () => {
  return (
    <section className="py-20 border-y border-white/5 bg-dark/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-6 glass-card"
            >
              <h3 className={`text-5xl font-orbitron font-bold mb-2 ${stat.color} drop-shadow-[0_0_10px_currentColor]`}>
                {stat.value}
              </h3>
              <p className="text-gray-400 font-sora font-medium uppercase tracking-widest text-sm">
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