import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Wallet, Rocket, ArrowRight, PlusCircle } from 'lucide-react';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';
import ProgressBar from '../components/ui/ProgressBar';
import Card from '../components/ui/Card';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [data, setData] = useState({ campaigns: [], donations: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('campaigns');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/users/dashboard');
        setData(res.data.data);
      } catch (error) {
        console.error("Dashboard Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  // Calculate Quick Stats
  const totalRaised = data.campaigns.reduce((acc, curr) => acc + curr.raisedAmount, 0);
  const totalContributed = data.donations.reduce((acc, curr) => acc + curr.amount, 0);
  const activeCampaigns = data.campaigns.filter(c => c.status === 'Active').length;

  if (loading) {
    return (
      <div className="pt-32 flex flex-col items-center justify-center h-[60vh] w-full">
        <Activity className="w-12 h-12 text-cyan animate-pulse mb-4" />
        <div className="text-cyan font-orbitron tracking-widest text-lg">SYNCING WITH MAINFRAME...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-8 pb-20 px-4 w-full">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-orbitron font-bold text-white uppercase tracking-widest mb-2">
            Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan to-violet">Center</span>
          </h1>
          <p className="text-gray-400 font-sora">Welcome back, Agent <span className="text-white font-bold">{user?.name}</span>. All systems nominal.</p>
        </div>
        <Link 
          to="/create" 
          className="flex items-center gap-2 px-6 py-3 bg-cyan text-dark font-bold font-orbitron rounded hover:bg-cyan/90 hover:shadow-neon transition-all uppercase tracking-wider text-sm w-fit"
        >
          <PlusCircle className="w-4 h-4" /> Initialize Protocol
        </Link>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 border-l-4 border-l-cyan flex items-center gap-4">
          <div className="p-3 bg-cyan/10 rounded-lg text-cyan"><Rocket className="w-6 h-6" /></div>
          <div>
            <p className="text-gray-400 font-sora text-sm uppercase tracking-wider mb-1">Active Protocols</p>
            <h3 className="text-2xl font-orbitron font-bold text-white">{activeCampaigns} <span className="text-sm text-gray-500 font-sora lowercase">deployments</span></h3>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-violet flex items-center gap-4">
          <div className="p-3 bg-violet/10 rounded-lg text-violet"><Activity className="w-6 h-6" /></div>
          <div>
            <p className="text-gray-400 font-sora text-sm uppercase tracking-wider mb-1">Capital Generated</p>
            <h3 className="text-2xl font-orbitron font-bold text-white">${totalRaised.toLocaleString()}</h3>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-emerald-500 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500"><Wallet className="w-6 h-6" /></div>
          <div>
            <p className="text-gray-400 font-sora text-sm uppercase tracking-wider mb-1">Total Contributed</p>
            <h3 className="text-2xl font-orbitron font-bold text-white">${totalContributed.toLocaleString()}</h3>
          </div>
        </Card>
      </div>

      {/* Interactive Tabs */}
      <div className="flex gap-8 border-b border-white/10 mb-8 font-orbitron font-bold text-sm tracking-widest uppercase relative">
        {['campaigns', 'donations'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 transition-colors relative ${activeTab === tab ? 'text-cyan' : 'text-gray-500 hover:text-gray-300'}`}
          >
            {tab === 'campaigns' ? 'My Deployments' : 'Backed Assets'}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan shadow-[0_0_10px_#00f5ff]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* CAMPAIGNS TAB */}
            {activeTab === 'campaigns' && (
              data.campaigns.length === 0 ? (
                <Card className="text-center py-20 border-dashed border-white/20">
                  <Rocket className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-6 font-sora">No active protocols detected in your sector.</p>
                  <Link to="/create" className="inline-flex items-center gap-2 text-cyan font-bold font-orbitron hover:text-cyan/80 uppercase tracking-widest text-sm bg-cyan/10 px-6 py-3 rounded-full transition-colors border border-cyan/20">
                    <PlusCircle className="w-4 h-4" /> Initialize First Campaign
                  </Link>
                </Card>
              ) : (
                data.campaigns.map(camp => (
                  <Card key={camp._id} className="p-6 flex flex-col md:flex-row gap-6 items-center hoverEffect group">
                    <div className="w-full md:w-48 h-32 overflow-hidden rounded border border-white/10 shrink-0 relative">
                      <img src={camp.coverImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={camp.title} />
                      <div className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider backdrop-blur-md ${camp.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-gray-800/80 text-gray-400 border border-gray-600'}`}>
                        {camp.status}
                      </div>
                    </div>
                    
                    <div className="flex-1 w-full flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex-1 w-full">
                        <h3 className="font-bold text-xl font-orbitron text-white mb-2 line-clamp-1">{camp.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 font-sora mb-4">
                          <span>Raised: <strong className="text-cyan">${camp.raisedAmount?.toLocaleString()}</strong></span>
                          <span className="text-gray-600">|</span>
                          <span>Goal: ${camp.goalAmount?.toLocaleString()}</span>
                        </div>
                        <ProgressBar progress={(camp.raisedAmount / camp.goalAmount) * 100} height="h-2" />
                      </div>
                      
                      <Link 
                        to={`/campaigns/${camp._id}`} 
                        className="shrink-0 flex items-center gap-2 px-4 py-2 border border-white/10 rounded font-orbitron text-xs text-gray-300 hover:text-cyan hover:border-cyan/50 transition-all uppercase tracking-wider"
                      >
                        Access Terminal <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </Card>
                ))
              )
            )}

            {/* DONATIONS TAB */}
            {activeTab === 'donations' && (
              data.donations.length === 0 ? (
                <Card className="text-center py-20 border-dashed border-white/20">
                  <Wallet className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 font-sora mb-6">You have not allocated capital to any networks yet.</p>
                  <Link to="/explore" className="inline-flex items-center gap-2 text-violet font-bold font-orbitron hover:text-violet/80 uppercase tracking-widest text-sm bg-violet/10 px-6 py-3 rounded-full transition-colors border border-violet/20">
                    Explore Prototypes <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.donations.map(donation => (
                    <Card key={donation._id} className="p-5 flex justify-between items-center hoverEffect">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-cyan/10 border border-cyan/20 rounded-full flex items-center justify-center text-cyan font-bold font-orbitron shadow-[0_0_10px_rgba(0,245,255,0.2)] shrink-0">
                          $
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-white font-orbitron tracking-wide truncate">
                            {donation.campaign?.title || 'Unknown Asset'}
                          </h4>
                          <p className="text-xs text-gray-500 font-sora mt-1">
                            {new Date(donation.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block text-xl font-bold font-orbitron text-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]">
                          +${donation.amount?.toLocaleString()}
                        </span>
                        {donation.campaign && (
                          <Link to={`/campaigns/${donation.campaign._id}`} className="text-[10px] text-gray-500 hover:text-cyan uppercase font-sora transition-colors">
                            View Asset
                          </Link>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;