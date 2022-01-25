//importing 'http' core module
const http = require('http');

//importing 'express'
const express = require('express');

const app = express();

//middleware
app.use((req, res, next) => {
    console.log('In the middleware');
    next(); //allows the request to continue to the next middleware
});

//middleware
app.use((req, res, next) => {
    console.log('In another middleware');
    res.send(`<h1>Hello from Express!</h1>`);
});

/*
    const server = http.createServer(app);
    server.listen('4000');
*/

app.listen(4000);
