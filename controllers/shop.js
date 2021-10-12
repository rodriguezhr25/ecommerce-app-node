
const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list',
            {
                prods: products,
                pageTitle: 'Shop',
                path: '/products',


            });
    });
}
exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render('shop/product-detail',
            {
                product: product,
                pageTitle: product.title,
                path: '/products',

            });
    });

}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index',
            {
                prods: products,
                pageTitle: 'All Products',
                path: '/',

            });
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart(car => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = car.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart',
                {
                    pageTitle: 'Your Cart',
                    path: '/cart',
                    products: cartProducts

                })
        });

    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);
    })
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart')
    });

}
exports.getOrders = (req, res, next) => {

    res.render('shop/orders',
        {
            pageTitle: 'Your Orders',
            path: '/orders',

        })
};

exports.getCheckout = (req, res, next) => {

    res.render('shop/checkout',
        {
            pageTitle: 'Checkout',
            path: '/checkout',

        })
};
