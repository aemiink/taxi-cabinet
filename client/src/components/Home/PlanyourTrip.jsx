import React from "react";
import classes from "./PlanYourTrip.module.css";
import tripImage from "../../assets/trip-image.svg"; // Görsel yolunu kontrol et

function PlanYourTrip() {
  return (
    <section className={classes.planSection}>
      <div className={classes.container}>
        <span className={classes.sectionTag}>RANDEVU</span>
        <h2>
          Şehirlerarası yolculuklarınızı{" "}
          <span className={classes.highlight}>hemen planlayın!</span>
        </h2>
        <p>
          Önceden fiyatınızı alın, şehirlerarası yolculuğunuzu en konforlu şekilde yapın!
        </p>

        <div className={classes.card}>
          <div className={classes.cardContent}>
            <h3>Yolculuğunuzu hemen planlayalım, Güvenilir Yolculuğunuza bir adım daha yaklaşın!</h3>
            <p>
              Yolculuğunuz için gerekli bilgileri girin, en uygun şoförümüz size hızlıca fiyat ve
              yolculukla ilgili bilgileri paylaşsın! Güvenli, hızlı ve konforlu yolculuk için
              bekliyoruz!
            </p>
            <div className={classes.buttonGroup}>
              <button className={classes.reserveButton}>📅 Randevu Al</button>
              <a href="tel:+905468060929" className={classes.taxiButton}>🚖 Taksi Çağır</a>
            </div>
          </div>
          <div className={classes.cardImage}>
            <img src={tripImage} alt="Taksi çağıran müşteri" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlanYourTrip;
