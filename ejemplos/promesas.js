'use strict';

//función que devuelve una promesa
function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof ms === 'number') {
                resolve(`Completada en ${ms/1000} segundos`);
            } else {
                reject('error');
            }

        }, ms);
    })
}

const PROMESA = sleep(3000);
console.log(PROMESA);

PROMESA.then((data) => {
    console.log(PROMESA, data);
}).catch((err) => {
    console.error(PROMESA, err);
})


//encadenar promesas
sleep(true).then(() => {
    console.log('pasaron 3 segundos');
    return sleep(3000); //retornamos la promesa que devuelve sleep
}).catch((err) => {
    console.error(`Hubo un error_1: ${err}`);
}).then(() => {
    console.log('pasaron otros 3 segundos');
    return sleep(false);
}).then(() => {
    console.log('pasaron otros 3 segundos más');
    return sleep(3000);
}).catch((err) => {
    console.error(`Hubo un error_2: ${err}`);
});


//promesa conm error
const PROMESA_ERROR = sleep('');
PROMESA_ERROR.then((data) => {
    console.log(PROMESA, data);
}).catch((err) => {
    console.error(`ERROR ==> ${err}`);
});




//Sincronizar promesas
const PROMISES = [sleep(2000), sleep(500), sleep(2)];
Promise.all(PROMISES).then(
    ([sleep1, sleep2, sleep3]) => {
        console.log(sleep1);
        console.log(sleep2);
        console.log(sleep3);
    }).catch(err => {
    console.error('ERROR==>', err);
});


//Rescatar la promesa más rapida
Promise.race(PROMISES).then(
    (result) => {
        console.log(`LA MÁS RÁPIDA: ${result}`);
    }).catch(err => {
    console.error('ERROR==>', err);
});