const Spot = require('../models/spot');
const queryToMongoFilter = require('../utils/queryToMongoFilter');

async function find(req, res) {
    const filter = queryToMongoFilter(req.query);

    console.log(JSON.stringify(filter.conditions))
    try {
        const spots = await Spot.find(filter.conditions);
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