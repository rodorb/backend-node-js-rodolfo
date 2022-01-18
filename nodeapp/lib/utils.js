function sleep(ms) {
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

function isAPIRequest(request) {
    return request.originalUrl.startsWith('/api/')
}


module.exports = {
    sleep,
    isAPIRequest
}