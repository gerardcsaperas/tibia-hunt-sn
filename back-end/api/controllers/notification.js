const Notification = require('../models/notification');
/*
type:    GET
desc:    Get a list of your latest notifications
auth:    Private
*/
async function findMine(req, res) {

    try {
        const notifications = await Notification.find({ receiver: req.user._id}).sort({createdAt: 'desc'})
        res.status(200).send(notifications);
    } catch(e) {
        console.log(`Error retrieving notifications for user ${req.user._id}. Error: ${e.message}`)
        res.status(400).json({ message: `Error retrieving notifications for user ${req.user._id}. Error: ${e.message}` })
    }
}

/*
type:    POST
desc:    Post a new notification for a given user
auth:    Private
*/
async function create(req, res) {

    const notification = new Notification(req.body);
    notification.emitter = req.user._id;
	try {
        await notification.save()
        res.status(201).send(notification);
	} catch (e) {
        console.log(`There was an error retrieving your notifications. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error retrieving your notifications. Error: ${e.message}` })
	}
}

/*
type:    PUT
desc:    Update notifications in order to be seen
auth:    Private
*/
async function updateSeen(req, res) {
	try {
        const notifications = await Notification.find({ receiver: req.user._id });
        
        if (notifications.length === 0) {
            return res.status(200).send();
        }

        for (let notification of notifications) {
            notification.seen = true;
            await notification.save();
        }
        
        res.status(200).send();
	} catch (e) {
        console.log(`There was an error retrieving your notifications. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error retrieving your notifications. Error: ${e.message}` })
	}
}

module.exports = {
    findMine,
    create,
    updateSeen
}
