'use strict';


//cargo mongoose
const MONGOOSE = require('mongoose');

//definir un schema
const AGENTE_SCHEMA = MONGOOSE.Schema({
        name: String,
        age: { type: Number, min: 18, max: 120 },
        infoDeInteres: MONGOOSE.Schema.Types.Mixed
    }
    //en caso de que queramos conectar este modelo con una colección con otro nombre
    // , {collection: 'otro_nombre'}
);

//creamos método estático (del modelo)
AGENTE_SCHEMA.statics.lista = function() {
    return Agente.find();
}


//creamos un método de instancia
AGENTE_SCHEMA.methods.saluda = function() {
    console.log(`Hola, soy ${this.name}`);
}


//creo el modelo con ese esquema //el nombre del modelo tiene que ser el mismo que el de la tabla/coleccion de la bbdd??? NO ES CASE SENSITIVE
//Mongoose por defecto pluraliza y pone todo el lowercase(), por lo que cualqueir cariacion de Agente o Agentes valdría
//en el caso de que no se correpsonda con el nombre de la colección, entonces habría que ponerlo como segundo 
//parámetro a la hora de definir el schema (mirar arriba)
const Agente = MONGOOSE.model('Agente', AGENTE_SCHEMA);

//opcional - exporto el modelo
module.exports = Agente;