const express = require('express');
const auth  = require('../middleware/auth');
const userController = require('../controllers/user.js');
const router = new express.Router();

router.get('/user', auth, userController.findMe);
router.get('/user/:id', auth, userController.findById);
router.post('/user', userController.create);
router.put('/user', auth, userController.update);
router.put('/user/notifications', auth, userController.updateNotifications);
router.get('/user/notifications', auth, userController.findNotifications);
router.delete('/user', auth, userController.remove);

module.exports = router;