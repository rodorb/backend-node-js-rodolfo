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
//Llamar  a la función callBackFn con cada elemento del array arr
function serie(arr, callBackFn, callBackFinalize) {
    if (arr.length === 0) {
        callBackFinalize();
        return; //termino
    }
    callBackFn(`texto${arr.shift()}`, () => { serie(arr, callBackFn, callBackFinalize); });
}

serie([1, 2, 3, 4, 5], writeAfter2Seconds, () => {
    console.log('fin');
});