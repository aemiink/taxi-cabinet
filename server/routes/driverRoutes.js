const express = require("express");
const router = express.Router();
const Driver = require("../models/DriverModel"); 


router.get("/", async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ error: "Sunucu hatası" });
    }
});


router.post("/add", async (req, res) => {
    try {
        const { image, name, experience, years } = req.body;
        const newDriver = new Driver({ image, name, experience, years });
        await newDriver.save();
        res.json(newDriver);
    } catch (error) {
        res.status(500).json({ error: "Şoför eklenirken hata oluştu" });
    }
});


router.delete("/delete/:id", async (req, res) => {
    try {
        await Driver.findByIdAndDelete(req.params.id);
        res.json({ message: "Şoför silindi" });
    } catch (error) {
        res.status(500).json({ error: "Şoför silinirken hata oluştu" });
    }
});

module.exports = router;
