import React, { useContext } from "react";
import classes from "./ServiceSection.module.css";
import cityTransport from "../../assets/city-transport.svg";
import intercityTransport from "../../assets/intercity-transport.svg";
import safeTransport from "../../assets/safe-transport.svg";
import LanguageContext from "../../context/LanguageContext";

function ServicesSection() {
  const { language } = useContext(LanguageContext);

  // Dil çevirileri
  const translations = {
    tr: {
      sectionTag: "HİZMETLER",
      title: "Royal Taksi ile",
      highlight: "Alabileceğiniz Hizmetler",
      services: [
        {
          imgAlt: "Şehir içi ulaşım",
          title: "Şehir içi Ulaşım",
          description:
            "Şehir içindeki günlük ulaşım ihtiyaçlarınızı, hızlı, güvenilir ve konforlu bir şekilde karşılıyoruz. Deneyimli şoförlerimiz ve temiz araçlarımızla gitmek istediğiniz her yere keyifle ulaşabilirsiniz.",
          callTaxi: "🚖 Taksi Çağır",
        },
        {
          imgAlt: "Şehirlerarası ulaşım",
          title: "Şehirlerarası Ulaşım",
          description:
            "Şehirlerarası yolculuklarınızda konfor ve güvenliğiniz ön planda. Uzun mesafelerde bile rahat bir yolculuk için kaliteli hizmet sunuyoruz. Bagajlarınız da emin ellerde!",
          callTaxi: "🚖 Taksi Çağır",
          reserve: "📅 Randevu Al",
        },
        {
          imgAlt: "Güvenli yolculuk",
          title: "Güvenli, Rahat ve Konforlu Yolculuk",
          description:
            "Yolculuk boyunca güvenliğinizi ve konforunuzu önemsiyoruz. Belgeli şoförlerimiz ve donanımlı araçlarımızla, yolculuklarınızı keyifli bir deneyime dönüştürüyoruz.",
          callTaxi: "🚖 Taksi Çağır",
        },
      ],
    },
    en: {
      sectionTag: "SERVICES",
      title: "With Royal Taxi",
      highlight: "Available Services",
      services: [
        {
          imgAlt: "City transport",
          title: "City Transport",
          description:
            "We meet your daily transportation needs in the city quickly, safely, and comfortably. With our experienced drivers and clean vehicles, you can reach anywhere you want with pleasure.",
          callTaxi: "🚖 Call Taxi",
        },
        {
          imgAlt: "Intercity transport",
          title: "Intercity Transport",
          description:
            "Comfort and safety are our priorities in your intercity travels. We provide quality service for a comfortable journey even over long distances. Your luggage is also in safe hands!",
          callTaxi: "🚖 Call Taxi",
          reserve: "📅 Book Now",
        },
        {
          imgAlt: "Safe travel",
          title: "Safe, Comfortable, and Relaxing Travel",
          description:
            "We prioritize your safety and comfort throughout your journey. With our certified drivers and well-equipped vehicles, we turn your journeys into a pleasant experience.",
          callTaxi: "🚖 Call Taxi",
        },
      ],
    },
  };

  const t = translations[language] || translations["tr"]; // Varsayılan TR

  return (
    <section className={classes.servicesSection}>
      <div className={classes.container}>
        <span className={classes.sectionTag}>{t.sectionTag}</span>
        <h2>
          {t.title} <span className={classes.highlight}>{t.highlight}</span>
        </h2>

        <div className={classes.servicesGrid}>
          {t.services.map((service, index) => (
            <div className={classes.serviceCard} key={index}>
              <img src={index === 0 ? cityTransport : index === 1 ? intercityTransport : safeTransport} alt={service.imgAlt} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className={classes.buttonGroup}>
                <a href="tel:+905468060929" className={classes.taxiButton}>{service.callTaxi}</a>
                {service.reserve && <button className={classes.reserveButton}>{service.reserve}</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
