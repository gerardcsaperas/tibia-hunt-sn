const HuntingRecord = require('../models/huntingRecord')
const Comment = require('../models/comment')

/*
type    POST
desc    Create post for a Hunting Record
auth    Private
*/

async function create(req, res) {

    if (!req.params.id) {
        res.status(400).send('You must provide a Hunting Record id.')
    }

    try {
        const comment = new Comment(req.body)
        await comment.save()

        const huntingRecord = await HuntingRecord.findById(req.params.id)
        huntingRecord.comments.push(comment._id)
        await huntingRecord.save()

        res.status(201).send(comment)

    } catch(e) {
        res.status(400).send(` There was an error trying to post your comment. ${e.message}`)
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
        const comment = await Comment.findById(req.params.id);

        if(!comment) {
            return res.status(404).json({ message: `We couldn't find comment with id ${req.params.id}` })
        }

        updates.forEach((update) => (comment[update] = req.body[update]));

        await comment.save();
        res.status(201).send(comment);
	} catch (e) {
        console.log(`There was an error updating your hunting record. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error updating your hunting record. Error: ${e.message}` })
	}
}

module.exports = {
    create,
    update
}