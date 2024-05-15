import "../styles/Footer.css";

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
      <div className="impressum-and-more"></div>
    </div>
  );
}

export default Footer;
