'use strict';
import './loadEnv.mjs';
import fsPromise from "fs/promises";
import readline from 'readline';
// conexión a la BBDD
import dbConnection from "./lib/connectMongoose.js";
// const AGENT_DATA = require('./initDB.agentes.json'); //al hacer require de un archivo json, javascript le hace directamente un json parse
// cargar modelos
import Agent from "./models/Agente.js";
import User from "./models/User.js";


dbConnection.once('open', () => {
    main().catch(error => console.error(`Hubo un error ${error}`));
})

async function main() {
    const BORRAR = await pregunta('Estás seguro de que quieres borrar la base de datos?')
    if (!BORRAR) {
        process.exit(0);
    }
    // inicializar agentes
    await initAgentes();

    // inicializar usuarios
    await initUsers();

    //desconectar de la BBDD
    dbConnection.close();
}


async function initUsers() {
    //borrar todos los registros(documentos) de agentes que haya en la colección
    const DELETED = await User.deleteMany();
    console.log(`Eliminados ususarios ${DELETED['deletedCount']} usuarios.`);

    //crear usuarios iniciales
    const USERS = await User.insertMany([{
            email: 'admin@example.com',
            password: await User.hashPassword('1234'),
            role: 'ADMIN'
        },
        {
            email: 'user1@example.com',
            password: await User.hashPassword('1234'),
            role: 'USER'
        }
    ]);
    console.log(`Insertados ${USERS.length} usuarios.`);
}

async function initAgentes() {
    //borrar todos los registros(documentos) de agentes que haya en la colección
    const DELETED = await Agent.deleteMany();
    console.log(`Eliminados agentes ${DELETED['deletedCount']} agentes.`);

    const DATA = await fsPromise.readFile('initDB.agentes.json', 'utf-8');
    const AGENT_DATA = JSON.parse(DATA);
    //crear agentes iniciales
    console.log(AGENT_DATA);
    const INSERTED_AGENTS = await Agent.insertMany(AGENT_DATA);
    console.log(`Insertados ${INSERTED_AGENTS.length} agentes.`);
}

function pregunta(texto) {
    return new Promise((resolve, reject) => {
        //conectar readline con la consola
        const RL = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        //hacemos la pregunta
        RL.question(texto, (respuesta) => {
            RL.close(); //cierro la conexión con la consola
            if (respuesta.toLowerCase() === 'si') {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    });
}