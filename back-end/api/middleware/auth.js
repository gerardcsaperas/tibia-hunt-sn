const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {

	// if (process.env.NODE_ENV === 'development') {
	// 	const user = await User.findById(process.env.DEV_UID)
	// 	req.user = user;
	// 	return next()
	// }

	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWT_TOKEN);
		const user = await User.findOne({
			_id: decoded._id,
			'tokens': token
		});

		if (!user) {
			throw new Error();
		}

		req.token = token;
		req.user = user;

		return next();
	} catch (e) {
		console.log(`Unauthorized user. Error: ${e.message}.`);
		res.status(401).send({ error: 'Please authenticate.' + e });
	}
};

module.exports = auth;
