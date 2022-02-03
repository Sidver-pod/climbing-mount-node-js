const path = require('path');

const express = require('express');

const router = express.Router();

//importing a path utility to make navigating among files a little cleaner!
const rootDir = require('../util/path');

// /contactus => GET
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contactus.html'));
});

// /contactus => POST
router.post('/', (req, res, next) => {
    console.log(req.body);
    res.redirect('/success');
});

module.exports = router;
