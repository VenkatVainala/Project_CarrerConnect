// frontend/src/components/Layout/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <p>&copy; {new Date().getFullYear()} CareerConnect. All rights reserved.</p>
        <p>Designed by YourName</p>
      </div>
    </footer>
  );
};

export default Footer;
