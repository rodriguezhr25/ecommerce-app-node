const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct );

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

// /admin/add-product => GET
router.get('/delete-product', productsController.getDeleteProduct);    

// /admin/remove-product => POST
router.post('/delete-product', productsController.postDeleteProduct);
module.exports = router;
