const express = require('express');
const router = express.Router();

router.get('/:locale', (request, response, next) => {
    //recoger parámetro del locale al que hay que cambiar
    const locale = request.params.locale;

    //poner una cookie en la respuesta que indique el nuevo locale
    response.cookie('nodeapp-locale', locale, {
        maxAge: 1000 * 60 * 60 * 24 * 30 //que dure un mes
    });
    //hacer una redirección a la página desde la que venía
    response.redirect(request.get('Referer')); //redirige al mismo sitio en el que estaba
});

module.exports = router;