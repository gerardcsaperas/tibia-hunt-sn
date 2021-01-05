const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    seen: {
        type: Boolean,
        default: false
    },
    notificationType: {
        type: String,
        required: true,
        trim: true,
        enum: ['comment', 'like'] // What is the notification about? Did someone like? Or comment?
    },
    notificationReference: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }, // Refers to the id of the comment, or huntingRecord (post) where the notification has been recieved...
    notificationOrigin: {
        type: String,
        required: true,
        trim: true,
        enum: ['comment', 'huntingRecord'] // Where does the notification come from?
    }
},
{
    timestamps: true
});

const Notification = model('Notification', notificationSchema);

module.exports = Notification;

