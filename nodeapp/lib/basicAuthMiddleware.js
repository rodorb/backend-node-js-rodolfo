'use strict';
const basicAuth = require('basic-auth');
module.exports = (allowedUser) => {
    return (request, response, next) => {
        const userRequest = basicAuth(request);
        if (!userRequest ||
            userRequest.name !== allowedUser.name ||
            userRequest.pass !== allowedUser.pass) {
            //pongo esta cabecera
            response.set('WWW-Authenticate', 'Basic realm=Authization Required');
            response.sendStatus(401); //responde con esta cabecera pero con la respuesta vacía
            return;
        }

        //Si las credenciales son john / 1234, le dejo pasar
        next();
    }
}