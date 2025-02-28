import React, { useContext } from "react";
import classes from "./HeroSection.module.css";
import LanguageContext from "../../context/LanguageContext";
import heroImage from "../../assets/hero-image.svg"; 

function HeroSection() {
  const { language } = useContext(LanguageContext);

  const translations = {
    tr: {
      title: "Birlikte, Harika ve güvenilir yolculuklar için planlama",
      highlight: "yapalım!",
      description:
        "İster günlük işleriniz için, ister özel bir yolculukta güvenli, konforlu ve hızlı ulaşım her zaman elinizin altında.",
      callTaxi: "🚖 Taksi Çağır",
    },
    en: {
      title: "Let's plan amazing and safe trips together",
      highlight: "together!",
      description:
        "Whether for daily tasks or a special journey, safe, comfortable, and fast transportation is always at your fingertips.",
      callTaxi: "🚖 Call Taxi",
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
        <button className={classes.callTaxiButton}>{t.callTaxi}</button>
      </div>
      <div className={classes.heroImage}>
        <img src={heroImage} alt="Hero Görseli" />
      </div>
    </section>
  );
}

export default HeroSection;
