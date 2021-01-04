const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const itemSchema = new Schema({
  name: String,
  image: String,
  type: String,
});

itemSchema.pre("save", function (next) {
  const item = this;

  if (item.image.includes("&amp;")) {
    let replacedUrl = item.image.replace("&amp;", "&");
    item.image = replacedUrl;
  }

  next();
});

const Item = model("Item", itemSchema);
module.exports = Item;
