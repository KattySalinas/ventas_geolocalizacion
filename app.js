
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var exphbs = require('express-handlebars');

var app = express();
var session = require('express-session');
var flash = require('connect-flash');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// view engine setup handlebars
app.set('views', path.resolve(__dirname, 'views/layouts'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: ['views','views/partials'],
    layoutsDir: path.resolve(__dirname, 'views/layouts'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//Fin HBS

app.use(flash());

var models = require('./models/');
models.sequelize.sync().then( () => {
    console.log('Se ha conectado a Sarita');
}).catch(err => {console.log(err, "Hubo un error");});


//load passport strategies
//require('./config/pasaporte/passport')(passport, models.cuenta, models.persona, models.rol);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var multer = require('multer');


var app = express();
var session = require('express-session');
var flash = require('express-flash-notification');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(session({
    secret: 'Cuarto A',
    resave: true,
    saveUninitialized: true
}));

app.use(flash(app));

var models = require('./models/');
models.sequelize.sync().then( () => {
    console.log('Se ha conectado a Sarita');
}).catch(err => {console.log(err, "Hubo un error");});


//load passport strategies
//require('./config/pasaporte/passport')(passport, models.cuenta, models.persona, models.rol);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

