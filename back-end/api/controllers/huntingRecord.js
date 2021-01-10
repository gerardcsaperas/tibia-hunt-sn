const HuntingRecord = require('../models/huntingRecord');

/*
type:    GET
desc:    Get all Hunting Records
auth:    Public
*/
async function find(req, res) {
    try {
        const huntingRecords = await HuntingRecord.find()
        res.status(200).send(huntingRecords);
    } catch(e) {
        console.log(`Error retrieving hunting records. Error: ${e.message}`)
        res.status(400).json({ message: `Error retrieving hunting records. Error: ${e.message}` })
    }
}

/*
type:    GET
desc:    Get my Hunting Records
auth:    Private
*/
async function findMine(req, res) {
    try {
        const huntingRecords = await HuntingRecord.find({ user: req.user._id })
        res.status(200).send(huntingRecords);
    } catch(e) {
        console.log(`Error retrieving hunting records for user ${req.user._id}. Error: ${e.message}`)
        res.status(400).json({ message: `Error retrieving hunting records for user ${req.user._id}. Error: ${e.message}` })
    }
}

/*
type:    GET
desc:    Get Hunting Record by Id
auth:    Public
*/
async function findById(req, res) {
    try {
        const huntingRecord = await HuntingRecord.findById(req.params.id)

        if(!huntingRecord) {
            return res.status(404).json({ message: `We couldn't find hunting record with id ${req.params.id}` })
        }

        res.status(200).send(huntingRecord);
    } catch(e) {
        console.log(`Error retrieving hunting record with id ${req.params.id}. Error: ${e.message}`)
        res.status(400).json({ message: `Error retrieving hunting record with id ${req.params.id}. Error: ${e.message}` })
    }
}

/*
type:    POST
desc:    Post a Hunting Record
auth:    Public
*/
async function create(req, res) {
    
    const huntingRecord = new HuntingRecord(req.body);
    huntingRecord.user = req.user._id;
    
    try {
        await huntingRecord.save();
        res.status(201).send(huntingRecord);
    } catch(e) {
        console.log(`Error saving hunting record. Error: ${e.message}`)
        res.status(400).json({ message: `Error saving hunting record. Error: ${e.message}` })
    }
}

/*
type:    PUT
desc:    Update a Hunting Record
auth:    Private
*/
async function update(req, res) {
    const updates = Object.keys(req.body);
    try {
        const huntingRecord = await HuntingRecord.findById(req.params.id);

        if(!huntingRecord) {
            return res.status(404).json({ message: `We couldn't find hunting record with id ${req.params.id}` })
        }

        updates.forEach((update) => (huntingRecord[update] = req.body[update]));

        await huntingRecord.save();
        res.status(201).send(huntingRecord);
	} catch (e) {
        console.log(`There was an error updating your hunting record. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error updating your hunting record. Error: ${e.message}` })
	}
}

/*
type:    PUT
desc:    Like/Unlike a Hunting Record
auth:    Private
*/
async function patchLikes(req, res) {
    try {
        const huntingRecord = await HuntingRecord.findById(req.params.id);

        if (!huntingRecord) {
            return res.status(404).json({ message: `We couldn't find hunting record with id ${req.params.id}` })
        }

        const updatedHuntingRecord = await huntingRecord.patchLikes(req.user._id);
        res.status(201).send(updatedHuntingRecord);
	} catch (e) {
        console.log(`There was an error updating your hunting record. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error updating your hunting record. Error: ${e.message}` })
	}
}

/*
type:    PUT
desc:    Like/Unlike a Hunting Record
auth:    Private
*/
async function patchDislikes(req, res) {
    try {
        const huntingRecord = await HuntingRecord.findById(req.params.id);

        if (!huntingRecord) {
            return res.status(404).json({ message: `We couldn't find hunting record with id ${req.params.id}` })
        }

        const updatedHuntingRecord = await huntingRecord.patchDislikes(req.user._id);
        res.status(201).send(updatedHuntingRecord);
	} catch (e) {
        console.log(`There was an error updating your hunting record. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error updating your hunting record. Error: ${e.message}` })
	}
}

/*
type:    DELETE
desc:    Remove a Hunting Record
auth:    Private
*/
async function remove(req, res) {
    try {
        await HuntingRecord.findByIdAndDelete(req.params.id)
		res.status(204).send();
	} catch (e) {
		console.log(`There was an error removing your hunting record. Error: ${e.message}`);
		res.status(500).json({ message: `There was an error removing your hunting record. Error: ${e.message}` })
	}
}

module.exports = {
    find,
    findMine,
    findById,
    create,
    update,
    patchLikes,
    remove
}