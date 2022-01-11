//importing 'http' core module
const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Siddharth Verma`);
});

server.listen('4000');
