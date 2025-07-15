import React, { useState, useContext } from "react";
import classes from "./ReservationTab.module.css";
import { cities } from "../../utils/cities"; 
import reservationImage from "../../assets/reservation-image.svg";
import LanguageContext from "../../context/LanguageContext"; // 📌 Dil desteği için

function ReservationTab() {
  const { language } = useContext(LanguageContext);

  const translations = {
    tr: {
      title: "Şehirlerarası yolculuklarınızda",
      highlight: "her zaman yanınızdayız!",
      subtitle: "Önceden fiyatınızı alın, şehirlerarası yolculuğunuzu en konforlu şekilde yapın!",
      name: "İsim",
      surname: "Soyisim",
      phone: "Telefon Numarası",
      date: "Tarih",
      time: "Saat",
      from: "Bulunduğunuz Şehir",
      to: "Gideceğiniz Şehir",
      notes: "Özel olarak iletmek istediğiniz bir şey var mı?",
      submit: "REZERVASYON YAP",
      sending: "Gönderiliyor...",
      selectCity: "Şehir Seçiniz",
      requiredFields: "❌ Lütfen tüm alanları doldurun!",
      success: "✅ Rezervasyon yapıldı ve WhatsApp mesajı gönderildi!",
      fail: "❌ Sunucu hatası, tekrar deneyin!",
      whatsappFail: "⚠️ Rezervasyon başarılı fakat WhatsApp mesajı gönderilemedi."
    },
    en: {
      title: "For your intercity travels,",
      highlight: "we are always with you!",
      subtitle: "Get your price in advance and make your intercity journey as comfortable as possible!",
      name: "Name",
      surname: "Surname",
      phone: "Phone Number",
      date: "Date",
      time: "Time",
      from: "Current City",
      to: "Destination City",
      notes: "Do you have anything special to mention?",
      submit: "MAKE RESERVATION",
      sending: "Sending...",
      selectCity: "Select a City",
      requiredFields: "❌ Please fill in all fields!",
      success: "✅ Reservation made and WhatsApp message sent!",
      fail: "❌ Server error, please try again!",
      whatsappFail: "⚠️ Reservation successful but WhatsApp message could not be sent."
    }
  };

  const t = translations[language] || translations.tr;

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    date: "",
    time: "",
    from: "",
    to: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL ;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
        if (key !== "notes" && !formData[key]) {
            alert(t.requiredFields);
            return;
        }
    }

    setLoading(true);

    try {

        const reservationResponse = await fetch(`${API_BASE}/reservations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const reservationData = await reservationResponse.json();

        if (!reservationResponse.ok) {
            alert("❌ Hata: " + reservationData.error);
            setLoading(false);
            return;
        }


        const whatsappResponse = await fetch(`${API_BASE}/whatsapp/send-whatsapp-message`, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                driverPhone: "+905551112233",  // 📌 Gerçek şoför numarası buraya eklenmeli!
                reservationDetails: {
                    customerName: `${formData.name} ${formData.surname}`,
                    date: formData.date,
                    time: formData.time,
                    from: formData.from,
                    to: formData.to,
                    customerPhone: formData.phone,
                    notes: formData.notes || "Belirtilmemiş"
                }
            }),
        });

        const whatsappData = await whatsappResponse.json();

        if (whatsappData.ok) {
            alert(t.success);
        } else {
            alert(t.whatsappFail);
        }

        setFormData({
            name: "",
            surname: "",
            phone: "",
            date: "",
            time: "",
            from: "",
            to: "",
            notes: "",
        });

    } catch (error) {
        console.error("Rezervasyon veya WhatsApp hatası:", error);
        alert(t.fail);
    }

    setLoading(false);
};

  return (
    <section className={classes.reservationSection}>
      <h2 className={classes.sectionTitle}>
        {t.title} <span className={classes.highlight}>{t.highlight}</span>
      </h2>
      <p className={classes.sectionSubtitle}>{t.subtitle}</p>

      <div className={classes.reservationContainer}>
        <form onSubmit={handleSubmit} className={classes.reservationForm}>
          <div className={classes.inputGroup}>
            <div>
              <label>{t.name}</label>
              <input type="text" name="name" placeholder={t.name} value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label>{t.surname}</label>
              <input type="text" name="surname" placeholder={t.surname} value={formData.surname} onChange={handleChange} required />
            </div>
          </div>

          <div className={classes.inputGroup}>
            <div>
              <label>{t.to}</label>
              <select name="to" value={formData.to} onChange={handleChange} required>
                <option value="">{t.selectCity}</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label>{t.from}</label>
              <select name="from" value={formData.from} onChange={handleChange} required>
                <option value="">{t.selectCity}</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={classes.inputGroup}>
            <div>
              <label>{t.date}</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div>
              <label>{t.time}</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} required />
            </div>
          </div>

          <div className={classes.inputGroup}>
            <div>
              <label>{t.phone}</label>
              <div className={classes.phoneInput}>
                <span>+90</span>
                <input type="tel" name="phone" placeholder="555 555 55 55" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className={classes.inputGroup}>
            <label>{t.notes}</label>
            <textarea name="notes" placeholder={t.notes} value={formData.notes} onChange={handleChange} />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? t.sending : t.submit}
          </button>
        </form>

        <div className={classes.reservationImage}>
          <img src={reservationImage} alt="Reservation illustration" />
        </div>
      </div>
    </section>
  );
}

export default ReservationTab;
