import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">MyApp</div>

        <div className="search-container">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>

        <div className="nav-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </nav>

      <main className="content">
        <h1>Welcome to MyApp 🎉</h1>
      </main>
    </div>
  );
}
