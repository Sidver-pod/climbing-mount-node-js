const path = require('path');

const express = require('express');

const router = express.Router();

//importing a path utility to make navigating among files a little cleaner!
const rootDir = require('../util/path');

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    // (__dirname, '../', 'views', 'add-product.html')
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/shop');
});

module.exports = router;
