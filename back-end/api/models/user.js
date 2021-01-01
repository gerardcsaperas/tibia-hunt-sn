import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({

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
userSchema.methods.generateAuthToken = async () => {
	const user = this;

	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_TOKEN, { expiresIn: '30 days' });

	console.log(token);

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
const User = mongoose.model('User', userSchema);

module.exports = User;
