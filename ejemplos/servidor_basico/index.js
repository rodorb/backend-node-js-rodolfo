'use strict';
// cargar librería HTTP
const HTTP = require('http');
const Chance = require('chance');

const chance = new Chance();

//definir un servidor
const SERVER = HTTP.createServer((request, response) => {
    response.writeHead(200, { 'Content-type': 'text/html' });
    response.end(`Wake up, <strong>${chance.name()}...</strong>`);
});

//arrancar un servidor

SERVER.listen(8080, () => {
    console.log('Server has started on http://localhost:8080');
});