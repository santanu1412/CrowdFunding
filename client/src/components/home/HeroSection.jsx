import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden w-full">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center" />
      </div>

      <div className="relative z-10 text-center max-w-5xl px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-cyan text-xs font-bold tracking-[0.2em] mb-8 uppercase font-orbitron backdrop-blur-sm">
            Next Generation Crowdfunding
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-black mb-6 leading-tight drop-shadow-lg">
            FUND THE <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-blue-500 to-violet drop-shadow-[0_0_20px_rgba(0,245,255,0.3)]">
              FUTURE
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl font-sora leading-relaxed">
            The decentralized launchpad for visionaries, creators, and tech pioneers. 
            Turn your cyberpunk dreams into reality today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
            <Link
              to="/create"
              className="w-full sm:w-auto px-8 py-4 bg-cyan text-dark font-bold font-orbitron rounded hover:bg-cyan/90 hover:shadow-neon transition-all duration-300 uppercase tracking-widest text-sm"
            >
              Start Campaign
            </Link>
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-bold font-orbitron rounded hover:border-violet hover:text-violet hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 uppercase tracking-widest text-sm backdrop-blur-sm"
            >
              Explore Projects
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom fade gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-10" />
    </section>
  );
};

export default HeroSection;