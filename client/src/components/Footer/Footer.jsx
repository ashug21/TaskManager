import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h2 className="logo">TaskMaster</h2>
        <p className="tagline">
          Simplify your workflow. Stay organized. Achieve more.
        </p>

        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} TaskMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
