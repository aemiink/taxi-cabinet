import React, { useState } from "react";
import classes from "./Reservation.module.css";

function ReservationPage() {
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

  const [message, setMessage] = useState(""); // Başarı/Hata mesajı için
  const [loading, setLoading] = useState(false); // Yükleme durumu için

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Eksik alanları kontrol et
    for (let key in formData) {
      if (key !== "notes" && !formData[key]) {
        alert("❌ Lütfen tüm alanları doldurun!");
        return;
      }
    }

    try {
        const response = await fetch("http://localhost:5000/reservations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData), // ✅ JSON formatına çevrildi
        });

        const data = await response.json();
        if (response.ok) {
            alert("✅ Rezervasyon başarıyla kaydedildi!");
            setFormData({
                name: "", surname: "", phone: "", date: "", time: "", from: "", to: "", notes: "",
            });
        } else {
            alert("❌ Hata: " + data.error);
        }
    } catch (error) {
        console.error("Rezervasyon hatası:", error);
        alert("❌ Sunucu hatası, tekrar deneyin!");
    }
};


  return (
    <div className={classes.reservationContainer}>
      <h2>📅 Taksi Rezervasyonu Yap</h2>

      {message && <p className={classes.message}>{message}</p>}

      <form onSubmit={handleSubmit} className={classes.reservationForm}>
        <input type="text" name="name" placeholder="Adınız" value={formData.name} onChange={handleChange} required />
        <input type="text" name="surname" placeholder="Soyadınız" value={formData.surname} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Telefon Numaranız" value={formData.phone} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        <input type="text" name="from" placeholder="Nereden" value={formData.from} onChange={handleChange} required />
        <input type="text" name="to" placeholder="Nereye" value={formData.to} onChange={handleChange} required />
        <textarea name="notes" placeholder="Ek Notlar (Opsiyonel)" value={formData.notes} onChange={handleChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Gönderiliyor..." : "Rezervasyon Yap"}
        </button>
      </form>
    </div>
  );
}

export default ReservationPage;
