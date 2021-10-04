


exports.getDeleteProduct = (req, res, next) => {
    res.render('delete-product', {
        prods: products,
        pageTitle: 'Delete Product',
        path: '/admin/delete-product',
    })
}

exports.postDeleteProduct = (req, res, next) => {
    const remTitle = req.body.title; 

    // get index of object with remTitle
    var removeIndex = products.map(function(item) { return item.title; }).indexOf(remTitle);
 
    // remove product
    if(removeIndex!= -1){
        products.splice(removeIndex, 1);
    }
   
  
    res.redirect('/');
  }
exports.getAddProduct =(req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Products',
        path: '/admin/add-product',
       })
    
}
exports.postAddProduct = (req, res, next) =>{
    //Validate if the title exist
    const titleNew = req.body.title;
var searchIndex = products.map(function(item) { return item.title; }).indexOf(titleNew);  

    if(searchIndex== -1){
    
        res.redirect('/');
    }
  
}

exports.getProducts =  (req, res, next) => {
    
    res.render('shop', 
    { 
        prods: products, 
        pageTitle: 'Shop',
        path: '/', 
        hasProducts: products.length > 0 ,
        activeShop: true,
        productCSS: true
    });
}