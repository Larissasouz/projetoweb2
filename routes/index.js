var express = require('express');
var router = express.Router();
var publicacaoFunc = require('../models/publicacao');
var fs = require('fs');
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  publicacaoFunc.find().then((publis) =>{
    res.render('index');
  });
});

router.get('/publi', function(req, res, next){
  if(req.cookies && req.cookies.nome){
    res.render('publicacao');
  }else{
    res.redirect('users/login');
  }
});

router.get('/busca', function(req, res, next){
  var busca = req.body.busca;
  console.log(busca);

  publicacaoFunc.findBySearch(busca).then((publis) =>{
    res.render('index', {adaptavel: publis});
  });
}); 

router.post('/publi', function(req, res, next){
  var nome = req.cookies.nome;
  var form = formidable.IncomingForm();

  userFunc.findByLogin(nome).then((user) => {
    if(user[0]) {
      if(user[0].senha === senha) {
        form.parse(req, function(err, fields, files){
          var titulo = fields.titulo;
          
          publicacaoFunc.insert(login, titulo);
          var imaganterior = files.image.path;
          var imagnova = './public/images/'+titulo+'image.jpg';
      
          fs.rename(imaganterior, imagnova, function (err) {
            if (err) throw err;
            console.log('Imagem adicionada!');
          });
          console.log('OK');
          res.redirect('/')
        });
      } else {
        res.status(403);
        res.send('Senha inválida!');
        res.end();
      }
    } else {
      res.status(403);
      res.send('Login inválido!');
      res.end();
    }
  });

  
});

module.exports = router;
