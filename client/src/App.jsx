import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetail from './pages/CampaignDetail';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import PaymentSuccess from './pages/PaymentSuccess';
import NotFound from './pages/NotFound';

function App() {
  // Initialize authentication state globally
  useAuth();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-dark text-white font-sora relative flex flex-col selection:bg-cyan selection:text-dark">
      {/* Global Toast Notifications styled for Cyberpunk aesthetic */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(10, 10, 15, 0.9)',
            color: '#fff',
            border: '1px solid rgba(0, 245, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            fontFamily: 'Sora, sans-serif',
          },
          success: {
            iconTheme: { primary: '#00f5ff', secondary: '#0a0a0f' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#0a0a0f' },
          },
        }}
      />
      
      {/* Ambient Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <Navbar />
      
      {/* Main Content Area */}
      <main className="pt-20 flex-grow relative z-10 w-full flex flex-col items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateCampaign />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;