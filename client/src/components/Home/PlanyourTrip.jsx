import React, { useContext } from "react";
import classes from "./PlanYourTrip.module.css";
import tripImage from "../../assets/trip-image.svg"; // Görsel yolunu kontrol et
import LanguageContext from "../../context/LanguageContext";

function PlanYourTrip() {
  const { language } = useContext(LanguageContext);

  // Dil çevirileri
  const translations = {
    tr: {
      sectionTag: "RANDEVU",
      title: "Şehirlerarası yolculuklarınızı",
      highlight: "hemen planlayın!",
      description: "Önceden fiyatınızı alın, şehirlerarası yolculuğunuzu en konforlu şekilde yapın!",
      cardTitle: "Yolculuğunuzu hemen planlayalım, Güvenilir Yolculuğunuza bir adım daha yaklaşın!",
      cardDescription:
        "Yolculuğunuz için gerekli bilgileri girin, en uygun şoförümüz size hızlıca fiyat ve yolculukla ilgili bilgileri paylaşsın! Güvenli, hızlı ve konforlu yolculuk için bekliyoruz!",
      reserve: "📅 Randevu Al",
      callTaxi: "🚖 Taksi Çağır",
      imgAlt: "Taksi çağıran müşteri",
    },
    en: {
      sectionTag: "BOOKING",
      title: "Plan your intercity trips",
      highlight: "right now!",
      description: "Get your price in advance and make your intercity trip as comfortable as possible!",
      cardTitle: "Let's plan your trip now, take a step closer to your safe journey!",
      cardDescription:
        "Enter the necessary information for your journey, and our best driver will quickly provide you with the price and travel details! We are waiting for you for a safe, fast, and comfortable journey!",
      reserve: "📅 Book Now",
      callTaxi: "🚖 Call Taxi",
      imgAlt: "Customer calling a taxi",
    },
  };

  const t = translations[language] || translations["tr"]; // Varsayılan TR

  return (
    <section className={classes.planSection}>
      <div className={classes.container}>
        <span className={classes.sectionTag}>{t.sectionTag}</span>
        <h2>
          {t.title} <span className={classes.highlight}>{t.highlight}</span>
        </h2>
        <p>{t.description}</p>

        <div className={classes.card}>
          <div className={classes.cardContent}>
            <h3>{t.cardTitle}</h3>
            <p>{t.cardDescription}</p>
            <div className={classes.buttonGroup}>
              <button className={classes.reserveButton}>{t.reserve}</button>
              <a href="tel:+905468060929" className={classes.taxiButton}>{t.callTaxi}</a>
            </div>
          </div>
          <div className={classes.cardImage}>
            <img src={tripImage} alt={t.imgAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlanYourTrip;
