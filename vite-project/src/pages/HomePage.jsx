import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="homepage">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
