//importing 'fs' core module
const fs = require('fs');

const requestHandler = (req, res) => {
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
        res.write('<body>');
        
        //reading text from the file to print above the "Form"
        if(fs.existsSync('message.txt')) {
            fs.readFile('message.txt', 'utf-8', (err, data) => {
                console.log(data);
                res.write(`<h3>${data}</h3>`);
                res.write('<form action="/message" method="POST"><input type="text" name="input_message" placeholder="enter message"><input type="submit" innerText="Message" value="message" name="message"></form>');
                res.write('</body>');
                res.write('</html>');
                return res.end();
            });
        }
        else {
            res.write('<form action="/message" method="POST"><input type="text" name="input_message" placeholder="enter message"><input type="submit" innerText="Message" value="message" name="message"></form>');
            res.write('</body>');
            res.write('</html>');
            return res.end();
        }
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
    }
}

module.exports = requestHandler;

/*
For Multiple Exports,

(example - 1)
module.exports = {
    handler: requestHandler,
    someText: 'some hard coded text'
};

(example - 2)
module.exports.handler = requestHandler;
module.exports.someText = 'some hard coded text';

**  when you export as an "object" the way to use it in the file where it gets imported is as follows,
    const server = http.createServer(routes.handler);
*/ 
