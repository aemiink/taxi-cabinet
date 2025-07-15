require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// ✅ Gelişmiş CORS: prod + local destekler
const allowedOrigins = [
  "http://localhost:5173",
  "https://taxicabinet.com",
  "https://your-railway-project.up.railway.app" // railway domainin buraya eklenmeli
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);

// ✅ MongoDB bağlantısı
if (!process.env.MONGO_URI) {
  console.error("❌ HATA: MONGO_URI tanımlı değil.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB bağlantısı başarılı!"))
  .catch((err) => {
    console.error("❌ MongoDB bağlantı hatası:", err);
    process.exit(1);
  });

// ⚠️ Railway'de dosya sistemine yazmak kalıcı değildir
let selectedLanguage = "tr";
if (fs.existsSync("language.json")) {
  try {
    const savedLang = fs.readFileSync("language.json", "utf8");
    selectedLanguage = JSON.parse(savedLang).language;
  } catch (err) {
    console.error("❌ language.json okunamadı:", err);
  }
}

app.get("/language", (req, res) => {
  res.json({ language: selectedLanguage });
});

app.post("/language", (req, res) => {
  selectedLanguage = req.body.language;
  try {
    fs.writeFileSync("language.json", JSON.stringify({ language: selectedLanguage }));
    res.json({ message: `Dil ${selectedLanguage} olarak değiştirildi.` });
  } catch (err) {
    res.status(500).json({ error: "Dil dosyası kaydedilemedi." });
  }
});

// ✅ Route'lar
app.use("/reservations", require("./routes/reservationRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/drivers", require("./routes/driverRoutes"));
app.use("/cars", require("./routes/carsRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/whatsapp", require("./routes/whatsappRoutes"));

// ✅ Statik Vite dosyalarını sun
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ✅ Sunucu başlat
app.listen(PORT, () => {
  console.log(`🚀 Backend çalışıyor: http://localhost:${PORT}`);
});
