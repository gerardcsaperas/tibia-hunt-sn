const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const spotSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Spot = model("Spot", spotSchema);

module.exports = Spot;