import User from '../models/user';

function findById(uid) {
    return User.findById(uid);
}

function save(data) {
    const user = new User(data);
    return User.findByIdAndUpdate(user._id, user, { new: true, upsert: true });
}

module.exports = {
    findById,
    save
}