'use strict';

const User = require("../models/User");

class LoginController {
    constructor() {}
    index(request, response, next) {
        response.locals.email = '';
        response.locals.error = '';
        response.render('login');
    }

    async post(request, response, next) {
        try {
            const { email, password } = request.body;
            //buscar el usuario en BBDD
            const user = await User.findOne({ email });
            //si no lo encuentro o no coincide la contraseña --> error
            if (!user || !(await user.comparePassword(password))) {
                response.locals.email = email;
                response.locals.error = response.__('Invalid credentials');
                response.render('login')
                return;
            }
            //apunto en la session de este usuario, que es un usuario logueado
            request.session.loggedUser = {
                _id: user._id
            };

            //si lo encuentro y la contraseña coincide --> redirigir a la zona privada
            response.redirect('/privado');
        } catch (error) {
            next(error);
        }

    }
}


module.exports = LoginController;