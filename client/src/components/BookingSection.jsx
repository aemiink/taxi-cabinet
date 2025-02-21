import React from "react";
import classes from "./BookingSection.module.css";
import { FaCalendarAlt, FaTaxi } from "react-icons/fa";
import bookingImage from "../assets/booking-image.svg"; // Görselin dosya yolunu güncelle

function BookingSection() {
  return (
    <div className={classes.bookingContainer}>
      <div className={classes.bookingContent}>
        <h2 className={classes.bookingTitle}>
          Sivas’ta bir ilk! <span className={classes.highlight}>Randevu Sistemi</span> ile şehirlerarası seyahatlerinizde
          konforlu bir yolculuk geçirebilirsiniz!
        </h2>
        <p className={classes.bookingDescription}>
          Temiz Araçlarla Uzun yollarınızın ve şehir içi ulaşımlarınızın vazgeçilmezi olmak istiyoruz.
          Sivas’ın En İyi Taksisiyle Yolculuğa Başlayın!
        </p>
        <div className={classes.bookingButtons}>
          <a href="#" className={classes.reserveButton}>
            <FaCalendarAlt /> Randevu Al
          </a>
          <a href="tel:+905468060929" className={classes.taxiButton}>
            <FaTaxi /> Taksi Çağır
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
