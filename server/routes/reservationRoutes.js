const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

// 📌 Rezervasyon Oluştur
router.post("/", async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();
        res.status(201).json({ message: "Rezervasyon başarıyla oluşturuldu!" });
    } catch (error) {
        res.status(500).json({ error: "Rezervasyon kaydedilemedi!" });
    }
});

// 📌 Tüm Rezervasyonları Getir (Admin Paneli için)
router.get("/", async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: "Rezervasyonlar getirilemedi!" });
    }
});

module.exports = router;
