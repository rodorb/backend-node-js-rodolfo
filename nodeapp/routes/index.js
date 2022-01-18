var express = require('express');
const { query, body, param, validationResult } = require('express-validator');
const { sleep } = require('../lib/utils.js')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const segundo = new Date().getSeconds();
    //una forma de pasar variables a la vista
    //metiendola en res.locals
    //esto solo serviría en la vista index
    res.locals.ejemplo = '<script>alert("Esto es un ejemplo")</script>';
    res.locals.usuarios = [
        { nombre: 'Smith', edad: 30 },
        { nombre: 'Brown', edad: 37 },
        { nombre: 'Anderson', edad: 29 }
    ]
    res.locals.condicion = {
        segundo,
        esPar: segundo % 2 === 0
    }
    res.render('index');
});

router.get('/otherroute', (req, res, next) => {
    res.send('Respuesta...')
});


router.get('/pathparam/:dato(\\d+)', (request, response, next) => {
    const dato = request.params.dato;
    console.log(request.params);
    response.send(`Paramatero en ruta --> ${dato}`);
});

//parmaétro con expresión regular talla --> (M|L|XL)
//parámetro opcional color -->  http://localhost:3000/talla/1/color/
router.get('/talla/:talla(M|L|XL)/color/:color?', (request, response, next) => {
    const talla = request.params.talla;
    const color = request.params.color;
    console.log(request.params);
    response.send(`Talla: ${talla} | Color: ${color}`);
});


// http://localhost:3000/queryparams?talla=XL&color=rojo
router.get('/queryparams', [
        //MDW de validación numérica, antes que el MDW que responda, 
        //el parámetro es el mensaje de error
        query('talla').isNumeric().withMessage('DEBE SER NUMERICA'),
        query('color').custom((value) => { return value === 'red'; }).withMessage('MUST BE red') //validación custom
    ],
    (request, response, next) => {
        validationResult(request).throw(); //verifica las validaciones de esta petición
        const talla = request.query.talla;
        const color = request.query.color;
        // if (color !== 'rojo') {
        //     next(new Error('Only "rojo" allowed'));
        //     return;
        // }

        console.log(request.params);
        response.send(`QueryParams --> Talla: ${talla} | Color: ${color}`);
    });


router.post('/bodyparams', (request, response, next) => {
    const nombre = request.body['nombre'];
    console.log(request.body);
    response.send(`Recibido el nombre ${nombre}`);
});



//ruta asincrona
router.get('/espera', async(request, response, next) => {
    try {
        // const RESULT = await sleep(2000);
        const RESULT = await sleep('2000');
        response.send(RESULT);
    } catch (error) {
        next(new Error(error));
    }

});

module.exports = router;