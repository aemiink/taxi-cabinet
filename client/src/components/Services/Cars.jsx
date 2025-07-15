import React, { useEffect, useState, useContext } from "react";
import classes from "./Cars.module.css";
import LanguageContext from "../../context/LanguageContext";
import placeholderCar from "../../assets/default-car.svg"; 

function Cars() {
    const { language } = useContext(LanguageContext);
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null); 
    const API_BASE = import.meta.env.VITE_API_URL ;

    useEffect(() => {
        fetch(`${API_BASE}/cars`)
            .then(res => res.json())
            .then(data => setCars(data))
            .catch(err => console.error("❌ Arabaları çekerken hata:", err));
    }, []);

    const translations = {
        tr: {
            title: "Harika ve Güvenilir Yolculuğunuzda sizlere eşlik edecek",
            highlight: "taksilerimiz!",
            description: "Hayatın koşuşturmacasında güvenli ve konforlu bir yolculuk her zaman önemlidir. Royal Taksi sizlere yolculuğunuz boyunca konforlu ve güvenli taksilerle eşlik ediyor!",
            callTaxi: "🚖 Taksi Çağır",
            close: "Kapat"
        },
        en: {
            title: "For a great and safe journey, meet our",
            highlight: "taxis!",
            description: "In the hustle and bustle of life, a safe and comfortable journey is always important. Royal Taxi is with you throughout your journey with comfortable and safe taxis!",
            callTaxi: "🚖 Call Taxi",
            close: "Close"
        }
    };

    const t = translations[language] || translations.tr;

    return (
        <section className={classes.carsSection}>
            <h2 className={classes.sectionTitle}>{t.title} <span className={classes.highlight}>{t.highlight}</span></h2>
            <p className={classes.sectionSubtitle}>{t.description}</p>

            <div className={classes.carsContainer}>
                {cars.map((car, index) => (
                    <div key={car._id} className={classes.carCard} onClick={() => setSelectedCar(car)}>
                        <img src={car.image || placeholderCar} alt={car.name} className={classes.carImage} />
                        <div className={classes.carInfo}>
                            <h3>{car.name}</h3>
                            <p>{car.description}</p>
                            <a href="tel:5555555555" className={classes.callButton}>{t.callTaxi}</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Cars;
