var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); //middleware para hacer logs de un aplicación en nodejs
const { isAPIRequest } = require('./lib/utils')
    // var indexRouter = require('./routes/index');
    // var usersRouter = require('./routes/users');

var app = express();

require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Añado una variable global, desde la que 
//tengan acceso todas las vistas de la aplicación
app.locals.title = 'NodeApp';

/**
 * Middlewares de nuestra aplicación
 * Los evalua Expres ante cada petición que reciba
 */
app.use(logger('dev')); // middleware de log
app.use(express.json()); //
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//mdw de ficheros estáticos
app.use(express.static(path.join(__dirname, 'public'))); //esto evalúa los ficheros estáticos que cuelgan de /public por ejemplo --> /stylesheets/style.css 


/**
 * RUTAS DE MI API
 */
//uso en la aplicación la ruta de agentes que acabo de crear
app.use('/api/agentes', require('./routes/api/agentes'));


/**
 * Rutas de mi website
 */
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

    //gestionando error de validación
    if (err.array) {
        //error de validación
        err.status = 422;
        const errInfo = err.array({ onlyFirstError: true })[0];
        console.log(errInfo);
        err.message = `(${errInfo.location}) ${errInfo.param} - ${errInfo.msg}`;
    }

    res.status(err.status || 500);

    //si es un error en el API respondo con un JSON
    if (isAPIRequest(req)) {
        res.json({ error: err.message });
        return;
    }


    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.render('error');
});



module.exports = app;