
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

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    console.log(req.user);
    const product = new Product(
        { title: title,
          price: price, 
          description: description, 
          imageUrl: imageUrl,
          userId: req.user
  
        }
    );
    product.save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};
exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findByIdAndRemove(productId)
        .then(() => {
            console.log('Destroyed product');
            res.redirect('/admin/products');

        })
        .catch(err => {
            console.log(err);
        })

}
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
               
            })
        })
        .catch(err => {
            console.log(err);
        });

}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
   
    Product.findById(prodId)
    .then(product => {
        product.title = title; 
        product.price = price;
        product.description = description;
        product.imageUrl = imageUrl;
        return product.save()
    })
    .then(result => {
        console.log('Updated product');
        res.redirect('/admin/products');
    })
    .catch(err => {
            console.log(err);
    });


};



exports.getProducts = (req, res, next) => {
    Product.find()
        // .select('title price -_id')
        // .populate('userId', 'name')
        .then(products => {
            console.log(products);
            res.render('admin/products',
                {
                    prods: products,
                    pageTitle: 'Admin Products',
                    path: '/admin/products'
                 

                });
        }).catch(err => {
            console.log(err);
        })
}