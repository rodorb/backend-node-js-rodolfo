'use strict';

//cargar librería de express
const express = require('express');

//crear la aplicación
const app = express();

//quiero que se ejecute en todas las peticiones, pero no responde
app.use((request, response, next) => {
    console.log('recibo una petición a', request.originalUrl);
    next();
})


//ponemos métodos de la aplicación
app.get('/', (request, response, next) => {
    response.send('Hola!');
});

//middleware
app.get('/pepe', (request, response, next) => {
    response.send('Soy pepe');
})


app.get('/luis', (request, response, next) => {
    response.send('Soy Luis');
});


//arrancamos la aplicación
app.listen(8080, () => {
    console.log('Servidor HTTP arrancado en http://localhost:8080');
});