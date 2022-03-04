const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(null, title, imageUrl, description, price);
  product.save()
   .then(() => res.redirect('/'))
   .catch(err => console.log(err));
};

// /admin/edit-product => GET
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //the portion of the URL after '?' => '/...?edit=true'

  if(!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId; // the dynamic portion of the URL => /edit-product/:productId
  Product.findById(prodId)
   .then(([product]) => {
     if(!product[0]) {
       return res.redirect('/');
     }

     res.render('admin/edit-product', {
       pageTitle: 'Edit Product',
       path: '/admin/edit-product',
       editing: editMode,
       product: product[0]
     });
   })
   .catch(err => console.log(err));
};

// /admin/edit-product => POST
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updatedProduct.save()
   .then(() => res.redirect('/admin/products'))
   .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([products, fieldData]) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err));
};

// /admin/delete-product => POST
exports.postDeleteProducts = (req, res, next) => {
  const prodId = req.params.productId;
  Product.deleteById(prodId)
   .then(() => res.redirect('/admin/products'))
   .catch(err => console.log(err));
};