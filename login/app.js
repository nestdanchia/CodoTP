
var createError = require('http-errors');

var express = require('express');
var path = require('path');
var flash = require('express-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var turistasRouter= require('./routes/turistas')

app.use(flash());
app.use(session({
  cookie: { maxAge: 60000 },
  store: new session.MemoryStore,
  secret : 'webcodo',
  resave : true,
  saveUninitialized : true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use('/turistas',turistasRouter)

;
// catch 404 
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // errores tiempo de desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
// https://www.webslesson.info/2022/06/how-to-create-login-system-in-nodejs-express-with-mysql.html
