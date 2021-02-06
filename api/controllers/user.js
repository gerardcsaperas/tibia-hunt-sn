const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendgrid = require('@sendgrid/mail');
/*
type:    GET
desc:    Get your user
auth:    Private
*/
async function findMe(req, res) {

    try {
        const user = await User.findById(req.user._id);
        res.status(200).send(user);
    } catch(e) {
        console.log(`There was an error retrieving your user. Error: ${e.message}`);
        res.status(400).json({ message: `There was an error retrieving your user. Error: ${e.message}` })
    }

}

/*
type:    GET
desc:    Get a user by Id
auth:    Private
*/
async function findById(req, res) {

    try {
        const user = await User.findById(req.params.id).select('username stars avatar');

        if(!user) {
            return res.status(404).json({ message: `We couldn't find user with id ${req.params.id}` })
        }
        
        res.status(200).send(user);
    } catch(e) {
        console.log(`There was an error retrieving user ${req.params.id}. Error: ${e.message}`);
        res.status(400).json({ message: `There was an error retrieving user ${req.params.id}. Error: ${e.message}` })
    }

}

/*
type:    POST
desc:    Create a new user
auth:    Public
*/
async function create(req, res) {

    const user = new User(req.body);

	try {

        const token = await user.generateAuthToken();

        res.status(201).send({ user, token });
        
	} catch (e) {
        console.log(`There was an error saving your user. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error saving your user. Error: ${e.message}` })
	}
}

// @route   POST user/login
// @desc    Log In user and get token
// @access  Public
async function login(req, res) {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [ { msg: 'Invalid credentials 1' } ] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ] });
        }

        const token = await user.generateAuthToken();

        res.status(200).send({ user, token })

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}


/*
type:    PUT
desc:    Edit a profile
auth:    Private
*/
async function update(req, res) {

    try {
        await req.user.save();

        res.status(200).send(req.user);
	} catch (e) {
        console.log(`There was an error updating your user. Error: ${e.message}`);
		res.status(400).json({ message: `There was an error updating your user. Error: ${e.message}` })
	}

}

/*
type:    POST
desc:    Recover account initiator
auth:    Public
*/
async function resetPasswordInit(req, res) {
    try {
        
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(204).send(); // Do not send 404. Don't let the hackers know this email doesn't exist.
        }

        user.generatePasswordReset();
        await user.save();

        const html = `
            <div>
                <p>Hello, ${user.username},</p>
                <p>We have received a request to reset your password. If you haven't requested a password reset, just ignore this email</p>
                <p>Please, click on the following <a href="https://www.tibiahuntingrecords.com/reset-password/${user.resetPasswordToken}">link</a> in order to reset your password.</p>
                <p>Kind Regards,</p>
                <p>Tibia Hunting Records</p>
            </div>
        `

        sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            from: 'tibiahuntingrecords@gmail.com',
            to: user.email,
            subject: 'Password Reset Request - Tibia Hunting Records',
            text: 'Password Reset Request - Tibia Hunting Records',
            html
        }

        const response = await sendgrid.send(msg)
        
        if (response[0].statusCode === 202) {
            res.status(204).send();
        }
	} catch (e) {
        console.log(`There was an error removing your user. Error: ${e.message}`);
		res.status(500).json({ message: `There was an error removing your user. Error: ${e.message}` })
	}
}

/*
type:    GET
desc:    Reset password
auth:    Public
*/
async function resetPassword(req, res) {
    try {
        let { resetPasswordToken } = req.params;
        let user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gte: Date.now() }
        })

        if (!user) {
            return res.status(401).json({ message: 'Password reset token is invalid or has expired' })
        }

        user.password = req.body.password;
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch(e) {
        console.error(e.message);
    }
}

/*
type:    DELETE
desc:    Delete a profile
auth:    Private
*/
async function remove(req, res) {
    try {
		await req.user.remove();
		res.status(204).send();
	} catch (e) {
        console.log(`There was an error removing your user. Error: ${e.message}`);
		res.status(500).json({ message: `There was an error removing your user. Error: ${e.message}` })
	}
}

module.exports = {
    findMe,
    findById,
    create,
    login,
    update,
    resetPasswordInit,
    resetPassword,
    remove
}