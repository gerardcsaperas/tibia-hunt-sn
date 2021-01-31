const express = require('express');
const auth  = require('../middleware/auth');
const spotController = require('../controllers/spot.js');
const router = new express.Router();

router.get('/spot', spotController.find);
router.post('/spot', auth, spotController.create);

module.exports = router;