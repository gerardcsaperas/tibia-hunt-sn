const { Schema, model } = require('mongoose');


const CharacterSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    characterName: {
        type: String,
        required: false
    },
    world: {
        type: String,
        required: false
    },
    vocation: {
        type: String,
        required: true
    }, 
    level: Number,
    skills: {
        sword: {
            type: Number,
            default: 0
        },
        club: {
            type: Number,
            default: 0
        },
        axe: {
            type: Number,
            default: 0
        },
        shielding: {
            type: Number,
            default: 0
        },
        distanceFighting: {
            type: Number,
            default: 0
        },
        magicLevel: {
            type: Number,
            default: 0
        }
    }            
})




module.exports = model("User", CharacterSchema)