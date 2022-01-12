//importing 'http' core module
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;

    if(url === '/home') {
        res.write('<html>');
        res.write('<head><title>Home</title></head>');
        res.write('<body><h1>Welcome Home</h1></body>');
        res.write('</html>');
        return res.end();
    }
    else if(url === '/about') {
        res.write('<html>');
        res.write('<head><title>About</title></head>');
        res.write('<body><h1>Welcome to the About page</h1></body>');
        res.write('</html>');
        return res.end();
    }
    else if(url === '/node') {
        res.write('<html>');
        res.write('<head><title>NodeJS</title></head>');
        res.write('<body><h1>Welcome to my Node.js project!</h1></body>');
        res.write('</html>');
        return res.end();
    }

    console.log(`Siddharth Verma`);
    console.log(req.url, req.method, req.headers);
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
    //process.exit();
});

server.listen('4000');
