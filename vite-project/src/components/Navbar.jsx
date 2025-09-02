import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useCoins } from "../context/CoinContext.jsx";
import "./Navbar.css";

export default function Navbar() {
  const { studentCoins, tutorCoins, role, setRole } = useCoins?.() || { studentCoins: 0, tutorCoins: 0, role: "student", setRole: () => {} };
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth-user");
      if (raw) setAuthUser(JSON.parse(raw));
    } catch {}
  }, []);

  // Re-check auth user on route changes and storage updates
  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth-user");
      setAuthUser(raw ? JSON.parse(raw) : null);
    } catch {}
  }, [location]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "auth-user") {
        try {
          setAuthUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch { setAuthUser(null); }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth-user");
    setAuthUser(null);
    setRole("student");
    navigate("/");
    setIsMenuOpen(false);
  };
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">NaiNaiLong</Link>
      </div>

      <div className="search-container">
        <input type="text" className="search-bar" placeholder="Search..." />
      </div>

      <div className="nav-buttons">
        <Link to="/rewards" className="nav-link">
          Rewards
        </Link>
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
        <span className="nav-link" style={{ pointerEvents: "none", fontWeight: 600 }}>
          {role === "student" ? `Coins: ${studentCoins}` : `Coins: ${tutorCoins}`}
        </span>
        {authUser ? (
          <div className="nav-profile profile-menu" ref={menuRef}>
            <button className="profile-trigger" onClick={() => setIsMenuOpen((v) => !v)} aria-haspopup="menu" aria-expanded={isMenuOpen}>
              <div className="avatar-pill" title={authUser.fullName || authUser.email}>
                {(authUser.fullName || authUser.email || "U").charAt(0).toUpperCase()}
              </div>
              <div className="profile-meta">
                <div className="profile-name">{authUser.fullName || authUser.email}</div>
                <div className="profile-role">{authUser.role ? authUser.role.charAt(0).toUpperCase() + authUser.role.slice(1) : "User"}</div>
              </div>
            </button>
            {isMenuOpen && (
              <div className="menu-dropdown" role="menu">
                <Link to="/profile" className="menu-item" role="menuitem" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                <button className="menu-item" role="menuitem" onClick={() => { setIsMenuOpen(false); navigate('/profile'); }}>Settings</button>
                <Link to="/rewards" className="menu-item" role="menuitem" onClick={() => setIsMenuOpen(false)}>Rewards</Link>
                <div className="menu-sep" />
                <button className="menu-item danger" role="menuitem" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
