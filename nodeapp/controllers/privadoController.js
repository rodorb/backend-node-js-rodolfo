'use strict';
const { User } = require('../models');
class PrivadoController {

    constructor() {}
    async index(req, res, next) {
        try {
            const userId = req.session.loggedUser._id;
            const user = await User.findById(userId);
            if (!user) {
                next(new Error('Usuario no encontrado'));
                return;
            }
            res.render('privado', { email: user.email });

        } catch (error) {
            next(error);
            return;
        }

    }
}

module.exports = PrivadoController;