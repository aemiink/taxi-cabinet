import React from "react";
import classes from "./HeroSection.module.css";
import heroImage from "../../assets/taxi-driver.svg"; // Arka plan görseli

function HeroSection() {
    return (
        <section className={classes.hero}>
            <div className={classes.heroContent}>
                <h1>
                    Birlikte, Harika ve güvenilir yolculuklar yapmak <br />
                    <span className={classes.highlight}>istemez misiniz?</span>
                </h1>
                <p>
                    İster günlük işleriniz için, ister özel bir yolculukta güvenli, konforlu ve hızlı ulaşım her zaman elinizin altında.
                </p>
                <a href="tel:+905468060929" className={classes.callButton}>🚖 Taksi Çağır</a>
                <div className={classes.stats}>
                    <div>
                        <h3>1000+</h3>
                        <p>Müşteriler</p>
                    </div>
                    <div>
                        <h3>4+</h3>
                        <p>Araçlar</p>
                    </div>
                    <div>
                        <h3>5+</h3>
                        <p>Şoförler</p>
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
