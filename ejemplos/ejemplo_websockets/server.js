'use strict';

const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const { setInterval } = require('timers');

app.get('/', (request, response, next) => {
    response.sendFile(path.join(__dirname, 'index.html'));
});

//crear el servidor http
const server = http.createServer(app);

//arrancar el servidor http
server.listen(3000, () => console.log('Http server listening on http://localhost:3000'));

//servidor de websockets
const io = socketio(server); //le añade a la aplicaciónd e express el servicio de socket.io

//ante cada conexión de un cliente
io.on('connection', (socket) => {
    console.log('Nueva conexión de un cliente con id', socket.id);

    socket.on('newMessage', (texto) => {
        console.log('Mensaje recibido de un cliente:', texto);

        //emitir el mensaje a todos los clientes conectados
        io.emit('messageFromServer', texto);
    });

    //simular un servicio de noticias
    setInterval(() => {
        socket.emit('noticia', `noticia número ${Date.now()}`);
    }, 2000);

});