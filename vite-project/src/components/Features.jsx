import { useState } from "react";
import "./Features.css";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Built with modern technology for optimal performance",
      details: "Our app loads in milliseconds and provides instant feedback to all your interactions."
    },
    {
      icon: "🔒",
      title: "Secure by Design",
      description: "Your data is protected with enterprise-grade security",
      details: "We use industry-standard encryption and follow security best practices to keep your information safe."
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Works perfectly on all devices and screen sizes",
      details: "Whether you're on desktop, tablet, or mobile, our app adapts to provide the best experience."
    },
    {
      icon: "🎨",
      title: "Beautiful UI",
      description: "Modern and intuitive interface design",
      details: "Carefully crafted user experience that makes using our app a pleasure."
    }
  ];

  return (
    <section className="features">
      <div className="features-header">
        <h2>Why Choose NaiNaiLong?</h2>
        <p>Discover what makes us different</p>
      </div>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`feature-card ${activeFeature === index ? 'active' : ''}`}
            onClick={() => setActiveFeature(index)}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <div className="feature-details">
              {activeFeature === index && (
                <p>{feature.details}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="features-indicators">
        {features.map((_, index) => (
          <button
            key={index}
            className={`indicator ${activeFeature === index ? 'active' : ''}`}
            onClick={() => setActiveFeature(index)}
          />
        ))}
      </div>
    </section>
  );
}
