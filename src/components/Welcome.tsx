import "../styles/Welcome.css";
import Footer from "./Footer";
import Header from "./Header";

function Welcome() {
  return (
    <div>
      <Header />
      <section className="welcome-container">
        <h1>Welcome to Barta Trans s.r.o.</h1>
        <p>
          Barta Trans is a dynamic and growing transportation company founded in September 2021. Our company is dedicated to providing high-quality transport and logistics services to our clients. Shortly after our establishment, we managed to build a reliable and experienced team committed to meeting customer needs and delivering high-quality services. Our goal is to offer flexible and efficient solutions for our customers, whether in national or international transport as well as in logistics tasks. We handle both small and large freight volumes and strive to fulfill every transport task at a high level. Thank you for visiting our website, and we hope to count you among our customers soon!
        </p>
        
      </section>
      <Footer />
    </div>
  );
}

export default Welcome;
