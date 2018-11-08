var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose  = require('mongodb').MongoClient;

//Carregando as rotas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Connecta ao banco
//mongoose.connect('mongodb://localhost:27017/test',  { useNewUrlParser: true });
mongoose.connect('mongodb://projeto2:projeto2@ds050087.mlab.com:50087/projetoweb',  { useNewUrlParser: true });

// Tipo de templete usado
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Tipos de requisições possiveis
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

//Exportar algo dessa classe
module.exports = app;
