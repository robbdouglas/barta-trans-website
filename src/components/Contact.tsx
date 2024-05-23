import "../styles/Contact.css";
import Footer from "./Footer";
import Header from "./Header";

function Contact() {
  return (
    <div>
      <Header />
      <section className="contact-container">
        <h1>Contact</h1>
        <p>Barta Trans s.r.o.</p>
        <p>Male Kosihy 2</p>
        <p>SK - 943 61 Male Kosihy</p>
        <p>+43 660 8636120 / Levente Barta /</p>
        <p>+49 159 01227139 / Sandor Barta /</p>
        <p>bartaTtrans@gmx.net</p>
      </section>
      
      <Footer />
    </div>
  );
}

export default Contact;
