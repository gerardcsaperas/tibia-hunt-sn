const { Schema, model } = require('mongoose');

const huntingRecordSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		set: {
			Helmets: {
				type: String,
				default: 'Leather_Helmet'
			},
			Amulets_and_Necklaces: {
				type: String,
				default: 'Scarf'
			},
			Armors: {
				type: String,
				default: 'Leather_Armor'
			},
			Weapons: {
				name: {
					type: String,
					default: 'Rapier'
				},
				type: {
					type: String,
					default: 'Sword_Weapons'
				}
			},
			Shields: {
				name: {
					type: String,
					default: 'Wooden_Shield'
				},
				type: {
					type: String,
					default: 'Shields'
				}
			},
			Legs: {
				type: String,
				default: 'Leather_Legs'
			},
			Boots: {
				type: String,
				default: 'Leather_Boots'
			},
			Rings: {
				type: String,
				default: 'Wedding_Ring'
			}
		},
		spot: {
			type: Schema.Types.ObjectId,
			ref: 'Spot'
		},
		supplies: [
			{
				name: {
					type: String,
					required: true
				},
				type: {
					type: String,
					required: true
				},
				ammount: {
					required: true,
					type: Number,
					min: 0
				}
			} ,
			{ id: false }
		],
		ammunition: [
			{
				name: {
					type: String,
					required: true
				},
				ammount: {
					required: true,
					type: Number,
					min: 0
				}
			} ,
			{ id: false }
		],
		imbuements: [
			{
				name: String,
				ammount: {
					type: Number,
					required: true,
					min: 0
				}
			} ,
			{ id: false }
		],
		charms: [String],
		preys: [{
			type: String,
			enum: [ 'Experience', 'Loot', 'Damage Reduction', 'Damage Reduction' ]
		}],
		huntPicture: {
			type: String,
			default: '/images/default_loot.jpg'
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
			enum: [ 'Easy', 'Medium', 'Hard', 'Extreme' ]
		},
		specialEvent: {
			type: String,
			enum: [ 'Double Exp', 'Double Loot', 'Rapid Respawn', 'Boosted Creature' ]
		},
		teamComp: [
			{
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
				},
				id: false
			}
		],
		opComment: String,
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}
		],
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		dislikes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		]
	},
	{ timestamps: true }
);

// If like exists, unlike. If like does not exist: like. :-)
huntingRecordSchema.methods.patchLikes = async function(uid) {
	const huntingRecord = this;

	let dislikeIndex = huntingRecord.dislikes.indexOf(uid);
	if (dislikeIndex !== -1) {
		huntingRecord.dislikes.splice(dislikeIndex, 1);
	}

	let likeIndex = huntingRecord.likes.indexOf(uid);
	if (likeIndex === -1) {
		huntingRecord.likes.push(uid);
	} else {
		huntingRecord.likes.splice(likeIndex, 1);
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
	if (dislikeIndex === -1) {
		huntingRecord.dislikes.push(uid);
	} else {
		huntingRecord.dislikes.splice(likeIndex, 1);
	}

	await huntingRecord.save();
	return huntingRecord;
};

const HuntingRecord = model('HuntingRecord', huntingRecordSchema);

module.exports = HuntingRecord;
