const { Schema, model } = require('mongoose');
const commentSchema = require('./comment');
const Comment = require('./comment');

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
        _id: false
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
        _id: false
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
        _id: false
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
        _id: false
    }],
    opComment: String,
    comments: [commentSchema],
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
    let targetIndex = huntingRecord.likes.indexOf(uid);
    
    if ( targetIndex === -1) {
        huntingRecord.likes.push(uid)
    } else {
        huntingRecord.likes.splice(targetIndex, 1)
    }

    await huntingRecord.save();
    return huntingRecord;
};

const HuntingRecord = model("HuntingRecord", huntingRecordSchema);

module.exports = HuntingRecord;