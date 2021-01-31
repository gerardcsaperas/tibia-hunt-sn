const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    tibiaApiSync: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    world: {
        type: String,
        required: false
    },
    vocation: {
        type: String,
        required: true,
        enum: ['Knight', 'EK', 'Paladin', 'RP', 'Druid', 'ED', 'Sorcerer', 'MS']
    },
    level: {
        type: Number,
        required: true,
        min: 0
    },
    skills: {
        sword: {
            type: Number,
            default: 0,
            min: 0
        },
        club: {
            type: Number,
            default: 0,
            min: 0
        },
        axe: {
            type: Number,
            default: 0,
            min: 0
        },
        shielding: {
            type: Number,
            default: 0,
            min: 0
        },
        distanceFighting: {
            type: Number,
            default: 0,
            min: 0
        },
        magicLevel: {
            type: Number,
            default: 0,
            min: 0
        }
    }            
}, {timestamps: true})

const Character = model('Character', characterSchema)

module.exports = Character;