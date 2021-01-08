const User = require('../models/user');
const { queryToMongoFilter } = require('../utils/queryToMongoFilter');

/*
type:    GET
desc:    Get your user
auth:    Private
*/
async function findMe(req, res) {

    try {
        const user = await User.findById(req.user._id);
        res.status(200).send(user);
    } catch(e) {
        console.log(`There was an error retrieving your user. Error: ${e.message}`);
        res.status(400).json({ message: `There was an error retrieving your user. Error: ${e.message}` })
    }

}

/*
type:    GET
desc:    Get a user by Id
auth:    Private
*/
async function findById(req, res) {

    try {
        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404).json({ message: `We couldn't find user with id ${req.params.id}` })
        }
        
        res.status(200).send(user);
    } catch(e) {
        console.log(`There was an error retrieving user ${req.params.id}. Error: ${e.message}`);
        res.status(400).json({ message: `There was an error retrieving user ${req.params.id}. Error: ${e.message}` })
    }

}

/*
type:    POST
desc:    Create a new user
auth:    Public
*/
async function create(req, res) {

    const user = new User(req.body);

	try {

        const token = await user.generateAuthToken();


        res.status(201).send({ user, token });
        
	} catch (e) {
        console.log(`There was an error saving your user. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error saving your user. Error: ${e.message}` })
	}
}

/*
type:    PUT
desc:    Upload picture for user
auth:    Private
*/
async function uploadPicture(req, res) {

};


/*
type:    PUT
desc:    Edit a profile
auth:    Private
*/
async function update(req, res) {
    
    const updates = Object.keys(req.body);

    updates.forEach((update) => (req.user[update] = req.body[update]));

    try {
        await req.user.save();
        res.status(201).send(req.user);
	} catch (e) {
        console.log(`There was an error updating your user. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error updating your user. Error: ${e.message}` })
	}

}

/*
type:    DELETE
desc:    Delete a profile
auth:    Private
*/
async function remove(req, res) {
    try {
		await req.user.remove();
		res.status(204).send();
	} catch (e) {
        console.log(`There was an error removing your user. Error: ${e.message}`);
		res.status(500).json({ message: `There was an error removing your user. Error: ${e.message}` })
	}
}

module.exports = {
    findMe,
    findById,
    create,
    update,
    remove
}