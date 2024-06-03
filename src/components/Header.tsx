import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo-complete.png";
import logoLarge from "../assets/logo-complete-old.png"; // Larger(old) logo

function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={`header-container ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="header-logo">
          <Link to={"/"}>
            <img src={windowWidth >= 1024 ? logoLarge : logo} alt="logo" />
          </Link>
        </div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">{t("navbar.home")}</Link>
            </li>
            <li>
              <Link to="/news">{t("navbar.news")}</Link>
            </li>
            <li>
              <Link to="/services">{t("navbar.services")}</Link>
            </li>
            <li>
              <Link to="/jobs">{t("navbar.jobs")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("navbar.contact")}</Link>
            </li>
            <li>
              <Link to="/dashboard">{t("navbar.dashboard")}</Link>
            </li>
          </ul>
          <div className="languages-container">
            <button
              className="language-btn"
              onClick={() => changeLanguage("de")}
            >
              DE
            </button>
            <button
              className="language-btn"
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            <button
              className="language-btn"
              onClick={() => changeLanguage("sk")}
            >
              SLO
            </button>
          </div>
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
              <button
                className="language-btn"
                onClick={() => changeLanguage("de")}
              >
                DE
              </button>
              <button
                className="language-btn"
                onClick={() => changeLanguage("en")}
              >
                EN
              </button>
              <button
                className="language-btn"
                onClick={() => changeLanguage("sk")}
              >
                SLO
              </button>
            </div>
          </div>
          <ul>
            <li>
              <Link to="/">{t("navbar.home")}</Link>
            </li>
            <li>
              <Link to="/news">{t("navbar.news")}</Link>
            </li>
            <li>
              <Link to="/services">{t("navbar.services")}</Link>
            </li>
            <li>
              <Link to="/jobs">{t("navbar.jobs")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("navbar.contact")}</Link>
            </li>
            <li>_______________</li>
            <li>
              <Link to="/dashboard">{t("navbar.dashboard")}</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
