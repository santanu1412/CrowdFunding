import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CampaignPage from './components/CampaignPage';
import CreateCampaign from './components/CreateCampaign';
import HowItWorks from './components/HowItWorks';
import Blog from './components/Blog';
import ContactUs from './components/ContactUs';
import NotFoundPage from './components/NotFoundPage';
import Navbar from './components/Navbar';    // Added missing import
import Footer from './components/Footer';    // Added missing import

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />           {/* Added root path */}
          <Route path="/home/:id" element={<HomePage />} />
          <Route path="/campaign/:id" element={<CampaignPage />} />
          <Route path="/create" element={<CreateCampaign />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;