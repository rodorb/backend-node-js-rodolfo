'use strict';

//cargamos el driver
const MYSQL = require('mysql');

//creamos una conexión
const CONNECTION = MYSQL.createConnection({
    host: 'didimo.es',
    user: 'usuariocurso',
    password: 'us3r',
    database: 'cursonode'
});

//conectamos
CONNECTION.connect();

//lanzamos una consulta
CONNECTION.query(
    "select * from agentes",
    (error, filas, campos) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        //visualizamos resultados
        console.log(filas);
    }
);