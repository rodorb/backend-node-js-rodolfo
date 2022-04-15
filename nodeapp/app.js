var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); //middleware para hacer logs de un aplicación en nodejs
const { isAPIRequest } = require('./lib/utils')
    // var indexRouter = require('./routes/index');
    // var usersRouter = require('./routes/users');
const SWAGGER_MIDDLEWARE = require('./lib/swaggerMiddleware');
const i18n = require('./lib/i18nSetup');
const LoginController = require('./controllers/loginController');
const PrivadoController = require('./controllers/privadoController');
const session = require('express-session')
const sessionAuthMiddlewre = require('./lib/sessionAuthMiddleware');
const basicAuthMiddleware = require('./lib/basicAuthMiddleware');
const MongoStore = require('connect-mongo');
const loginController = new LoginController();
const privadoController = new PrivadoController();
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');
var app = express();

require('./lib/connectMongoose');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
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

//cargo el middleware de documentación con el swagger
app.use('/api-docs', SWAGGER_MIDDLEWARE)


/**
 * RUTAS DE MI API
 */
//uso en la aplicación la ruta de agentes que acabo de crear
app.post('/api/login', loginController.postJWT);
app.use('/api/agentes', jwtAuthMiddleware, require('./routes/api/agentes'));



//Hacer que a aplicación use el middleware i18n
app.use(i18n.init); //se pone después del mdw cookieParser para que sea capaz de parsear la cookie custom que seteemos


//Setup de sesiones del Website
app.use(session({
    name: 'nodeapp-session', //nombre de la cookie
    secret: 'asd', //la semilla para desencriptar 
    saveUninitialized: true, //guarda la session aunque no se haya inicializado, no tenga nada
    resave: false, //fuerza a que una sesion se vuelva a guardar en el store, aunque la sessión no haya sido modificada
    cookie: {
        maxAge: 1000 * 60 * 50 * 24 * 2 //la cookie expirará a los 2 días de inactividad en el website
    },
    //Guardo la session en la bbdd de mongodb, para que no se guarde en memoria y se pierda cada vez que se arranque y se pierda la session
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_CONNECTION_STRING
    })
}));

//Hacemos que req.session esté disponible en TODAS LAS VISTAS
app.use((request, response, next) => {
    response.locals.session = request.session;
    next();
})

/**
 * Rutas de mi website
 */
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', require('./routes/index'));
app.use('/features', basicAuthMiddleware({ name: 'john', pass: '1234' }), require('./routes/features'));
app.use('/change-locale', require('./routes/change-locale'));
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);
//Aquí uso el middleware que he creado que evalua la session del ususario
//antes de llamar al mdw de la vista privada
app.get('/privado', sessionAuthMiddlewre('ADMIN'), privadoController.index);
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