import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Tech & Hardware', icon: '💻', color: 'from-cyan/20 to-transparent', border: 'hover:border-cyan' },
  { name: 'Digital Art', icon: '🎨', color: 'from-violet/20 to-transparent', border: 'hover:border-violet' },
  { name: 'Indie Games', icon: '🎮', color: 'from-emerald-500/20 to-transparent', border: 'hover:border-emerald-500' },
  { name: 'Cybernetics', icon: '🦾', color: 'from-blue-500/20 to-transparent', border: 'hover:border-blue-500' },
  { name: 'Music Synthesis', icon: '🎧', color: 'from-pink-500/20 to-transparent', border: 'hover:border-pink-500' },
  { name: 'Environment', icon: '🌍', color: 'from-green-500/20 to-transparent', border: 'hover:border-green-500' },
];

const CategorySection = () => {
  return (
    <section className="py-24 bg-dark/50 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-4">
            Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">Sector</span>
          </h2>
          <p className="text-gray-400 font-sora max-w-2xl mx-auto">
            Explore diverse fields of innovation and find the niche that matches your vision.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link 
                to={`/explore?category=${cat.name}`}
                className={`flex flex-col items-center justify-center p-6 glass-card border border-white/10 bg-gradient-to-b ${cat.color} ${cat.border} transition-all duration-300 group h-full`}
              >
                <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 grayscale group-hover:grayscale-0">
                  {cat.icon}
                </span>
                <span className="font-orbitron font-bold text-sm text-center text-gray-300 group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;