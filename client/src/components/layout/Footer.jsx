import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-white/10 pt-16 pb-8 mt-auto relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-cyan/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
        
        {/* Brand Column */}
        <div className="col-span-1 lg:col-span-1">
          <Link to="/" className="text-2xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">
            NEXUS<span className="text-white">FUND</span>
          </Link>
          <p className="text-gray-400 mt-4 text-sm leading-relaxed font-sora">
            The decentralized launchpad for the next generation of creators, innovators, and hardware pioneers. Build the future.
          </p>
        </div>
        
        {/* Links Column 1 */}
        <div>
          <h4 className="font-bold text-white mb-6 font-orbitron tracking-widest uppercase text-sm">Platform</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-sora">
            <li><Link to="/explore" className="hover:text-cyan transition-colors flex items-center gap-2"><span className="text-cyan text-xs">▹</span> Browse Campaigns</Link></li>
            <li><Link to="/create" className="hover:text-cyan transition-colors flex items-center gap-2"><span className="text-cyan text-xs">▹</span> Start a Project</Link></li>
            <li><Link to="/how-it-works" className="hover:text-cyan transition-colors flex items-center gap-2"><span className="text-cyan text-xs">▹</span> Architecture</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="font-bold text-white mb-6 font-orbitron tracking-widest uppercase text-sm">Support</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-sora">
            <li><a href="#" className="hover:text-cyan transition-colors flex items-center gap-2"><span className="text-cyan text-xs">▹</span> Help Center</a></li>
            <li><a href="#" className="hover:text-cyan transition-colors flex items-center gap-2"><span className="text-cyan text-xs">▹</span> Smart Contracts</a></li>
            <li><a href="#" className="hover:text-cyan transition-colors flex items-center gap-2"><span className="text-cyan text-xs">▹</span> Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="font-bold text-white mb-6 font-orbitron tracking-widest uppercase text-sm">Comms Link</h4>
          <p className="text-xs text-gray-400 mb-4 font-sora">Subscribe to network updates and trending prototypes.</p>
          <form className="flex" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter email..." 
              className="bg-dark border border-white/10 rounded-l-lg px-4 py-2 text-sm text-white focus:border-cyan outline-none w-full font-sora"
            />
            <button 
              type="submit"
              className="bg-cyan text-dark font-bold px-4 py-2 rounded-r-lg hover:bg-cyan/90 transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-gray-500 text-xs font-sora">
          &copy; {new Date().getFullYear()} NexusFund Protocol. All systems nominal.
        </p>
        <div className="flex gap-4 text-gray-500">
          {/* Social Icons Placeholder */}
          <a href="#" className="hover:text-cyan transition-colors">X(Twitter)</a>
          <a href="#" className="hover:text-violet transition-colors">Discord</a>
          <a href="#" className="hover:text-emerald-500 transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;