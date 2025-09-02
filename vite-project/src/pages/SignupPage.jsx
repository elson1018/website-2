import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { useCoins } from "../context/CoinContext.jsx";

export default function SignupPage() {
  const { setRole, addStudentCoins, addTutorCoins } = useCoins();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    role: "student"
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const selectRole = (role) => {
    setFormData(prev => ({ ...prev, role }));
    if (errors.role) setErrors(prev => ({ ...prev, role: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.role) {
      newErrors.role = "Please choose a role";
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setRole(formData.role);
      
      // For demo purposes, just redirect to home
      // In a real app, you'd handle account creation here
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createDemoAccount = async (demoRole = "student") => {
    try {
      setIsLoading(true);
      const demoUser = {
        fullName: demoRole === "student" ? "Demo Student" : "Demo Tutor",
        email: demoRole === "student" ? "student.demo@example.com" : "tutor.demo@example.com",
        role: demoRole
      };
      localStorage.setItem("auth-user", JSON.stringify(demoUser));
      setRole(demoRole);
      if (demoRole === "student") {
        addStudentCoins(120);
      } else {
        addTutorCoins(220);
      }
      await new Promise(resolve => setTimeout(resolve, 600));
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Your Account</h2>
          <p>Join thousands of users and start your journey today</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Role</label>
            <div className="role-toggle" role="group" aria-label="Choose role">
              <button
                type="button"
                className={`role-btn ${formData.role === 'student' ? 'active' : ''}`}
                onClick={() => selectRole('student')}
              >
                <span className="role-icon" aria-hidden>🎓</span>
                Student
              </button>
              <button
                type="button"
                className={`role-btn ${formData.role === 'tutor' ? 'active' : ''}`}
                onClick={() => selectRole('tutor')}
              >
                <span className="role-icon" aria-hidden>👨‍🏫</span>
                Tutor
              </button>
            </div>
            {errors.role && <span className="error-message">{errors.role}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.fullName ? 'error' : ''}
              required
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className={errors.password ? 'error' : ''}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? 'error' : ''}
              required
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          
          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={errors.agreeToTerms ? 'error' : ''}
              />
              <span>
                I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
                <Link to="/privacy">Privacy Policy</Link>
              </span>
            </label>
            {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
          </div>
          
          <button 
            type="submit" 
            className="signup-submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div style={{ marginTop: "0.75rem" }}>
          <button
            type="button"
            className="signup-submit"
            style={{ background: '#6b7280' }}
            onClick={() => createDemoAccount('student')}
            disabled={isLoading}
          >
            {isLoading ? "Setting up Demo..." : "Create Demo Account (Student)"}
          </button>
          <button
            type="button"
            className="signup-submit"
            style={{ marginTop: '0.5rem', background: '#475569' }}
            onClick={() => createDemoAccount('tutor')}
            disabled={isLoading}
          >
            {isLoading ? "Setting up Demo..." : "Create Demo Account (Tutor)"}
          </button>
        </div>
        
        <div className="signup-footer">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}