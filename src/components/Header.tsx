import "../styles/Header.css";

function Header() {
  return (
    <div>
      <div className="header-container">
        <div className="header-logo">
          <img src="../images/logo-complete.png" alt="logo" />
        </div>
        <div className="burger-menu">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </div>
  );
}

export default Header;
