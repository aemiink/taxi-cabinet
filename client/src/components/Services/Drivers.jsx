import React, { useEffect, useState, useContext } from "react";
import classes from "./Drivers.module.css"; 
import LanguageContext from "../../context/LanguageContext"; 
import placeholderImage from "../../assets/default-driver.svg"; 

function Drivers() {
    const { language } = useContext(LanguageContext);
    const [drivers, setDrivers] = useState([]);
    const [hoveredDriver, setHoveredDriver] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/drivers")
            .then(res => res.json())
            .then(data => setDrivers(data))
            .catch(err => console.error("❌ Şoförleri çekerken hata:", err));
    }, []);

    const translations = {
        tr: {
            title: "Tüm yolculuklarınızda",
            highlight: "yanınızda olan ekibimiz!",
            subtitle: "Önceden fiyatınızı alın, şehirlerarası yolculuğunuzu en konforlu şekilde yapın!",
            experience: "Deneyim",
            workYears: "Çalışma Süresi",
            longDistance: "Uzun Yol",
            yes: "✔"
        },
        en: {
            title: "Our team that is always with!",
            highlight: " you on all your journeys!",
            subtitle: "Get your price in advance and travel intercity in the most comfortable way!",
            experience: "Experience",
            workYears: "Work Years",
            longDistance: "Long Distance",
            yes: "✔"
        }
    };

    const t = translations[language] || translations.tr;

    return (
        <section className={classes.driversSection}>
            <h2 className={classes.sectionTitle}>{t.title} <span>{t.highlight}</span></h2>
            <p className={classes.sectionSubtitle}>{t.subtitle}</p>

            <div className={classes.driversContainer}>
                {drivers.map((driver, index) => (
                    <div
                        key={driver._id}
                        className={`${classes.driverCard} ${hoveredDriver === index ? classes.hovered : ""}`}
                        onMouseEnter={() => setHoveredDriver(index)}
                        onMouseLeave={() => setHoveredDriver(null)}
                    >
                        <img src={driver.image || placeholderImage} alt={driver.name} className={classes.driverImage} />
                        
                        {hoveredDriver === index && (
                            <div className={classes.driverInfo}>
                                <h3>{driver.name}</h3>
                                <p><strong>{t.experience}:</strong> +{driver.experience} yıl</p>
                                <p><strong>{t.workYears}:</strong> +{driver.years} yıl</p>
                                <p><strong>{t.longDistance}:</strong> {t.yes}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Drivers;
