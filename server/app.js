require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // JSON verilerini almak için

// Test Route
app.get("/", (req, res) => {
  res.send("Express.js backend çalışıyor!");
});

// Dil değiştirme route'u
let selectedLanguage = "tr"; // Varsayılan dil

app.get("/language", (req, res) => {
  res.json({ language: selectedLanguage });
});

app.post("/language", (req, res) => {
  selectedLanguage = req.body.language;
  res.json({ message: `Dil ${selectedLanguage} olarak değiştirildi.` });
});

// Backend başlat
app.listen(PORT, () => {
  console.log(`Backend çalışıyor: http://localhost:${PORT}`);
});
