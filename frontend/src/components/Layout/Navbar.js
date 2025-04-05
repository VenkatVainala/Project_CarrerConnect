// src/components/Layout/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand">CareerConnect</Link>

        {/* Only show nav links if user is logged in and not on auth pages */}
        {!isAuthPage && token && (
          <ul className="nav-items">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/community">Community</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li className="nav-greeting">Hi, {username}</li>
            <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
