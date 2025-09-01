import { Link } from "react-router-dom";
import "./SignupPage.css";

export default function SignupPage() {
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create an Account</h2>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit" className="signup-submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}