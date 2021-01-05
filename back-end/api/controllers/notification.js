const Notification = require('../models/notification');

/*
type:    GET
desc:    Get a list of your latest notifications
auth:    Private
*/
async function findMine(req, res) {

    const filter = queryToMongoFilter(req.params);
    filter['$and'].push({ user: req.user._id });

    try {
        const notifications = await Notification.find(filter)
        res.status(200).send(notifications);
    } catch(e) {
        console.log(`Error retrieving notifications for user ${req.user._id}. Error: ${e.message}`)
        res.status(400).json({ message: `Error retrieving notifications for user ${req.user._id}. Error: ${e.message}` })
    }
}

/*
type:    GET
desc:    Post a new notification for a given user
auth:    Private
*/
async function create(req, res) {

    const notification = new Notification(req.body);

	try {
        await notification.save()
        res.status(201).send();
	} catch (e) {
        console.log(`There was an error saving your user. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error saving your user. Error: ${e.message}` })
	}
}

module.exports = {
    findMine,
    create
}
