require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json()); 
app.use(cookieParser()); 


app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
  credentials: true, 
}));

const corsOptions = {
    origin: ["http://localhost:5173", "https://taxicabinet.com"], 
    methods: "GET,POST,PUT,DELETE",
    credentials: true, 
  };
  app.use(cors(corsOptions));
  


if (!process.env.MONGO_URI) {
    console.error("❌ HATA: .env dosyanız yüklenmedi veya içinde MONGO_URI tanımlı değil.");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB bağlantısı başarılı!"))
    .catch(err => {
        console.error("❌ MongoDB bağlantı hatası:", err);
        process.exit(1);
    });

let selectedLanguage = "tr";
if (fs.existsSync("language.json")) {
    const savedLang = fs.readFileSync("language.json", "utf8");
    selectedLanguage = JSON.parse(savedLang).language;
}


app.get("/language", (req, res) => {
    res.json({ language: selectedLanguage });
});


app.post("/language", (req, res) => {
    selectedLanguage = req.body.language;
    fs.writeFileSync("language.json", JSON.stringify({ language: selectedLanguage }));
    res.json({ message: `Dil ${selectedLanguage} olarak değiştirildi.` }); // ✅ Düzeltildi
});


const reservationRoutes = require("./routes/reservationRoutes");
const authRoutes = require("./routes/authRoutes"); 
const driverRoutes = require("./routes/driverRoutes");
const carRoutes = require("./routes/carsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes");  


app.use("/reservations", reservationRoutes); 
app.use("/auth", authRoutes); 
app.use("/drivers", driverRoutes);
app.use("/cars", carRoutes);
app.use("/admin", adminRoutes);
app.use("/whatsapp", whatsappRoutes); 


app.get("/", (req, res) => {
    res.send("🚀 Sunucu çalışıyor!");
});


app.listen(PORT, () => {
    console.log(`🚀 Backend çalışıyor: http://localhost:${PORT}`);
});
