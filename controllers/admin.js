const Product = require('../models/product');


//new

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Products',
        path: '/admin/add-product',
        editing: false
    })

}
exports.postAddProduct = (req, res, next) => {

    Product.fetchAll((products) => {
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const product = new Product(null, title, imageUrl, price, description);
        var searchIndex = products.map(function (item) { return item.title; }).indexOf(title);
        if (searchIndex == -1) {
            product.save();
            res.redirect('/');
        }
    });
};
exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteByid(productId);
    res.redirect('/admin/products');
}
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const productId = req.params.productId;
    Product.findById(productId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        })
    });


}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const updatedProduct = new Product(prodId, title, imageUrl, price, description);
    updatedProduct.save();
    res.redirect('/admin/products');
};
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products',
            {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',

            });
    });
};