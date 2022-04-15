'use strict';
//cargo la librería axios (sirve para hacer PETICIONES , generar un cliente que haga estas peticiones)
const AXIOS = require('axios');

const URL = 'https://swapi.dev/api/people/';

AXIOS.get(URL).then((starWarsPeople) => {
    console.log(starWarsPeople.data);
}).catch((error) => {
    console.error(`ERROR EN LA PETICIÓN => ${error.message}`);
});