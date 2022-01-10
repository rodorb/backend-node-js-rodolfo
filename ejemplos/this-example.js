'use strict';

//uso de this

//creamos un constructor de objetos
function Fruta(nombre) {
    this.nombre = nombre;

    //método
    this.saluda = function() { //si usamos arrow function no se perdería el this, cogería el this del bloque anterior
        //sin usar arrow function
        console.log(`Hola, soy ${this.nombre}`); //este this es el que podemos perder
    }
} //al llamarlo con new, devuelve el objeto que haya en this

const limon = new Fruta('Limon');
// console.log(limon);

//donde estén los () de ejecución, 
//this será: de derecha izquierda lo que hay después del primer punto
// limon.saluda();

//asçi perdemos el this
const saludador = limon.saluda;
// se pierde el this, si no uso arrow function
// saludador();

//no perdemos el this, lo enlazamos al objeto limon
saludador.bind(limon)();

setTimeout(limon.saluda.bind(limon), 1000);