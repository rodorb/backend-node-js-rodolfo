'use strict';

console.log('Start');
//funcion que escribe un texto en la consola tras 2, segundos;
function writeAfter2Seconds(text, callback) {
    setTimeout(() => {
        console.log(`${text}`);
        callback();
        //hemos terminado

    }, 2000);
}

writeAfter2Seconds('texto1', function() {
    writeAfter2Seconds('texto2', function() {
        console.log('fin');
    })
});