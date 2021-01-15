const Item = require('../models/item');
const Imbuement = require('../models/imbuement');
const Charm = require('../models/charm');

/*
type:    GET
desc:    Get all items
auth:    Public
*/
async function findItems(req, res) {
    try {
        const items = await Item.find();
        res.status(200).send(items);
    } catch(e) {
        console.log(`There was a problem trying to retrieve items. Error: ${e.message}`);
        res.status(500).json({ message: `There was a problem trying to retrieve items. Error: ${e.message}` })
    }
}

/*
type:    GET
desc:    Get a single item by id
auth:    Public
*/
async function findItemById(req, res) {
    try {
        const item = await Item.findById(req.params.id);
        res.status(200).send(item);
    } catch(e) {
        console.log(`There was a problem trying to retrieve item ${req.params.id}. Error: ${e.message}`);
        res.status(500).json({ message: `There was a problem trying to retrieve item ${req.params.id}. Error: ${e.message}` })
    }
}

/*
type:    GET
desc:    Get all imbuements
auth:    Public
*/
async function findImbuements(req, res) {
    try {
        const imbuements = await Imbuement.find();
        res.status(200).send(imbuements);
    } catch(e) {
        console.log(`There was a problem trying to retrieve imbuements. Error: ${e.message}`);
        res.status(500).json({ message: `There was a problem trying to retrieve imbuements. Error: ${e.message}` })
    }
}

/*
type:    GET
desc:    Get a single imbuement by id
auth:    Public
*/
async function findImbuementById(req, res) {
    try {
        const imbuement = await Imbuement.findById(req.params.id);
        res.status(200).send(imbuement);
    } catch(e) {
        console.log(`There was a problem trying to retrieve imbuement ${req.params.id}. Error: ${e.message}`);
        res.status(500).json({ message: `There was a problem trying to retrieve imbuement ${req.params.id}. Error: ${e.message}` })
    }
}

/*
type:    GET
desc:    Get all charms
auth:    Public
*/
async function findCharms(req, res) {
    try {
        const charms = await Charm.find();
        res.status(200).send(charms);
    } catch(e) {
        console.log(`There was a problem trying to retrieve charms. Error: ${e.message}`);
        res.status(500).json({ message: `There was a problem trying to retrieve charms. Error: ${e.message}` })
    }
}

/*
type:    GET
desc:    Get a single item by id
auth:    Public
*/
async function findCharmById(req, res) {
    try {
        const charm = await Charm.findById(req.params.id);
        res.status(200).send(charm);
    } catch(e) {
        console.log(`There was a problem trying to retrieve charm ${req.params.id}. Error: ${e.message}`);
        res.status(500).json({ message: `There was a problem trying to retrieve charm ${req.params.id}. Error: ${e.message}` })
    }
}

/*
type:   POST
desc:   Post images to Cloudinary
auth:   Private
*/
async function postImages(req, res) {
    try {
        const fileStr = req.body.data;
        console.log(fileStr);
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    findItems,
    findItemById,
    findImbuements,
    findImbuementById,
    findCharms,
    findCharmById,
    postImages
}