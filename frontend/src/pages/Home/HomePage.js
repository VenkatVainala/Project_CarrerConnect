// frontend/src/pages/Home/HomePage.jsx
import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page container">
      <section className="hero-section">
        <h1>Welcome to CareerConnect</h1>
        <p>
          Discover your next opportunity, connect with professionals, and grow your
          career.
        </p>
      </section>
      <section className="content-section">
        <h2>Latest Opportunities</h2>
        <p>
          Explore job listings, industry news, and professional insights tailored
          just for you.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
