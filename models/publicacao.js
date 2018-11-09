const user  = require('mongodb').MongoClient;
const config = require('../config');
const conexao = user.connect(config);

//var url = 'mongodb://projeto2:projeto2@ds050087.mlab.com:50087/projetoweb';

module.exports = class publicacaoFunc {
    static find() {
        return conexao.then((user) => {
                let db = user.db('projetoweb');
                return db.collection('publications').find().toArray();
            }).catch((err) => {throw err; });
    }

    static insert(login, titulo, descricao) {
        return conexao.then((user) => {
                let db = user.db('projetoweb');
                db.collection('publications').insertOne({'login':login, 'titulo':titulo, 'descricao':descricao});
            }).catch((err) => {throw err; });
    }

    static findByLogin(login){
        return conexao.then((user) => {
                let db = user.db('projetoweb');
                return db.collection('publications').find({'login':login}).toArray();
            }).catch((err) => {throw err; });
    }

    static findBySearch(keyWord){
        return conexao.then((user) => {
                let db = user.db('projetoweb');
                return db.collection('publications').find({'titulo': { "$regex": keyWord, "$options": "i" }}).toArray();
            }).catch((err) => {throw err; });
    }

 
};