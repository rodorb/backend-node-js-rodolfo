'use strict';

const EventEmitter = require('events');

//creamos un emisor de eventos
const emisor = new EventEmitter();

//nos suscribimos a eventos
emisor.on('phoneCall', (who) => {
    if (who === 'YOURMOM') return; //si llama YOURMOM no hace el console.log
    console.log('ring ring', who);
});

//solo lo ejecuta la primera vez que salte este evento
emisor.once('phoneCall', (who) => {
    console.log('brrr brrrr', who);
})

//emitimos eventos
emisor.emit('phoneCall', 'YOURMOM');
setTimeout(() => {
    emisor.emit('phoneCall', 'ABDULpls'); // aqui solo salta el listener con el on, ya que el de once solo se ejecutará con la primera emisión del evento
}, 3000);

;