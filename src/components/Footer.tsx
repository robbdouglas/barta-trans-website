import "../styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="social-media-icons">
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-linkedin"></i>
      </div>
      <p className="copyright">
        <i className="fa-regular fa-copyright"></i> 2024 Barta Trans s.r.o.
      </p>
      <div className="impressum-and-more">
        <Link to="/impressum">Impressum </Link>
      </div>
    </div>
  );
}

export default Footer;
