function HomePage({ scrollToCampaigns }) {
  return (
    <div className="home-content">
      <h1>Fund Your Dreams</h1>
      <p>Join our community to support or start impactful projects.</p>
      <button onClick={scrollToCampaigns}>Explore Campaigns</button>
      <img src="https://blog.ipleaders.in/wp-content/uploads/2021/05/Tech.jpg" alt="Crowdfunding Hero" className="OUR HERO's" />
    </div>
  );
}

export default HomePage;