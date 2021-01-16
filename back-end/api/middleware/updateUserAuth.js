const bcrypt = require('bcrypt');

const updateUserAuth = async (req, res, next) => {

    const updates = Object.keys(req.body);

        for (let update of updates) {
                if (update === 'password') {
                    // New password comes as newPassword in the body.
                    // 'password' is used to validate the current password, not update.
                    continue;
                }

                if (
                    update === 'newUsername' ||
                    update === 'newPassword' ||
                    update === 'newEmail'
                    )
                {
                    if (!req.body.password) {
                        return res.status(403).json({ message: 'You need to provide your current password in the body in order to update this field.' })
                    }

                    const isMatch = await bcrypt.compare(req.body.password, req.user.password);
            
                    if (!isMatch) {
                        console.log('Wrong password.');
                        return res.status(403).json({ message: 'Wrong password.' })
                    }    

                    switch (update) {
                        case 'newUsername':
                            req.user.username = req.body.newUsername;
                            break;
                        case 'newPassword':
                            req.user.password = req.body.newPassword;
                            break;
                        case 'newEmail':
                            req.user.email = req.body.newEmail;
                            break;
                    }     
                } else if (update === 'newCountry') {
                    req.user.country = req.body.newCountry;
                } else {
                    req.user[update] = req.body[update];
                }
            };
    
        return next();
}

module.exports = updateUserAuth