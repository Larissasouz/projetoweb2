var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var app = express();
/*
//Criando a coneção
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'websql'
});

// Conectando
db.connect((err) => {
  if(err) {
    throw err;
  } else {
      console.log('MySql conectando...');
  }
});

// Criando o BD
app.get('/users/createdb', (req, res) => {
  let sql = 'CREATE DATABASE websql';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Banco de dados criado...');
  })
});

// Criando tabelas
app.get('/users/createutable', (req, res) => {
  let sql = 'CREATE TABLE usuarios (nome VARCHAR(30) PRIMARY KEY, email VARCHAR(50))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Tabela criada...');
  })
});

// Adicionando usuario
app.get('/users/add', (req, res) => {
  let usuario = {nome:'Julia', email:'jujuba'};
  let sql = 'INSERT INTO usuarios SET ?';
  let query = db.query(sql, usuario, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send('Usuario adicionado...');
  });
});

// Selecionando todos usuarios
app.get('/users/usuarios', (req, res) => {
  let sql = 'SELECT * FROM usuarios';
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send('Usuarios...');
  });  
});

// Selecionando um usuario
app.get('/users/usuarios/:nome', (req, res) => {
  let sql = `SELECT * FROM usuarios WHERE nome = '${req.params.nome}'`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Usuario...');
  });  
});

// Deletando um usuario
app.get('/users/deleteusuario/:nome', (req, res) => {
  let sql = `DELETE FROM usuarios WHERE nome = '${req.params.nome}'`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Usuario...');
  });  
}); */

//const mongoose  = require('mongodb').MongoClient;


//Carregando as rotas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//AQUI


const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('usuarios.db');


app.get('/users/usuarios', (req, res) => {

  db.all('SELECT * FROM users_to_usuarios', (err, rows) => {
    //console.log(rows);
    const nomes = rows.map(e => e.nome);
    //console.log(nomes);
    res.send(nomes);
  });  
});

app.get('/users/usuarios/:nome', (req, res) => {
  const varr = req.params.nome;

  db.all('SELECT * FROM users_to_usuarios WHERE nome=$nome',
  {
    $nome: varr 
  },
  (err, rows) => {
    //console.log(rows);
    if(rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.send({});
    }
  });
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.post('/users/usuarios', (req, res) => {
  //console.log(req.body);
  
  db.run(
    'INSERT INTO users_to_usuarios VALUES ($nome, $email)',
    {
      $nome: req.body.nome,
      $email: req.body.email
    }, 
    (err) => {
      if (err) {
        res.send({message: 'Erro em app.post(/users/usuarios'});
      } else {
        res.send({message: 'Sucesso em app.post(/users/usuarios'});
      }
    }
  );
});
// ATE AQUI
// Connecta ao banco
//mongoose.connect('mongodb://localhost:27017/test',  { useNewUrlParser: true });
//mongoose.connect('mongodb://projeto2:projeto2@ds050087.mlab.com:50087/projetoweb',  { useNewUrlParser: true });

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
