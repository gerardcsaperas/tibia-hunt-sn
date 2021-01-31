require("dotenv").config();
const mongoose = require("mongoose");
const Item = require("../models/item");
const Imbuement = require("../models/imbuement");
const Charm = require("../models/charm");

const itemTypes = [
  "Ammunition",
  "Amulets_and_Necklaces",
  "Armors",
  "Axe_Weapons",
  "Boots",
  "Club_Weapons",
  "Distance_Weapons",
  "Helmets",
  "Legs",
  "Potions",
  "Quivers",
  "Rings",
  "Rods",
  "Runes",
  "Shields",
  "Spellbooks",
  "Sword_Weapons",
  "Wands",
];

mongoose.connect(
  "mongodb+srv://gcsaperas:castrelosaperas9@cluster0.8apjr.mongodb.net/TibiaHuntingRecords?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  async () => {
    // itemTypes.forEach(async (type) => {
    //     const items = require(`../assets/${type}`);

    //     try {
    //       await Item.create(items);
    //       console.log(`Success. Items of type ${type} uploaded to DB.`);
    //     } catch (e) {
    //       console.log("Catch: " + e.message);
    //     }
    const imbuements = require("../assets/Imbuements.json");
    const charms = require("../assets/Charms.json");

    try {
      await Imbuement.create(imbuements);
      console.log(`Success. Imbuements uploaded to DB.`);
      await Charm.create(charms);
      console.log(`Success. Charms uploaded to DB.`);
    } catch (e) {
      console.log("Error :" + e.message);
    }
  }
);
//}
//);
