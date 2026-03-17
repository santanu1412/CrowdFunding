import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, Search } from 'lucide-react';
import Sidebar from './Sidebar';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  // Handle sticky blur effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-dark/80 backdrop-blur-md border-white/10 shadow-lg shadow-cyan/5' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-orbitron font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet hover:opacity-80 transition-opacity z-50">
            NEXUS<span className="text-white">FUND</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/explore" className="text-sm font-sora font-medium text-gray-300 hover:text-cyan transition-colors relative group">
              Explore
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            {/* Search Bar (Expandable) */}
            <div className={`relative flex items-center transition-all duration-300 ${searchFocused ? 'w-64' : 'w-10 md:w-48'}`}>
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-white focus:border-cyan outline-none transition-all font-sora"
              />
            </div>

            {user ? (
              <div className="flex items-center gap-6">
                <Link to="/create" className="text-sm font-bold font-orbitron text-cyan border border-cyan/30 px-4 py-1.5 rounded-full hover:bg-cyan/10 hover:shadow-neon transition-all">
                  + LAUNCH
                </Link>
                
                <button className="relative text-gray-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-violet rounded-full border-2 border-dark animate-pulse"></span>
                </button>

                {/* User Dropdown Profile */}
                <div className="relative group">
                  <button className="flex items-center gap-2 outline-none">
                    <img src={user.avatar || 'https://res.cloudinary.com/demo/image/upload/v1631700000/default-avatar.png'} alt="User" className="w-9 h-9 rounded-full border-2 border-white/20 hover:border-cyan transition-colors object-cover" />
                  </button>
                  <div className="absolute right-0 top-full mt-4 w-56 py-2 bg-dark/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-cyan/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:scale-100 scale-95">
                    <div className="px-4 py-3 border-b border-white/10 mb-2">
                      <p className="text-sm font-bold text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-cyan transition-colors font-sora">Command Center</Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-cyan transition-colors font-sora">Identity Settings</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-sora mt-2 border-t border-white/10 pt-2">
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-sora font-medium text-gray-300 hover:text-white transition-colors">Log In</Link>
                <Link 
                  to="/register" 
                  className="px-6 py-2 rounded-full bg-cyan text-dark hover:bg-cyan/90 hover:shadow-neon transition-all duration-300 text-sm font-bold font-orbitron uppercase tracking-wider"
                >
                  Join Grid
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Sidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        user={user} 
        handleLogout={handleLogout} 
      />
    </>
  );
};

export default Navbar;