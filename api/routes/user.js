const express = require('express');
const auth  = require('../middleware/auth');
const updateUserAuth = require('../middleware/updateUserAuth');
const userController = require('../controllers/user.js');
const router = new express.Router();

router.get('/user', auth, userController.findMe);
router.get('/user/:id', auth, userController.findById);
router.post('/user', userController.create);
router.post('/user/login', userController.login);
router.put('/user', auth, updateUserAuth, userController.update);
router.post('/user/reset-password', userController.resetPasswordInit);
router.put('/user/reset-password/:resetPasswordToken', userController.resetPassword);
router.delete('/user', auth, userController.remove);

module.exports = router;