const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id; //'null' should be passed for a new product; when '/admin/edit-product' then pass in 'id'
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    //updating a product
    if(this.id != null) {
      return db.execute(
        'UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE products.id = ?',
        [this.title, this.price, this.description, this.imageUrl, this.id]
      );
    }
    //inserting a new product
    else {
      return db.execute(
        'INSERT INTO products (title, price, description, imageUrl) VALUES(?, ?, ?, ?)',
        [this.title, this.price, this.description, this.imageUrl]
      );
    }
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute(
      'SELECT * FROM products WHERE products.id = ?', [id]
    );
  }

  static deleteById(id) {
    return db.execute(
      'DELETE FROM products WHERE products.id = ?', [id]
    );
  }
};
