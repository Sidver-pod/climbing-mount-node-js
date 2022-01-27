//importing 'http' core module
const http = require('http');

//importing 'express'
const express = require('express');

//importing 'body-parser'
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false})); //helps parse the body of request

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title" placeholder="Title"><input type="text" name="size" placeholder="Size"><button type="submit">Add Product</button></form>');
});

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); //redirects user to given URL
});

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>');
});

app.listen(4000);
