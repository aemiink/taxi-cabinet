import React, { useContext } from "react";
import classes from "./BookingSection.module.css";
import { FaCalendarAlt, FaTaxi } from "react-icons/fa";
import bookingImage from "../assets/booking-image.svg"; // Görselin dosya yolunu kontrol et
import LanguageContext from "../context/LanguageContext"; // 🔥 useContext ekledik

function BookingSection() {
  const { language } = useContext(LanguageContext); // ✅ LanguageContext kullanıldı

  // Dil çevirileri
  const translations = {
    tr: {
      title: "Sivas’ta bir ilk!",
      highlight: "Randevu Sistemi",
      description: "Şehirlerarası seyahatlerinizde konforlu bir yolculuk geçirebilirsiniz!",
      bookingText: "Temiz araçlarımız ile uzun yollarınızın ve şehir içi ulaşımlarınızın vazgeçilmezi olmak istiyoruz.",
      callTaxi: "Taksi Çağır",
      reserve: "Randevu Al",
    },
    en: {
      title: "A first in Sivas!",
      highlight: "Reservation System",
      description: "Enjoy a comfortable journey for your intercity travels!",
      bookingText: "We aim to be your go-to choice for long-distance and city transportation with our clean vehicles.",
      callTaxi: "Call a Taxi",
      reserve: "Book Now",
    },
  };

  const t = translations[language] || translations["tr"]; // Varsayılan dil Türkçe

  return (
    <div className={classes.bookingContainer}>
      <div className={classes.bookingContent}>
        <h2 className={classes.bookingTitle}>
          {t.title} <span className={classes.highlight}>{t.highlight}</span>
        </h2>
        <p className={classes.bookingDescription}>{t.description}</p>
        <p className={classes.bookingText}>{t.bookingText}</p>
        <div className={classes.bookingButtons}>
          <a href="#" className={classes.reserveButton}>
            <FaCalendarAlt /> {t.reserve}
          </a>
          <a href="tel:+905468060929" className={classes.taxiButton}>
            <FaTaxi /> {t.callTaxi}
          </a>
        </div>
      </div>
      <div className={classes.bookingImage}>
        <img src={bookingImage} alt="Booking Illustration" />
      </div>
    </div>
  );
}

export default BookingSection;
