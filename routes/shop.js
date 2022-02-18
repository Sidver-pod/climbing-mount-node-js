const express = require('express');

const router = express.Router();

const productsController = require('../controllers/products');
const successController = require('../controllers/miscellaneous');

router.get('/shop', productsController.getShop);

router.get('/cart', productsController.getCart);

router.get('/contactus', successController.getContactUs);

router.post('/contactus', successController.postContactUs);

router.get('/success', successController.getSuccess);

module.exports = router;
