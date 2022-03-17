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
  /* 
  - because of table relationships being defined 'createProduct' is made by Sequelize for ease of usage 
  - now 'userId' in the 'products' table will get auto updated
  */
  req.user
   .createProduct({
     title: title,
     price: price,
     imageUrl: imageUrl,
     description: description
   })
   .then(result => {
    console.log('Created Product');
    res.redirect('/admin/products');
   })
   .catch(err => console.log(err));
   // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description,
  //   userId: req.user.id
  // })
};

// /admin/edit-product => GET
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //the portion of the URL after '?' => '/...?edit=true'

  if(!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId; // the dynamic portion of the URL => /edit-product/:productId
  req.user.getProducts({ where: { id: prodId } })
  // Product.findByPk(prodId)
   .then((products) => {
     const product = products[0];
     if(!product) {
       return res.redirect('/');
     }

     res.render('admin/edit-product', {
       pageTitle: 'Edit Product',
       path: '/admin/edit-product',
       editing: editMode,
       product: product
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
  Product.findByPk(prodId)
   .then(product => {
     product.title = updatedTitle;
     product.imageUrl = updatedImageUrl;
     product.description = updatedDescription;
     product.price = updatedPrice;
     return product.save();
   })
   .then(result => {
     console.log('product update: CHECK');
     res.redirect('/admin/products');
   })
   .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  req.user
  .getProducts()
  // Product.findAll()
  .then(products => {
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
  Product.findByPk(prodId)
   .then(product => {
     return product.destroy();
    })
   .then(result => {
     console.log('product destroy: CHECK');
     res.redirect('/admin/products');
   })
   .catch(err => console.log(err));
};
