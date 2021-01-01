const userService = require('../services/user.service');
const { queryToMongoFilter } = require('../utils/queryToMongoFilter');

/*
type:    GET
desc:    Get a user by Id
auth:    Private
*/
async function findById(req, res) {
    const user = await userService.find(req.user._id);

    console.log(user);
}

/*
type:    POST
desc:    Create a new user
auth:    Public
*/
async function create(req, res) {
    const user = new User(req.body);

	try {
		const password = await bcrypt.hash(user.password, 12);
		user.password = password;

		const token = await user.generateAuthToken();
		res.status(201).send({ user, token });
	} catch (e) {
		res.status(400).send(e);
	}
}

/*
type:    PUT
desc:    Edit a profile
auth:    Private
*/
function update(req, res) {
    return null;
}

/*
type:    PUT
desc:    Update user's notifications
auth:    Private
*/
function updateNotifications(req, res) {
    return null;
}
/*
type:    GET
desc:    Get a user's notifications
auth:    Private
*/

function findNotifications(req, res) {
    return null;
}

/*
type:    DELETE
desc:    Delete a profile
auth:    Private
*/
function remove(req, res) {
    return null;
}

module.exports = {
    findById,
    create,
    update,
    updateNotifications,
    findNotifications,
    remove
}