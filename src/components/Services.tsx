import { useTranslation } from "react-i18next";
import "../styles/Services.css";
import Footer from "./Footer";
import Header from "./Header";
import services_banner from "../assets/imgs/DALL·E 2024-05-22 12.47.42 - A minimalist illustration of international transport. Show a simplified map of Europe with interconnected routes extending beyond to symbolize a globa.webp";
import "../styles/Services.css";

function Services() {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <section className="services-container">
        <div className="services-banner-container">
          <img
            className="services-banner"
            src={services_banner}
            alt="One Lkw with Text News"
          />
        </div>

        <h1>{t("services.title")}</h1>
        <div className="services-list-container">
          <div className="service-list-item">
            <h2>{t("services.domesticTransport.title")}</h2>
            <p>{t("services.domesticTransport.description")}</p>
          </div>
          <div className="service-list-item">
            <h2>{t("services.internationalTransport.title")}</h2>
            <p>{t("services.internationalTransport.description")}</p>
          </div>
          <div className="service-list-item">
            <h2>{t("services.seaAirFreight.title")}</h2>
            <p>{t("services.seaAirFreight.description")}</p>
          </div>

          <div className="service-list-item">
            <h2>{t("services.vehicleFleet.title")}</h2>
            <p>{t("services.vehicleFleet.description")}</p>
            <h3>{t("services.ftlFleet.title")}</h3>
            <h4>{t("services.ftlFleet.walkingFloor.title")}</h4>
            <p>{t("services.ftlFleet.walkingFloor.description")}</p>
            <h4>{t("services.ftlFleet.curtainSided.title")}</h4>
            <p>{t("services.ftlFleet.curtainSided.description")}</p>
          </div>
          <div className="service-list-item">
            <h2>{t("services.futurePlans.title")}</h2>
            <p>{t("services.futurePlans.description")}</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Services;
