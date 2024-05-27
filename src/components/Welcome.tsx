import "../styles/Welcome.css";
import Footer from "./Footer";
import Header from "./Header";

function Welcome() {
  return (
    <div className="welcome-container">
      <Header />
      <div className="small-welcome-container">
        <section className="welcome-text">
          <small className="static-text">Welcome to</small>
          <p className="barta">BARTA</p>
          <p className="trans">TRANS</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Welcome;
