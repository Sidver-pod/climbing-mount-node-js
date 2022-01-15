//importing 'http' core module
const http = require('http');

//importing 'fs' core module
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    //routing requests
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
    else if(url === '/') {
        res.write('<html>');
        res.write('<head><title>Form</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="input_message" placeholder="enter message"><input type="submit" innerText="Message" value="message" name="message"></form></body>');
        res.write('</html>');
        return res.end();
    }

    //redirecting requests
    if(url === '/message' && method === 'POST') {
        const body = []; //to store chunk of the request data
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/'); //after writing the message to file it goes back to '/'
                return res.end();
            });
        });
        //fs.writeFileSync('message.txt', 'DUMMY');
        //res.writeHead(302, {/* headers come here */}) // (or) follow the two step way below (now above):-
        /* 
            NOTE - writeFileSync has been changed to writeFile so that the user's page will ridirect even before writing to the file is over!
        */
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
