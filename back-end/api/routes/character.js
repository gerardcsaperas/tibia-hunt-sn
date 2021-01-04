const express = require('express');
const auth  = require('../middleware/auth');
const characterController = require('../controllers/character.js');
const router = new express.Router();

router.get('/character', auth, characterController.findMine);
router.post('/character', auth, characterController.create);
router.put('/character/:id', auth, characterController.update);
router.delete('/character/:id', auth, characterController.remove);

module.exports = router;