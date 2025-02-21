require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "http://localhost:5173", // Sadece frontend’den gelen isteklere izin ver
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type"
}));


// 📌 `.env` dosyasının yüklendiğini kontrol et
console.log("📌 Yüklenen MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
    console.error("❌ HATA: `.env` dosyanız yüklenmedi veya içinde MONGO_URI tanımlı değil.");
    process.exit(1); // Uygulamayı durdur
}

// 📌 MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB bağlantısı başarılı!"))
    .catch(err => console.error("❌ MongoDB bağlantı hatası:", err));

// 📌 Varsayılan dil
let selectedLanguage = "tr";

// 📌 Backend başlatıldığında dili dosyadan oku
if (fs.existsSync("language.json")) {
  const savedLang = fs.readFileSync("language.json", "utf8");
  selectedLanguage = JSON.parse(savedLang).language;
}

// 📌 GET: Seçili dili al
app.get("/language", (req, res) => {
  res.json({ language: selectedLanguage });
});

// 📌 POST: Dili değiştir ve dosyaya kaydet
app.post("/language", (req, res) => {
  selectedLanguage = req.body.language;
  fs.writeFileSync("language.json", JSON.stringify({ language: selectedLanguage }));
  res.json({ message: `Dil ${selectedLanguage} olarak değiştirildi.` });
});

// 📌 Rezervasyon Modeli
const ReservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Reservation = mongoose.model("Reservation", ReservationSchema);

// 📌 POST: Yeni rezervasyon oluştur
app.post("/reservations", async (req, res) => {
  try {
      console.log("📩 Yeni rezervasyon isteği alındı:", req.body); // Debugging için log ekledik
      const newReservation = new Reservation(req.body);
      await newReservation.save();
      res.status(201).json({ message: "✅ Rezervasyon başarıyla kaydedildi!" });
  } catch (error) {
      console.error("❌ Rezervasyon kaydedilirken hata oluştu:", error);
      res.status(500).json({ error: "❌ Sunucu hatası, lütfen tekrar deneyin!" });
  }
});


app.delete("/reservations/:id", async (req, res) => {
  try {
      await Reservation.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "✅ Rezervasyon silindi!" });
  } catch (error) {
      res.status(500).json({ error: "❌ Rezervasyon silinemedi!" });
  }
});


app.post("/reservations", async (req, res) => {
  console.log("📩 Gelen veri:", req.body); // Gelen veriyi terminalde göster
  try {
      if (!req.body.name || !req.body.surname || !req.body.phone || !req.body.date || !req.body.time || !req.body.from || !req.body.to) {
          return res.status(400).json({ error: "❌ Eksik alanlar var!" });
      }

      const newReservation = new Reservation(req.body);
      await newReservation.save();
      res.status(201).json({ message: "✅ Rezervasyon başarıyla kaydedildi!" });
  } catch (error) {
      console.error("❌ Rezervasyon kaydedilirken hata oluştu:", error);
      res.status(500).json({ error: "❌ Sunucu hatası, lütfen tekrar deneyin!" });
  }
});




// 📌 Backend başlat
app.listen(PORT, () => {
  console.log(`🚀 Backend çalışıyor: http://localhost:${PORT}`);
});
