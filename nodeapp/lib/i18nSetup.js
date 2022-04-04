'use strict';

const i18n = require('i18n');
const path = require('path');
i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '..', 'locales'), //directorio actual, los demas son los siguientes cachos de la ruta
    defaultLocale: 'en',
    autoReload: true, //pone en modo watch los ficheros JSON de idioma, para que los recargue automáticamente
    syncFiles: true, //sincroniza la información de los locales a lo largo de todos los ficheros
    cookie: 'nodeapp-locale',
});
//para utilizar este módulo también en scripts
i18n.setLocale('en');
module.exports = i18n;