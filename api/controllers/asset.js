const Item = require('../models/item');
const Imbuement = require('../models/imbuement');
const Charm = require('../models/charm');
const { Cloudinary } = require('../utils/cloudinary');

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
desc:   Post profile images to Cloudinary
auth:   Private
*/
async function postProfileImage(req, res) {
    try {
        const fileStr = req.body.data;
        const uploaded = await Cloudinary.uploader.upload(fileStr, {
            upload_preset: 'tibiahuntingrecords_profiles'
        });
        
        if (!uploaded) {
            throw new Error();
        }

        const user = req.user;
        user.avatar = uploaded.secure_url;
        await user.save();

        res.status(200).send(user);
    } catch(e) {
        console.log(`There was something wrong when trying to upload your image to Cloudinary. ${e.message}`)
        res.status(500).json({ message: `There was something wrong when trying to upload your image to Cloudinary. ${e.message}` })
    }
}

/*
type:   POST
desc:   Post hunting images to Cloudinary
auth:   Private
*/
async function postHuntingRecordImage(req, res) {
    try {
        const fileStr = req.body.data;
        const uploaded = await Cloudinary.uploader.upload(fileStr, {
            upload_preset: 'tibiahuntingrecords_hunting-records'
        });
        
        if (!uploaded) {
            throw new Error();
        }

        res.status(200).send(uploaded.secure_url);
    } catch(e) {
        console.log(`There was something wrong when trying to upload your image to Cloudinary. ${e.message}`)
        res.status(500).json({ message: `There was something wrong when trying to upload your image to Cloudinary. ${e.message}` })
    }
}

module.exports = {
    findImbuements,
    findImbuementById,
    findCharms,
    findCharmById,
    postProfileImage,
    postHuntingRecordImage
}