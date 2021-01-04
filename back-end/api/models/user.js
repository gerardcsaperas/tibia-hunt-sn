const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		trim: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: true,
		trim: true,
		validate: {
			validator: email => validator.isEmail(email),
			message: '"{VALUE}" is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minLength: 8
	},
	avatar: {
		type: String //HERE POST from React ?
	},
	country: {
		type: String,
		required: false,
		trim: true
	},
	stars: {
		type: Number,
		default: 0,
		min: 0,
		max: 5
	},
	characters: [{
		type: Schema.Types.ObjectId,
		ref: 'Character'
	}],
    tokens: [String]
},
{
    // Track user creation and update
	timestamps: true
});

// Validate user credentials
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email: email });

	if (!user) {
		throw new Error('Invalid credentials.');
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error('Invalid credentials.');
	}

	return user;
};

// Generate authentication token for users
userSchema.methods.generateAuthToken = async function() {
	const user = this;

	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_TOKEN, { expiresIn: '30 days' });

	user.tokens = user.tokens.concat(token);
	await user.save();

	return token;
};

// Generate password reset if user asks
userSchema.methods.generatePasswordReset = function() {
	this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
	this.resetPasswordExpires = Date.now() + 3600000; // expires in an hour
}

// Return public data for users
userSchema.methods.toJSON = function () {
	const user = this;

	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

// Hash password when it's updated
userSchema.pre('save', function(next) {
	const user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(12, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) return next(err);

			user.password = hash;
			next();
		})
	})
});

// Delete user data when user is removed
userSchema.pre('remove', async function (next) {
	const user = this;

    // PENDING

	next();
});

// Create a new model for user
const User = model('User', userSchema);

module.exports = User;
