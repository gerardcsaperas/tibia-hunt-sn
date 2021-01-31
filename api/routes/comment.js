const express = require('express');
const auth  = require('../middleware/auth');
const commentController = require('../controllers/comment.js');
const router = new express.Router();

router.post('/comment/:id', auth, commentController.create)
router.put('/comment/:id', auth, commentController.update)

module.exports = router;