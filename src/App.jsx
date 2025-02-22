import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CreateCampaign from './components/CreateCampaign';
import CampaignPage from './components/CampaignPage';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/create" component={CreateCampaign} />
          <Route path="/campaign/:id" component={CampaignPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;