import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AboutPage.css";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      avatar: "👩‍💼",
      bio: "Passionate about creating innovative solutions that make a difference."
    },
    {
      name: "Mike Chen",
      role: "CTO",
      avatar: "👨‍💻",
      bio: "Technology enthusiast with 10+ years of experience in software development."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      avatar: "👩‍🎨",
      bio: "Creative designer focused on user experience and beautiful interfaces."
    },
    {
      name: "David Kim",
      role: "Lead Developer",
      avatar: "👨‍🔧",
      bio: "Full-stack developer who loves building scalable applications."
    }
  ];

  return (
    <div className="about-page">
      <Navbar />
      
      <main className="about-content">
        <section className="about-hero">
          <h1>About MyApp</h1>
          <p>We're on a mission to make technology accessible to everyone</p>
        </section>

        <section className="about-story">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2024, MyApp started as a simple idea: what if we could create 
              an application that truly understands what users need? Our journey began 
              with a small team of passionate developers and designers who believed that 
              great software should be both powerful and easy to use.
            </p>
            <p>
              Today, we're proud to serve thousands of users worldwide, helping them 
              accomplish their goals with our intuitive and reliable platform. We continue 
              to innovate and improve, always keeping our users' needs at the heart of 
              everything we do.
            </p>
          </div>
          <div className="story-stats">
            <div className="stat">
              <h3>10K+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Features</p>
            </div>
            <div className="stat">
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>
          </div>
        </section>

        <section className="about-values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>User-First</h3>
              <p>Everything we build starts with understanding our users' needs.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>We constantly push boundaries to create better solutions.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>Great things happen when we work together as a team.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💎</div>
              <h3>Quality</h3>
              <p>We never compromise on the quality of our products.</p>
            </div>
          </div>
        </section>

        <section className="about-team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
