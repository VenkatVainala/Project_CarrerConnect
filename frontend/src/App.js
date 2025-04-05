import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import HomePage from './pages/Home/HomePage';
import JobListingPage from './pages/Jobs/JobListingPage';
import CommunityPage from './pages/Community/CommunityPage';
import ProfilePage from './pages/Profile/ProfilePage';

function App() {
  return (
    <Router>
      {/* Navbar is always rendered */}
      <Navbar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobListingPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </Router>
  );
}

export default App;
