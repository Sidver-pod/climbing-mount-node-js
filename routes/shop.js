const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');

// /shop => GET
router.get('/', productsController.getShop);

module.exports = router;
