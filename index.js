//  MODULES
const http = require('http');

// PORT NUMBER
const PORT = process.env.PORT || 8080;

// SERVER
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });

    if (req.url === '/') {
        res.write('Hello from node JS');
    }

    // END RESPONSE
    res.end();
});

// RUN SERVER
server.listen(PORT);
console.log(`SERVER IS RUNNING AT ${PORT}`);
