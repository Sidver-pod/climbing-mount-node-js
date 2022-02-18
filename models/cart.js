const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};

            if(!err) {
                cart = JSON.parse(fileContent);
            }

            //Analyze the Cart => Find the existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;

            //Add new product / increase quantity
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty += 1;
                cart.products[existingProductIndex] = updatedProduct; //overwriting to update exisiting product
            }
            else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct]; //adding the new product
            }

            cart.totalPrice += +productPrice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                if(err) {
                    console.log(err);
                }
                else {
                    fs.readFile(p, (err, fileContent) => {
                        console.log(JSON.parse(fileContent));
                    });
                }
            });
        });
    }
};
