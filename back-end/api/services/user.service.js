const User = require('../models/user');

function findById(uid) {
    return User.findById(uid);
}

async function save(data) {
    const user = new User(data);
    try {
        //await user.generateAuthToken();

        return User.findByIdAndUpdate(user._id, user, { new: true, upsert: true });

    } catch(e) {
        console.log(e.message);
        res.status(400).json({ messageasda: e.message });
    }
}

module.exports = {
    findById,
    save
}