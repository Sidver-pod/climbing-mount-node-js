//importing 'http' core module
const http = require('http');

//importing custom JS file that contains routing information
const routes = require('./routes');

const server = http.createServer(routes);

server.listen('4000');
