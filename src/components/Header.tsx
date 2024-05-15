import { useState, useEffect, useRef } from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
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
          <img src="../images/logo-complete.png" alt="logo" />
        </div>
        <div className="burger-menu" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className="menu" ref={menuRef}>
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
            <li>_______________</li>
            <li>
              <div className="admin-login-container">
                <Link to="/admin-login">Admin Login</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
