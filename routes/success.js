const express = require('express');

const router = express.Router();

const successController = require('../controllers/miscellaneous');

// /success => GET
router.get('/', successController.getSuccess);

module.exports = router;
