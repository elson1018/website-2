import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "Build amazing things",
    "Connect with others", 
    "Learn and grow",
    "Make a difference"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Welcome to <span className="highlight">NaiNaiLong</span>
        </h1>
        <p className="hero-subtitle">
          {texts[currentText]}
        </p>
        <div className="hero-buttons">
          <Link to="/signup" className="hero-btn primary">
            Get Started
          </Link>
          <Link to="/about" className="hero-btn secondary">
            Learn More
          </Link>
        </div>
      </div>
      <div className="hero-visual">
        <div className="floating-card">
          <div className="card-icon">🚀</div>
          <h3>Fast & Reliable</h3>
          <p>Built with modern technology</p>
        </div>
        <div className="floating-card">
          <div className="card-icon">🔒</div>
          <h3>Secure</h3>
          <p>Your data is safe with us</p>
        </div>
      </div>
    </div>
  );
}
