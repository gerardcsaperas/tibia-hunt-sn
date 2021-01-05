const Spot = require('../models/spot');

async function find(req, res) {
    try {
        const spots = await Spot.find();
        res.status(200).send(spots);
    } catch(e) {
        console.log(`There was an error trying to retrieve spots. Error: ${e.message}.`)
        res.status(500).json({ message: `There was an error trying to retrieve spots. Error: ${e.message}.`})
    }
}

/*
type:    POST
desc:    Create a new spot
auth:    Private
*/
async function create(req, res) {

    const spot = new Spot(req.body);

	try {
        await spot.save()
        res.status(201).send(spot);
	} catch (e) {
        console.log(`There was an error saving your spot. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error saving your spot. Error: ${e.message}` })
	}
}

module.exports = {
    find,
    create
}