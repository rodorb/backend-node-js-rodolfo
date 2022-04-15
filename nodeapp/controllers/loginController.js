'use strict';

const User = require("../models/User");
const jwt = require('jsonwebtoken');

class LoginController {
    constructor() {}
    index(request, response, next) {
        response.locals.email = '';
        response.locals.error = '';
        response.render('login');
    }

    // login post from website
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
                _id: user._id,
                role: user.role
            };

            //si lo encuentro y la contraseña coincide --> redirigir a la zona privada
            response.redirect('/privado');
        } catch (error) {
            next(error);
        }

    }

    logout(request, response, next) {
        //metodo del mdw express-session, que regenera (limpia) la session, borra el objeto y lo deja vacío
        request.session.regenerate(error => {
            if (error) {
                next(error);
                return;
            }
            //redireccionar a home
            response.redirect('/');
        });
    }




    // login post from API that returns Json Web Token
    async postJWT(request, response, next) {
        try {
            const { email, password } = request.body;
            //buscar el usuario en BBDD
            const user = await User.findOne({ email });
            //si no lo encuentro o no coincide la contraseña (comparandolo con bCrypt)--> error
            if (!user || !(await user.comparePassword(password))) {
                response.json({ error: 'Invalid credentials' });
                return;
            }
            //generamos un JWT con su _id
            //payload                   , secret            , objeto opciones
            jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
                expiresIn: "2d"
            }, (error, jwtToken) => {
                if (error) {
                    next(error);
                    return;
                }
                //devuelve el JWT
                response.json({ token: jwtToken });
            });

        } catch (error) {
            next(error);
        }

    }

}


module.exports = LoginController;