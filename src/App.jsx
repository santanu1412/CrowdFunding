import { useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/HomePage.jsx";
import CreateCampaign from "./components/CreateCampaign.jsx";
import CampaignCard from "./components/CampaignCard.jsx";
import CampaignPage from "./components/CampaignPage.jsx";
import ContactUs from "./components/ContactUs.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Blog from "./components/Blog.jsx";
import "./index.css";

function App() {
  const homeRef = useRef(null);
  const campaignsRef = useRef(null);
  const createRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const blogRef = useRef(null);

  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const campaigns = [
    { id: 1, title: "Clean Water Initiative", goal: 10000, raised: 7500, image: "https://www.charitynavigator.org/content/dam/cn/cn/og-images/clean-water-og.png" },
    { id: 2, title: "Tech Startup Boost", goal: 20000, raised: 12000, image: "https://img.freepik.com/premium-vector/startup-horizontal-vector-line-colored-illustration-banner_104589-2953.jpg" },
  ];

  return (
    <div className="app">
      <Navbar scrollToSection={scrollToSection} refs={{ homeRef, campaignsRef, createRef, aboutRef, contactRef, blogRef }} />
      <main className="main-content">
        <section ref={homeRef} className="section home-section">
          <HomePage scrollToCampaigns={() => scrollToSection(campaignsRef)} />
        </section>

        <section ref={campaignsRef} className="section campaigns-section">
          <h2>Featured Campaigns</h2>
          <div className="campaigns-grid">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onClick={() => setSelectedCampaign(campaign)}
              />
            ))}
          </div>
          {selectedCampaign && (
            <div className="modal-overlay">
              <CampaignPage campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} />
            </div>
          )}
        </section>

        <section ref={createRef} className="section create-section">
          <CreateCampaign />
        </section>

        <section ref={aboutRef} className="section about-section">
          <AboutUs />
        </section>

        <section ref={contactRef} className="section contact-section">
          <ContactUs />
        </section>

        <section ref={blogRef} className="section blog-section">
          <Blog />
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2025 Crowdfunding Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

