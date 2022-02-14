const fs = require('fs');

const path = require('path');

const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
             cb([]);
        }
        else {
            cb(JSON.parse(fileContent));   
        }
    });
};

module.exports = class Product {
    constructor(t) {
        this.t = t;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this); //new object data pushed into the array
            console.log(products);
            //writing a new file (or) re-writing over previous file
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if(err) {
                    console.log(err);
                }
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
};
