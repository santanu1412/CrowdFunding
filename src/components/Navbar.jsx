
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">CrowdFund</Link>
      <div className="links">
        <Link to="/create" className="create-btn">Create Campaign</Link>
      </div>
    </nav>
  );
};

export default Navbar;