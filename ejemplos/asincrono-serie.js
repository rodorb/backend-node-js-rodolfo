'use strict';

console.log('Start');
//funcion que escribe un texto en la consola tras 2, segundos;
function writeAfter2Seconds(text, callback) {
    setTimeout(() => {
        console.log(`${text}`);
        //hemos terminado, llamamos al callback
        callback();


    }, 2000);
}

//Usando una función recursiva
//Llamar n veces a la función callBackFn
function serie(nTimes, callBackFn, callBackFinalize) {
    if (nTimes === 0) {
        callBackFinalize();
        return; //termino
    }

    callBackFn(`texto${nTimes}`, () => {
        serie(nTimes, callBackFn, callBackFinalize);
    });
    nTimes -= 1;
}

serie(5, writeAfter2Seconds, () => {
    console.log('fin');
});