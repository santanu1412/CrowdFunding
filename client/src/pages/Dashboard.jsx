import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import ProgressBar from '../components/ui/ProgressBar';
import Card from '../components/ui/Card';

const Dashboard = () => {
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

  if (loading) {
    return <div className="pt-32 text-center text-cyan font-orbitron animate-pulse">ACCESSING COMMAND CENTER...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto pt-8 pb-20 w-full">
      <h1 className="text-4xl font-orbitron font-bold mb-10 text-white uppercase tracking-widest">
        Command <span className="text-cyan">Center</span>
      </h1>

      {/* Navigation Tabs */}
      <div className="flex gap-8 border-b border-white/10 mb-8 font-orbitron font-bold text-sm tracking-widest uppercase">
        <button 
          onClick={() => setActiveTab('campaigns')}
          className={`pb-4 px-2 transition-colors ${activeTab === 'campaigns' ? 'border-b-2 border-cyan text-cyan' : 'text-gray-500 hover:text-gray-300'}`}
        >
          My Deployments
        </button>
        <button 
          onClick={() => setActiveTab('donations')}
          className={`pb-4 px-2 transition-colors ${activeTab === 'donations' ? 'border-b-2 border-cyan text-cyan' : 'text-gray-500 hover:text-gray-300'}`}
        >
          Backed Prototypes
        </button>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {activeTab === 'campaigns' && (
          data.campaigns.length === 0 ? (
            <Card className="text-center py-20 border-dashed">
              <p className="text-gray-400 mb-4 font-sora">No active protocols detected.</p>
              <Link to="/create" className="text-cyan font-bold font-orbitron hover:underline uppercase tracking-widest text-sm">Initialize Campaign</Link>
            </Card>
          ) : (
            data.campaigns.map(camp => (
              <Card key={camp._id} className="p-6 flex flex-col md:flex-row gap-6 items-center">
                <img src={camp.coverImage} className="w-full md:w-48 h-32 object-cover rounded border border-white/10" alt={camp.title} />
                <div className="flex-1 w-full">
                  <h3 className="font-bold text-xl font-orbitron text-white mb-2">{camp.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-sora mt-2">
                    <span>Raised: <strong className="text-cyan">${camp.raisedAmount}</strong></span>
                    <span>Goal: ${camp.goalAmount}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${camp.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-gray-400'}`}>
                      {camp.status}
                    </span>
                  </div>
                  <div className="mt-4 w-full">
                     <ProgressBar progress={(camp.raisedAmount / camp.goalAmount) * 100} height="h-1.5" />
                  </div>
                </div>
              </Card>
            ))
          )
        )}

        {activeTab === 'donations' && (
          data.donations.length === 0 ? (
            <Card className="text-center py-20 border-dashed">
              <p className="text-gray-400 font-sora">You have not allocated capital to any networks yet.</p>
            </Card>
          ) : (
            data.donations.map(donation => (
              <Card key={donation._id} className="p-6 flex justify-between items-center hoverEffect">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-cyan/10 border border-cyan/20 rounded-full flex items-center justify-center text-cyan font-bold font-orbitron shadow-neon">
                    $
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-orbitron tracking-wide">Backed: {donation.campaign?.title || 'Unknown Asset'}</h4>
                    <p className="text-xs text-gray-500 font-sora mt-1">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="text-xl font-bold font-orbitron text-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]">
                  +${donation.amount}
                </span>
              </Card>
            ))
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;