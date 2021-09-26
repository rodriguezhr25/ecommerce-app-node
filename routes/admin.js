const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];



// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Products',
        path: '/admin/add-product',
       })
    
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) =>{
    //Validate if the title exist
    const titleNew = req.body.title;
var searchIndex = products.map(function(item) { return item.title; }).indexOf(titleNew);  

    if(searchIndex== -1){
        products.push({
            title: titleNew,
            price: req.body.price,
            description: req.body.description});
        }
        res.redirect('/');

  
});

// /admin/add-product => GET
router.get('/delete-product', (req, res, next) => {
    res.render('delete-product', {
        prods: products, 
        pageTitle: 'Delete Product',
        path: '/admin/delete-product',
        })
    
});
// /admin/remove-product => POST
router.post('/delete-product', (req, res, next) => {
    const remTitle = req.body.title; 

    // get index of object with remTitle
    var removeIndex = products.map(function(item) { return item.title; }).indexOf(remTitle);
 
    // remove product
    if(removeIndex!= -1){
        products.splice(removeIndex, 1);
    }
   
  
    res.redirect('/');
  });
exports.routes = router;
exports.products = products;