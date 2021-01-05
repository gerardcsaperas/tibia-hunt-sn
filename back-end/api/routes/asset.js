const express = require('express');
const auth  = require('../middleware/auth');
const assetController = require('../controllers/asset.js');
const router = new express.Router();

router.get('/item', assetController.findItems);
router.get('/item/:id', assetController.findItemById);
router.get('/imbuement', assetController.findImbuements);
router.get('/imbuement/:id', assetController.findImbuementById);
router.get('/charm', assetController.findCharms);
router.get('/charm/:id', assetController.findCharmById);

module.exports = router;