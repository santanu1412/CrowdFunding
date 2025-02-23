// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import CreateCampaign from './components/CreateCampaign';
// import CampaignPage from './components/CampaignPage';
// import Navbar from './components/Navbar';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Navbar />
//         <Switch>
//           <Route exact path="/" component={HomePage} />
//           <Route path="/create" component={CreateCampaign} />
//           <Route path="/campaign/:id" component={CampaignPage} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;/
import React, { useState } from "react";

const App = () => {
  // State to manage the active section
  const [activeSection, setActiveSection] = useState("home");

  // Function to render the appropriate section
  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <section>
            <h1>Welcome to Our Home Page</h1>
            <p>This is the home section of our single-page website.</p>
          </section>
        );
      case "about":
        return (
          <section>
            <h1>About Us</h1>
            <p>Learn more about who we are and what we do.</p>
          </section>
        );
      case "services":
        return (
          <section>
            <h1>Our Services</h1>
            <p>Discover the services we offer to our clients.</p>
          </section>
        );
      case "contact":
        return (
          <section>
            <h1>Contact Us</h1>
            <p>Get in touch with us for more information.</p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav>
        <ul style={{ listStyle: "none", display: "flex", gap: "20px" }}>
          <li>
            <button onClick={() => setActiveSection("home")}>Home</button>
          </li>
          <li>
            <button onClick={() => setActiveSection("about")}>About</button>
          </li>
          <li>
            <button onClick={() => setActiveSection("services")}>Services</button>
          </li>
          <li>
            <button onClick={() => setActiveSection("contact")}>Contact</button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main>{renderSection()}</main>
    </div>
  );
};

export default App;