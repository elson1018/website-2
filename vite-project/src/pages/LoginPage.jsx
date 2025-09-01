import { Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="login-submit">Login</button>
        </form>
        <p>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
