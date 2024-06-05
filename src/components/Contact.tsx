import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/Contact.css";
import Footer from "./Footer";
import Header from "./Header";

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <section className="contact-container">
        <h1>{t("contact.title")}</h1>
        <p>{t("contact.company")}</p>
        <p>{t("contact.address1")}</p>
        <p>{t("contact.address2")}</p>
        <p>{t("contact.phone1")}</p>
        <p>{t("contact.phone2")}</p>
        <p>{t("contact.email")}</p>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.7285564572286!2d18.32030781605781!3d47.87323217920154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c58a7d72f9cdd%3A0x400f7d1c697d110!2sMale%20Kosihy%202%2C%20943%2061%20Male%20Kosihy%2C%20Slovakia!5e0!3m2!1sen!2sus!4v1622044723465!5m2!1sen!2sus&maptype=satellite"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
