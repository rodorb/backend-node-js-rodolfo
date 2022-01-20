'use strict';
//cargo express
const express = require('express');
//cargo la librería de creación de errores
const createError = require('http-errors');

//cargo el modelo de Agente creado con mongoose
const Agente = require('../../models/Agente');

//creo la instancia del router
const ROUTER = express.Router();



/**
 * @openapi
 * /api/agentes:
 *  get:
 *    description: Devuelve una lista de agentes
 *    responses:
 *      200:
 *        description: Returns JSON
 */
ROUTER.get('/', async(request, response, next) => {
    // const AGENTES = [{
    //     name: 'Fake Smith',
    //     age: '999'
    // }];

    try {
        //recojo el queryparam name
        const NAME = request.query.name;
        const AGE = request.query.age;
        const SKIP = request.query.skip;
        const LIMIT = request.query.limit;
        const SELECT = request.query.select; //campos que quiero mostrar
        const SORT = request.query.sort;
        const FILTERS = {};
        //esto devuelve una lista con todos los registros de 
        //la colección agentes
        if (NAME) { //no me gusta
            FILTERS.name = NAME;
        }

        if (AGE) { //no me gusta
            FILTERS.age = AGE;
        }
        const AGENTES = await Agente.lista(FILTERS, SKIP, LIMIT, SELECT, SORT); //método estático creado por mi en el modelo Agente
        response.json({ results: AGENTES });
    } catch (error) {
        next(error);
    }
});

//GET /api/agentes/:id
//Devuelve un agente por el id que se recibe como parámetro
ROUTER.get('/:id', async(request, response, next) => {
    try {
        const ID = request.params.id;
        const AGENTE = await Agente.findOne({ _id: ID });
        if (!AGENTE) {
            next(createError(404));
            return;
        }
        AGENTE.saluda();
        response.json({ result: AGENTE });
    } catch (error) {
        next(error);
    }
});


//POST /api/agentes/creaAgente
//Crea un nuevo agente
ROUTER.post('/creaAgente', async(request, response, next) => {
    try {
        const AGENT_BODY = request.body;
        //Creo un objeto AGENTE EN MEMORIA
        const AGENTE = new Agente(AGENT_BODY);

        //LO GUARDO EN BBBDD
        const AGENTE_GUARDADO = await AGENTE.save();

        //Respondo con un httpstatus 201 y el agente guardado en un objeto result
        response.status(201).json({ result: AGENTE_GUARDADO });
    } catch (error) {
        next(error);
    }
});


//DELETE /api/agentes/borrarAgente/:id
//Elimina un agente
ROUTER.delete('/borrarAgente/:id', async(request, response, next) => {
    try {
        const ID = request.params.id;
        await Agente.deleteOne({ _id: ID });
        response.json({ result: `Agente con id: ${ID} eliminado con éxito` })
    } catch (error) {
        next(error)
    }
});

//PUT /api/agentes/modificarAgente/:id
//Actualizar un agente
ROUTER.put('/modificarAgente/:id', async(request, response, next) => {
    try {
        const ID = request.params.id;
        const BODY_TO_MODIFY_AGENT = request.body;
        // El metodo findByIdAndUpdate(id, <objeto_con_datos_a_actualizar>), devuelve el objeto antiguo
        // const AGENTE_ACTUALIZADO = await Agente.findByIdAndUpdate(ID, BODY_TO_MODIFY_AGENT);
        let AGENTE_ACTUALIZADO;
        try {
            AGENTE_ACTUALIZADO = await Agente.findByIdAndUpdate(ID, BODY_TO_MODIFY_AGENT, {
                new: true //Pasandole como 3er parametro un objeto con new:true, sirve para que nos devuelva el objeto actualizado del documento(registro)
            });
        } catch (error) {
            next(createError(422, `Invalid id: ${ID}`));
            return;
        }


        if (!AGENTE_ACTUALIZADO) {
            next(createError(404));
            return;
        }

        response.json({ result: AGENTE_ACTUALIZADO });
    } catch (error) {
        next(error);
    }
});

//Exportar el ROUTER para usarlo en app.js
module.exports = ROUTER;