'use strict';

function Persona(name) {
    this.name = name;
    // this.saluda = function() {
    //     console.log(`Hi, my name is ${this.name}`);
    // }
}
const paco = new Persona('Paco');

//se pone el método de saludar en el prototype de las personas
Persona.prototype.saluda = function() {
    console.log(`Hi, my name is ${this.name}`);
};

const maria = new Persona('Maria');

maria.saluda();
paco.saluda();

//Herencia de Persona con prototype --------------------------------------

//Crear tipo Agente que herede de Persona

function Agente(name) {
    //heredar el constructor de Persona
    //llamar a Persona() con el 'this' de Agente
    Persona.call(this, name); //llama a Persona con el 'this' de Agente, y con el campo name para el constructor //como llamar a super();
}

//Herencia con prototype, se le asigna Persona a su prototipo directo
//con esto hereda las propiedades y métodos de Persona
// Agente.prototype = new Persona();
Agente.prototype = Object.create(Persona.prototype); //esto lo crea de una forma más limpia, reescribo el prototype de Agente
Agente.prototype.constructor = Agente; //esto es una buena practica

const smith = new Agente('Smith');

smith.saluda();


//Herencia múltiple -------------------------------------------------------

function Superheroe() {
    //con función flecha no funciona
    this.fly = function() {
        console.log(`${this.name} can fly`);
    }
}

// Para que los agentes hereden también de los superheroes, uso el patrón mixin
// o sea, copiar todas las propiedades de Superheroe al prototype de Agente
Object.assign(Agente.prototype, new Superheroe());
smith.fly();

//De momento con esta sintaxis no se puede hacer herencia múltiple en JavaScript
class Dummy extends Persona {
    constructor(name) {
        super();
        this.name = name;
    }
}

const dummy = new Dummy('Dummy');
dummy.saluda();