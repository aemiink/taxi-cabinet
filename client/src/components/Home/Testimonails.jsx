import React, { useState, useEffect } from "react";
import classes from "./Testimonials.module.css";

const testimonials = [
  {
    id: 1,
    text: "Royal Taksi hizmeti gerçekten harika! Şoförler güler yüzlü ve çok nazik. Şehir ulaşımında ilk tercihim.",
    author: "Ahmet Yılmaz",
    background: "yellow",
  },
  {
    id: 2,
    text: "Şehirlerarası bir yolculuk yaptım ve gerçekten çok rahat ettim. Araçlar çok temizdi. Teşekkür ederim.",
    author: "Zeynep Demir",
    background: "black",
  },
  {
    id: 3,
    text: "Uzun süredir kullandığım en iyi taksi hizmeti. Yol boyunca rahat ettim ve keyifli bir sohbet ettik.",
    author: "Ayşe Koç",
    background: "yellow",
  },
  {
    id: 4,
    text: "Taksi çağırma süreci çok hızlıydı, dakikalar içinde kapımdaydı. Çok memnun kaldım!",
    author: "Mehmet Kaya",
    background: "black",
  },
  {
    id: 5,
    text: "Sivas'ta güvenilir bir taksi hizmeti bulmak zor, ama burası harika! Hem hızlı hem güvenilir.",
    author: "Elif Şahin",
    background: "yellow",
  },
];

function Testimonials() {
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
      }, 300); // 300ms içinde fade out, sonra yeni slayt
    }, 5000); // 5 saniyede bir değişim

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={classes.testimonialsSection}>
      <div className={classes.container}>
        <h2 className={classes.testimonialsTitle}>
          Bu mükemmel yolculuğun kahramanı: <span className={classes.highlight}>Müşterilerimiz!</span>
        </h2>
        <p className={classes.testimonialsDescription}>
          Hayatın koşuşturmacasında güvenli ve konforlu bir yolculuk aradıklarında direkt bizi arayan müşterilerimiz,
          iyi ki varsınız! Bu harika müşterilerimizin yorumları bizim için değerli.
        </p>

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
