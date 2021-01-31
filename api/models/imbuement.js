const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const imbuementSchema = new Schema({
  name: String,
  type: String,
});

const Item = model("Imbuement", imbuementSchema);
module.exports = Item;
