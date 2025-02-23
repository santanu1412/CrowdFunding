import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/navbar.jsx'
import HomePage from './components/homepage.jsx'
import CreateCampaign from './components/CreateCampaign.jsx'
import CampaignCard from './components/CampaignCard.jsx'
import CampaignPage from './components/CampaignPage.jsx'
import ContactUs from './components/ContactUs.jsx'
import AboutUS from './components/AboutUS.jsx'
import Blog from './components/Blog.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <App />
    <HomePage />
    <CreaignCard />
    <CampateCampaign />
    <CampaignPage />
    <button/>
    <ContactUs />
    <AboutUS/>
    <Blog/>
    </Router>
  </StrictMode>,
)
