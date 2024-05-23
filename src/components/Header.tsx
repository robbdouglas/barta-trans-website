import { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={`header-container ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="header-logo">
          <img src="../assets/logo-complete.png" alt="logo" />
        </div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/login">Admin Login</Link>
            </li>
          </ul>
        </nav>
        <div className="burger-menu" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="menu" ref={menuRef}>
          <div className="menu-header">
            <button className="close-menu-btn" onClick={closeMenu}>
              X
            </button>
            <div className="languages-container">
              <button className="german-btn">DE</button>
              <button className="german-btn">EN</button>
              <button className="german-btn">SLO</button>
            </div>
          </div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>_______________</li>
            <li>
              <div className="admin-login-container">
                <Link to="/login">Admin Login</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
