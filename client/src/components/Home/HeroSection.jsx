import React, { useContext } from "react";
import classes from "./HeroSection.module.css";
import heroImage from "../../assets/taxi-driver.svg"; 
import LanguageContext from "../../context/LanguageContext";

function HeroSection() {
    const { language } = useContext(LanguageContext);

    const translations = {
        tr: {
            title: "Birlikte, Harika ve güvenilir yolculuklar yapmak",
            highlight: "istemez misiniz?",
            description: "İster günlük işleriniz için, ister özel bir yolculukta güvenli, konforlu ve hızlı ulaşım her zaman elinizin altında.",
            callTaxi: "🚖 Taksi Çağır",
            stats: ["Müşteriler", "Araçlar", "Şoförler"]
        },
        en: {
            title: "Would you like to have amazing and safe trips",
            highlight: "together?",
            description: "Whether for your daily tasks or a special journey, safe, comfortable, and fast transportation is always at your fingertips.",
            callTaxi: "🚖 Call a Taxi",
            stats: ["Customers", "Vehicles", "Drivers"]
        }
    };

    const t = translations[language] || translations["tr"]; // Varsayılan TR

    return (
        <section className={classes.hero}>
            <div className={classes.heroContent}>
                <h1>
                    {t.title} <br />
                    <span className={classes.highlight}>{t.highlight}</span>
                </h1>
                <p>{t.description}</p>
                <a href="tel:+905468060929" className={classes.callButton}>{t.callTaxi}</a>
                <div className={classes.stats}>
                    <div>
                        <h3>1000+</h3>
                        <p>{t.stats[0]}</p>
                    </div>
                    <div>
                        <h3>4+</h3>
                        <p>{t.stats[1]}</p>
                    </div>
                    <div>
                        <h3>5+</h3>
                        <p>{t.stats[2]}</p>
                    </div>
                </div>
            </div>
            <div className={classes.heroImage}>
                <img src={heroImage} alt="Taksi Şoförü" />
            </div>
        </section>
    );
}

export default HeroSection;
