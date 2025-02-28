const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation"); 


router.post("/", async (req, res) => {
    console.log("📩 Yeni rezervasyon isteği alındı:", req.body);
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


router.get("/", async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: "❌ Rezervasyonlar getirilemedi!" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        await Reservation.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "✅ Rezervasyon silindi!" });
    } catch (error) {
        res.status(500).json({ error: "❌ Rezervasyon silinemedi!" });
    }
});

module.exports = router;
