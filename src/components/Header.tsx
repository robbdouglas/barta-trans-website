import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css";

function Header() {
  // State-Variable für den Menüzustand
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ref für das Menü
  const menuRef = useRef(null);

  // Funktion zum Umschalten des Menüzustands
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Event-Handler für Klicks außerhalb des Menüs
  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // Effekt-Hook zum Hinzufügen und Entfernen des Event-Listeners
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
        {/* Menüelemente */}
        <div className="menu" ref={menuRef}>
          {/* Hier füge deine Navigationselemente hinzu */}
        </div>
      </div>
    </div>
  );
}

export default Header;
