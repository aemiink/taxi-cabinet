import React from "react";
import classes from "./ServiceSection.module.css";
import cityTransport from "../../assets/city-transport.svg";
import intercityTransport from "../../assets/intercity-transport.svg";
import safeTransport from "../../assets/safe-transport.svg";

function ServicesSection() {
  return (
    <section className={classes.servicesSection}>
      <div className={classes.container}>
        <span className={classes.sectionTag}>HİZMETLER</span>
        <h2>
          Royal Taksi ile <span className={classes.highlight}>Alabileceğiniz Hizmetler</span>
        </h2>

        <div className={classes.servicesGrid}>
          {/* Şehir içi Ulaşım */}
          <div className={classes.serviceCard}>
            <img src={cityTransport} alt="Şehir içi ulaşım" />
            <h3>Şehir içi Ulaşım</h3>
            <p>
              Şehir içindeki günlük ulaşım ihtiyaçlarınızı, hızlı, güvenilir ve konforlu bir şekilde
              karşılıyoruz. Deneyimli şoförlerimiz ve temiz araçlarımızla gitmek istediğiniz her
              yere keyifle ulaşabilirsiniz.
            </p>
            <a href="tel:+905468060929" className={classes.taxiButton}>🚖 Taksi Çağır</a>
          </div>

          {/* Şehirlerarası Ulaşım */}
          <div className={classes.serviceCard}>
            <img src={intercityTransport} alt="Şehirlerarası ulaşım" />
            <h3>Şehirlerarası Ulaşım</h3>
            <p>
              Şehirlerarası yolculuklarınızda konfor ve güvenliğiniz ön planda. Uzun mesafelerde bile
              rahat bir yolculuk için kaliteli hizmet sunuyoruz. Bagajlarınız da emin ellerde!
            </p>
            <div className={classes.buttonGroup}>
              <a href="tel:+905468060929" className={classes.taxiButton}>🚖 Taksi Çağır</a>
              <button className={classes.reserveButton}>📅 Randevu Al</button>
            </div>
          </div>

          {/* Güvenli Yolculuk */}
          <div className={classes.serviceCard}>
            <img src={safeTransport} alt="Güvenli yolculuk" />
            <h3>Güvenli, Rahat ve Konforlu Yolculuk</h3>
            <p>
              Yolculuk boyunca güvenliğinizi ve konforunuzu önemsiyoruz. Belgeli şoförlerimiz ve
              donanımlı araçlarımızla, yolculuklarınızı keyifli bir deneyime dönüştürüyoruz.
            </p>
            <a href="tel:+905468060929" className={classes.taxiButton}>🚖 Taksi Çağır</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
