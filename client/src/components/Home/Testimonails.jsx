import React, { useState, useEffect, useContext } from "react";
import classes from "./Testimonials.module.css";
import LanguageContext from "../../context/LanguageContext";

const testimonialsData = {
  tr: [
    { id: 1, text: "Royal Taksi hizmeti gerçekten harika! Şoförler güler yüzlü ve çok nazik. Şehir ulaşımında ilk tercihim.", author: "Ahmet Yılmaz", background: "yellow" },
    { id: 2, text: "Şehirlerarası bir yolculuk yaptım ve gerçekten çok rahat ettim. Araçlar çok temizdi. Teşekkür ederim.", author: "Zeynep Demir", background: "black" },
    { id: 3, text: "Uzun süredir kullandığım en iyi taksi hizmeti. Yol boyunca rahat ettim ve keyifli bir sohbet ettik.", author: "Ayşe Koç", background: "yellow" },
    { id: 4, text: "Taksi çağırma süreci çok hızlıydı, dakikalar içinde kapımdaydı. Çok memnun kaldım!", author: "Mehmet Kaya", background: "black" },
    { id: 5, text: "Sivas'ta güvenilir bir taksi hizmeti bulmak zor, ama burası harika! Hem hızlı hem güvenilir.", author: "Elif Şahin", background: "yellow" },
  ],
  en: [
    { id: 1, text: "Royal Taxi service is truly amazing! The drivers are friendly and very polite. My first choice for city transportation.", author: "Ahmet Yılmaz", background: "yellow" },
    { id: 2, text: "I had an intercity trip, and it was really comfortable. The vehicles were very clean. Thank you.", author: "Zeynep Demir", background: "black" },
    { id: 3, text: "The best taxi service I've used for a long time. I felt comfortable throughout the journey and had a pleasant conversation.", author: "Ayşe Koç", background: "yellow" },
    { id: 4, text: "The taxi booking process was very fast, it arrived at my door within minutes. I was very satisfied!", author: "Mehmet Kaya", background: "black" },
    { id: 5, text: "Finding a reliable taxi service in Sivas is difficult, but this place is great! Both fast and reliable.", author: "Elif Şahin", background: "yellow" },
  ],
};

function Testimonials() {
  const { language } = useContext(LanguageContext);
  const testimonials = testimonialsData[language] || testimonialsData["tr"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1
        );
        setFade(true);
      }, 300); 
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const translations = {
    tr: {
      title: "Bu mükemmel yolculuğun kahramanı:",
      highlight: "Müşterilerimiz!",
      description: "Hayatın koşuşturmacasında güvenli ve konforlu bir yolculuk aradıklarında direkt bizi arayan müşterilerimiz, iyi ki varsınız! Bu harika müşterilerimizin yorumları bizim için değerli.",
    },
    en: {
      title: "The hero of this amazing journey:",
      highlight: "Our Customers!",
      description: "When looking for a safe and comfortable journey in the hustle and bustle of life, our customers who directly call us, we are glad you are here! The feedback from our amazing customers is valuable to us.",
    },
  };

  const t = translations[language] || translations["tr"];

  return (
    <section className={classes.testimonialsSection}>
      <div className={classes.container}>
        <h2 className={classes.testimonialsTitle}>
          {t.title} <span className={classes.highlight}>{t.highlight}</span>
        </h2>
        <p className={classes.testimonialsDescription}>{t.description}</p>

        <div className={`${classes.testimonialsSlider} ${fade ? classes.fadeIn : classes.fadeOut}`}>
          {testimonials.slice(currentIndex, currentIndex + 3).map((review) => (
            <div
              key={review.id}
              className={`${classes.testimonialCard} ${review.background === "yellow" ? classes.yellowBg : classes.blackBg}`}
            >
              <blockquote className={classes.testimonialQuote}>❝ {review.text} ❞</blockquote>
              <p className={classes.author}>{review.author}</p>
            </div>
          ))}
        </div>

        <div className={classes.pagination}>
          {testimonials.slice(0, testimonials.length - 2).map((_, index) => (
            <span
              key={index}
              className={`${classes.dot} ${index === currentIndex ? classes.activeDot : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
