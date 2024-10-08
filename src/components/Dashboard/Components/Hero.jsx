import React from 'react';
import '../Styles/Hero.css'; 
import NavBar from './NavBar';

const Hero = ({ title = "You've got 0 tasks today", userName }) => {
  const subtitle = `Hey ${userName || 'User'}!`; // Default to 'User' if no name is provided

  return (
    <div className="MainHero-section">
      <NavBar />
      <section className="hero-section">
        <div className="hero-text">
          <p className="hero-subtitle">
            {subtitle}
          </p>
          <h1 className="hero-title hero-title-sm-size hero-title-md-size">
            {title}
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Hero;
