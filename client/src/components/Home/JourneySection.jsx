import React from "react";
import classes from "./JourneySection.module.css";
import journeyImage from "../../assets/journey-image.svg"; // Görsel yolunu kontrol et

function JourneySection() {
  return (
    <section className={classes.journeySection}>
      <div className={classes.content}>
        <h2>
          Birlikte, <span className={classes.highlight}>Harika ve güvenilir yolculuklar</span> yapmak
          istemez misiniz?
        </h2>
        <p>
          Hayatın koşuşturmacasında güvenli ve konforlu bir yolculuk her zaman önemlidir.
          Günlük işlerinizde zaman kazanmak, sevdiklerinizle geçireceğiniz anlara daha fazla vakit
          ayırmak veya özel bir etkinliğe stressiz bir şekilde ulaşmak için yanınızdayız.
        </p>
      </div>
      <div className={classes.imageContainer}>
        <img src={journeyImage} alt="Sarı taksi ile şehirde yolculuk" />
      </div>
    </section>
  );
}

export default JourneySection;
