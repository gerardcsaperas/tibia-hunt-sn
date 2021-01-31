const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true })

commentSchema.methods.patchLikes = async function(uid) {
	const huntingRecord = this;
    
    let dislikeIndex = huntingRecord.dislikes.indexOf(uid);
    if (dislikeIndex !== -1) {
        huntingRecord.dislikes.splice(dislikeIndex, 1);
    }

    let likeIndex = huntingRecord.likes.indexOf(uid);
    if ( likeIndex === -1) {
        huntingRecord.likes.push(uid)
    } else {
        huntingRecord.likes.splice(likeIndex, 1)
    }

    await huntingRecord.save();
    return huntingRecord;
};

commentSchema.methods.patchDislikes = async function(uid) {
	const huntingRecord = this;
    
    let likeIndex = huntingRecord.likes.indexOf(uid);
    if (likeIndex !== -1) {
        huntingRecord.likes.splice(likeIndex, 1);
    }

    let dislikeIndex = huntingRecord.dislikes.indexOf(uid);
    if ( dislikeIndex === -1) {
        huntingRecord.dislikes.push(uid)
    } else {
        huntingRecord.dislikes.splice(likeIndex, 1)
    }

    await huntingRecord.save();
    return huntingRecord;
};

const Comment = model("Comment", commentSchema);

module.exports = Comment;