//importing 'express'
const express = require('express');

//importing 'body-parser'
const bodyParser = require('body-parser');

const app = express();

//importing custom files
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false})); //helps parse the body of request

//(order of Middleware matters)
app.use('/admin', adminRoutes); //custom imported file is a middleware! here only URLs starting with '/admin' will enter in; this helps in filtering URLs having the same paths together;
app.use('/shop', shopRoutes);

//when the user surfs into an unrecognized page; the URL by default is '/'
//the process of chaining is used below; here 'send' occurs in the end after 'status' has been defined!
app.use((req, res, next) => {
    res.status(404).send('<h1>Page Not Found!</h1>');
});

app.listen(4000);
