const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const charmSchema = new Schema({
  name: String,
  type: String,
});

const Charm = model("Charm", charmSchema);
module.exports = Charm;
