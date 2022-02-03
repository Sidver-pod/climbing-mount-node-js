const path = require('path');

const express = require('express');

const router = express.Router();

//importing a path utility to make navigating among files a little cleaner!
const rootDir = require('../util/path');

// /success => GET
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
});

module.exports = router;
