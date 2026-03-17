import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import FeaturedCampaigns from '../components/home/FeaturedCampaigns';
import CategorySection from '../components/home/CategorySection';
import HowItWorks from '../components/home/HowItWorks';

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <HeroSection />
      <StatsSection />
      <FeaturedCampaigns />
      <HowItWorks />
      <CategorySection />
    </div>
  );
};

export default Home;