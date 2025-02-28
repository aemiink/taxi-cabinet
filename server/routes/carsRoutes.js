const express = require("express");
const router = express.Router();
const Car = require("../models/Car"); 


router.get("/", async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: "Sunucu hatası" });
    }
});


router.post("/add", async (req, res) => {
    try {
        const { image, name, description } = req.body;
        const newCar = new Car({ image, name, description });
        await newCar.save();
        res.json(newCar);
    } catch (error) {
        res.status(500).json({ error: "Araç eklenirken hata oluştu" });
    }
});


router.delete("/delete/:id", async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: "Araç silindi" });
    } catch (error) {
        res.status(500).json({ error: "Araç silinirken hata oluştu" });
    }
});

module.exports = router;
