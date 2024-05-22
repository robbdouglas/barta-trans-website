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
        <h2>Vision: Barta Trans – The Revolution of Innovation and Quality</h2>
        <p>
          Our goal is for Barta Trans to be not just a transport company, but a pioneer in the revolution of innovation and quality in the transport and logistics sector. Our vision is to define industry standards and elevate services to a new level by creating a culture of excellence and customer orientation. To achieve this vision, we will continuously develop our technological infrastructure to utilize the latest innovations and digital solutions. In parallel, we will work on strengthening our team with the best professionals committed to high-quality service and customer satisfaction. True to our vision, we will always focus on the needs and expectations of our customers and align all our activities to maximize customer satisfaction. This will make Barta Trans a leading player in the industry, recognized for reliability, innovation, and excellence.
        </p>
      </section>
      <Footer />
    </div>
  );
}

export default Welcome;
