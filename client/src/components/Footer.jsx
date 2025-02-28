import React, { useContext } from "react";
import BookingSection from './Footer/BookingSection'
import classes from "./Footer.module.css";
import logo from "../assets/taksilogo.svg";
import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";
import LanguageContext from "../context/LanguageContext";

function Footer() {
  const { language } = useContext(LanguageContext);


  const translations = {
    tr: {
      companyName: "Sivas Royal Taksi",
      description:
        "Sivas Royal Taksi web sitesi, şoförlerimiz ile kullanıcılarımız arasındaki işbirliklerini oluşturur. Kullanıcılarımız uygulamadaki tüm talepleri kendi başlarına oluşturur ve gerçekleştirir.",
      links: ["Anasayfa", "Hizmetlerimiz", "Taksilerimiz", "Hakkımızda"],
      taxiCall: "Taksi Çağır",
      reserve: "Randevu Al",
      copyright: "© Social Tech Digital Marketing, 2024",
    },
    en: {
      companyName: "Sivas Royal Taxi",
      description:
        "The Sivas Royal Taxi website facilitates collaboration between our drivers and users. Users can create and fulfill all requests in the application on their own.",
      links: ["Home", "Our Services", "Our Taxis", "About Us"],
      taxiCall: "Call Taxi",
      reserve: "Book Now",
      copyright: "© Social Tech Digital Marketing, 2024",
    },
  };


  const t = translations[language] || translations["tr"];

  return (
    <>
      <BookingSection />
      <footer className={classes.footer}>
        <div className={classes.container}>

          <div className={classes.footerLeft}>
            <img src={logo} alt={t.companyName} className={classes.logo} />
            <p className={classes.companyName}>
              <span className={classes.bold}>Sivas</span> {t.companyName.split(" ")[1]}
            </p>
            <p className={classes.footerDescription}>{t.description}</p>
            <div className={classes.socialIcons}>
              <FaFacebook className={classes.icon} />
              <FaInstagram className={classes.icon} />
              <FaEnvelope className={classes.icon} />
            </div>
          </div>


          <div className={classes.footerCenter}>
            <ul>
              {t.links.map((link, index) => (
                <li key={index}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>


          <div className={classes.footerRight}>
            <a href="tel:+905551112233" className={classes.taxiButton}>
              🚖 {t.taxiCall}
            </a>


            <a href="#" className={classes.reserveButton}>
              📅 {t.reserve}
            </a>
          </div>
        </div>


        <div className={classes.footerBottom}>
          <p>{t.copyright}</p>
        </div>
      </footer>
    </>

  );
}

export default Footer;
