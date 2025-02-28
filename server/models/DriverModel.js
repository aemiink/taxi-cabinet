const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true }, 
    experience: { type: Number, required: true },
    years: { type: Number, required: true },
    longDistance: { type: Boolean, default: false }
});

const Driver = mongoose.model("Driver", DriverSchema);
module.exports = Driver;
