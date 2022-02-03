const path = require('path');

const express = require('express');

const router = express.Router();

//importing a path utility to make navigating among files a little cleaner!
const rootDir = require('../util/path');

// /shop => GET
router.get('/', (req, res, next) => {
    // (__dirname, '../', 'views', 'shop.html')
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
