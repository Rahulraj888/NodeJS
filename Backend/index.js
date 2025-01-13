const http = require('http')
const fs = require('fs')
const url = require("url")


const port = 8000

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New req received\n`
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile('logs.txt', log, (err, result) => { 
        switch (myUrl.pathname) {
            case '/':
                res.end("Hello from server");
                break;
            case '/about':
                const myName = myUrl.query.name;
                // console.log(`query parameters are ${myUrl.query.length}`);
                console.log(`name from query string paramter is ${myName}`);
                res.end(`Welcome ${myName}`);
                break;
            case '/signup':
                if (req.method === 'GET') res.end("sign up");
                else if (req.method === 'POST') res.end("success");
            default:
                res.end("404 Not Found");
        }
    });
});


myServer.listen(port, () => {
    console.log(`Server started at port ${port}`);
});