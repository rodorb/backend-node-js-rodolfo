'use strict';

//función que devuelve una promesa
async function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof ms === 'number') {
                resolve(`Completada en ${ms/1000} segundos`);
            } else {
                reject('async error');
            }

        }, ms);
    })
}

//llamo a main automáticamente nada más arrancar este archivo
(async function main() {
    try {
        const RESULT = await sleep(3000);
        console.log(RESULT);
    } catch (error) {
        console.error(`Ha habido un error ==> ${error}`);
    }

    for (let i = 0; i < 5; i++) {
        await sleep(1000);
        console.log(`Acaba de pasar ${i+1} segundo`);
    }

})();