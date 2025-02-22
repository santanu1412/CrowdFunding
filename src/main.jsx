import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/navbar.jsx'
import HomePage from './components/homepage.jsx'
import CreateCampaign from './components/CreateCampaign.jsx'
import CampaignCard from './components/CampaignCard.jsx'
import CampaignPage from './components/CampaignPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Navbar />
    <HomePage />
    <CreateCampaign />
    <CampaignCard />
    <CampaignPage />
    <footer/>
    <button/>
  </StrictMode>,
)
