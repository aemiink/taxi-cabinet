import React, { useContext } from "react";
import classes from "./JourneySection.module.css";
import journeyImage from "../../assets/journey-image.svg"; 
import LanguageContext from "../../context/LanguageContext";

function JourneySection() {
  const { language } = useContext(LanguageContext);


  const translations = {
    tr: {
      title: "Birlikte,",
      highlight: "Harika ve güvenilir yolculuklar",
      subtitle: "yapmak istemez misiniz?",
      description:
        "Hayatın koşuşturmacasında güvenli ve konforlu bir yolculuk her zaman önemlidir. Günlük işlerinizde zaman kazanmak, sevdiklerinizle geçireceğiniz anlara daha fazla vakit ayırmak veya özel bir etkinliğe stressiz bir şekilde ulaşmak için yanınızdayız.",
    },
    en: {
      title: "Together,",
      highlight: "Amazing and Safe Journeys",
      subtitle: "Wouldn't you like to have?",
      description:
        "A safe and comfortable journey is always important in the hustle and bustle of life. We are here to save you time on your daily tasks, spend more moments with your loved ones, or reach a special event stress-free.",
    },
  };

  const t = translations[language] || translations["tr"]; 

  return (
    <section className={classes.journeySection}>
      <div className={classes.content}>
        <h2>
          {t.title} <span className={classes.highlight}>{t.highlight}</span> {t.subtitle}
        </h2>
        <p>{t.description}</p>
      </div>
      <div className={classes.imageContainer}>
        <img src={journeyImage} alt={t.highlight} />
      </div>
    </section>
  );
}

export default JourneySection;
