const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String
});

module.exports = mongoose.model("Car", CarSchema);
