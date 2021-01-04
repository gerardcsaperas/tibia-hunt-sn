const { json } = require('express');
const axios = require('axios');
const Character = require('../models/character');
const { queryToMongoFilter } = require('../utils/queryToMongoFilter');

/*
type:    GET
desc:    Get characters (by user id)
auth:    Private
*/
async function findMine(req, res) {
    try {
        const characters = await Character.find({ user: req.user._id })

        res.status(200).send(characters);

    } catch(e) {
        console.log(`Error retrieving characters for user ${req.user._id}. Error: ${e.message}`)
        res.status(400).json({ message: `Error retrieving characters for user ${req.user._id}. Error: ${e.message}` })
    }
    return null
}

/*
type:    POST
desc:    Create characters
auth:    Private
*/
async function create(req, res) {
    
    const character = new Character(req.body);
    character.user = req.user._id;

    try {
        await character.save();
        res.status(201).send(character);
    } catch(e) {
        console.log(`Error saving character. Error: ${e.message}`)
        res.status(400).json({ message: `Error saving character. Error: ${e.message}` })
    }
}

/*
type:    PUT
desc:    Update characters
auth:    Private
*/
async function update(req, res) {
    
    const updates = Object.keys(req.body);

    try {
        const character = await Character.findById(req.params.id);

        updates.forEach((update) => (character[update] = req.body[update]));

        await character.save();
        res.status(201).send(character);
	} catch (e) {
        console.log(`There was an error updating your character. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error updating your character. Error: ${e.message}` })
	}

}

/*
type:    DELETE
desc:    Remove characters by id
auth:    Private
*/
async function remove(req, res) {
    try {
        await Character.findByIdAndDelete(req.params.id)
		res.status(204).send();
	} catch (e) {
		console.log(`There was an error removing your character. Error: ${e.message}`);
		res.status(500).json({ message: `There was an error removing your character. Error: ${e.message}` })
	}
}

/*
type:    Internal
desc:    Update characters using Tibia Data
auth:    Internal
*/
async function updateTibiaData() {
    try {
        // Get characters which have to be in sync with Tibia Data API
        const characters = await Character.find({ tibiaApiSync: true });
        
        if (characters.length === 0) {
            return;
        }

        // Update every character according to Tibia Data's information
        characters.forEach( async (character) => {
            const response = await axios.get(`https://api.tibiadata.com/v2/characters/${character.characterName}.json`)
            const updates = ['vocation', 'level', 'world']

            updates.forEach((update) => (character[update] = response.characters.data[update]));
            
            character.save()
            return;
        })

    } catch(e) {
        console.log(`There was an error with your characters' daily update. Error: ${e.message}`);
    }
}

module.exports = {
    findMine,
    create,
    update,
    remove,
    updateTibiaData
}