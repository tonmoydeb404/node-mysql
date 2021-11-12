//  MODULES
const http = require('http');
const url = require('url');
const Mysql = require('sync-mysql');
const contactsHandler = require('./routeHandler/contactsHandler');
require('dotenv').config();

// PORT NUMBER
const PORT = process.env.PORT || 8080;

// MYSQL CONFIG
const connection = new Mysql({
    host: process.env.HOST_NAME,
    user: process.env.USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
});

// SERVER
const server = http.createServer((req, res) => {
    // URL PARSEING
    const reqUrl = url.parse(req.url, true);

    // RESPONSE HEADER
    res.writeHead(200, { 'content-type': 'application/json' });

    // DEFAULT RESPONSE
    let response = {};

    if (req.url === '/') {
        response.message = 'hello world';
    } else if (req.url.includes('/contacts')) {
        response = contactsHandler(connection, reqUrl, req.method);
    } else {
        response.message = 'error 404 : not found';
    }

    // END RESPONSE
    res.write(JSON.stringify(response));
    res.end();
});

// RUN SERVER
server.listen(PORT);
console.log(`SERVER IS RUNNING AT ${PORT}`);
