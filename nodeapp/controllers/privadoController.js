'use strict';

class PrivadoController {

    constructor() {}
    index(req, res, next) {
        res.render('privado');
    }
}

module.exports = PrivadoController;