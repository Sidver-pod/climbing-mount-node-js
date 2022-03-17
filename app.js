const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

/* database models */
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
     .then(user => {
         /* making a new 'user' field for the request object */
         req.user = user;
         next();
     })
     .catch();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

/* defining relationship among tables */
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//syncs all defined "models" to the database (meaning: makes tables out of models; if tables exist then it makes relations among them)
sequelize.sync()
 .then(result => {
    console.log('database sync: CHECK');
    return User.findByPk(1);
 })
 .then(user => {
     if(!user) {
         return User.create({username: 'Sid', email: 'sid@borders.com'});
     }
     return user;
 })
 .then(user => {
    //  console.log(user);
    return user.createCart();
 })
 .then(cart => {
    app.listen(3000);
 })
 .catch(err => console.log(err));
