'use strict';

// const rolesPermissions = {
//         '/privado': 'admin',
//         '/nominas': 'nominasManager'
//     }

//módulo que exporta un middleware
module.exports = (role) => {
    return (req, res, next) => {
        //gracias al MDW de session que se añade en app.js, req. session siempre tiene la 
        //session del usuario que estña accediendo
        if (!req.session.loggedUser) { //si no tiene la propiedad loggedUser (que añado en loginController)
            res.redirect('/login');
            return;
        }

        if (req.session.loggedUser.role.toLowerCase() !== role.toLowerCase()) {
            res.status(401).send('No tienes permiso para acceder a esta página');
            return;
        }
        next();
    }
}