const express = require('express');

const router = express.Router();

const contactController = require('../controllers/miscellaneous');

// /contactus => GET
router.get('/', contactController.getContactUs);

// /contactus => POST
router.post('/', contactController.postContactUs);

module.exports = router;
