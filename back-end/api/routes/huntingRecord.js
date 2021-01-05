const express = require('express');
const auth  = require('../middleware/auth');
const huntingRecordController = require('../controllers/huntingRecord.js');
const router = new express.Router();

router.get('/huntingRecord', huntingRecordController.find);
router.get('/huntingRecord/mine', auth, huntingRecordController.findMine)
router.get('/huntingRecord/:id', huntingRecordController.findById)
router.post('/huntingRecord', auth, huntingRecordController.create);
router.put('/huntingRecord/:id', auth, huntingRecordController.update);
router.put('/huntingRecord/:id/like', auth, huntingRecordController.patchLikes);
router.delete('/huntingRecord/:id', auth, huntingRecordController.remove);

module.exports = router;