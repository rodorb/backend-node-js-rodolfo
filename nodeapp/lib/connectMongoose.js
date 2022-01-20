'use strict';

//cargo la librería de mongoose
const MONGOOSE = require('mongoose');

//me suscribo al evento de error en caso de que falle la conexión a la BBDD
MONGOOSE.connection.on('error', (error) => {
    console.error('Error de conexión a MongoDB:', error);
    //si no se consigue conectar a la BBDD termino el proceso, con un código 1 (el código es el que decidamos)
    process.exit(1);
});

//Me suscribo solo una vez al evento de conexion de la BBDD para sacar el log de exito en la conexión
MONGOOSE.connection.once('connected', () => {
    console.log(`Conectado a MongoDB en la BBDD: ${MONGOOSE.connection.name}`);
})

//hago la conexión (procotolo mongodb://localhost/<nombre-bbdd>)
MONGOOSE.connect('mongodb://localhost/cursonode');


//opcional, no hace falta exportarlo ya que los require son singleton
module.exports = MONGOOSE.connection;