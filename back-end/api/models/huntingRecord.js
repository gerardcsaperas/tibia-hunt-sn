const { Schema, model } = require('mongoose');

const huntingRecordSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    spot: {
        type: Schema.Types.ObjectId,
        ref: 'Spot'
    },
    supplies: [{
        supply: {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        ammount: {
            type: Number,
            required: true,
            min: 0
        },
        id: false
    }],
    imbuements: [{
        imbuement: {
            type: Schema.Types.ObjectId,
            ref: 'Imbuement'
        },
        ammount: {
            type: Number,
            required: true,
            min: 0
        },
        id: false
    }],
    charms: [{
        charm: {
            type: Schema.Types.ObjectId,
            ref: 'Charm'
        },
        ammount: {
            type: Number,
            required: true,
            min: 0
        },
        id: false
    }],
    preys: {
        loot: {
            type: Boolean,
            default: false
        },
        experience: {
            type: Boolean,
            default: false
        },
        damageBoost: {
            type: Boolean,
            default: false
        },
        damageReduction: {
            type: Boolean,
            default: false
        }
    },
    huntPicture: {
        type: String,
        default: "NoLoot.png"
    },
    expH: {
        type: Number,
        required: true
    },
    profitH: {
        type: Number,
        required: true
    },
    expRatio: {
        type: Number,
        default: 1.5
    },
    difficulty: {
        type: String,
        default: "Easy",
        enum: ["Easy", "Medium", "Hard", "Extreme"]
    },
    specialEvents: {
        doubleExp: {
            type: Boolean,
            default: false
        },
        DoubleLoot: {
            type: Boolean,
            default: false
        },
        RapidRespawn: {
            type: Boolean,
            default: false
        },
        BoostedCreature: {
            type: Boolean,
            default: false
        }
    },
    teamComp: [{
        name: {
            type: String
        },
        vocation: {
            type: String,
            required: true
        },
        level: {
            type: Number,
            required: true
        },
        id: false
    }],
    opComment: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{ timestamps: true })

// If like exists, unlike. If like does not exist: like. :-)
huntingRecordSchema.methods.patchLikes = async function(uid) {
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

huntingRecordSchema.methods.patchDislikes = async function(uid) {
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

const HuntingRecord = model("HuntingRecord", huntingRecordSchema);

module.exports = HuntingRecord;