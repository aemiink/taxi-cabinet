import React, { useContext } from "react";
import classes from "./HeroSection.module.css";
import LanguageContext from "../../context/LanguageContext";
import heroImage from "../../assets/hero-image.svg"; 

function HeroSection() {
  const { language } = useContext(LanguageContext);

  const translations = {
    tr: {
      title: "Birlikte, Harika ve güvenilir yolculuklar için şoförlerimizi ve ",
      highlight: "araçlarımızı tanıyın!",
      description:
        "İster günlük işleriniz için, ister özel bir yolculukta güvenli, konforlu ve hızlı ulaşım her zaman elinizin altında.",
      callTaxi: "🚖 Taksi Çağır",
      reservation: "🗓️ Rezervasyon",
      or: "veya"
    },
    en: {
      title: "Together, we will support our drivers and our ",
      highlight: "get to know our vehicles!",
      description:
        "Whether for daily tasks or a special journey, safe, comfortable, and fast transportation is always at your fingertips.",
      callTaxi: "🚖 Call Taxi",
      reservation: "🗓️ Reservation",
      or: "or"
    },
  };

  const t = translations[language] || translations.tr;

  return (
    <section className={classes.heroSection}>
      <div className={classes.heroContent}>
        <h1>
          {t.title} <span className={classes.highlight}>{t.highlight}</span>
        </h1>
        <p>{t.description}</p>

        <div className={classes.divider}>{t.or}</div>

        <div className={classes.buttonssec}>
            <button className={classes.callTaxiButton}>{t.callTaxi}</button>
            <button className={classes.callTaxiButton}>{t.reservation}</button>
        </div>
      </div>
      <div className={classes.heroImage}>
        <img src={heroImage} alt="Hero Görseli" />
      </div>
    </section>
  );
}

export default HeroSection;
