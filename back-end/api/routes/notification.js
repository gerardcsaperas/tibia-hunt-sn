const express = require('express');
const auth  = require('../middleware/auth');
const notificationController = require('../controllers/notification.js');
const router = new express.Router();

router.get('/notification', auth, notificationController.findMine);
router.post('/notification', auth, notificationController.create);

module.exports = router;