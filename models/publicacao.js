var url = 'mongodb://projeto2:projeto2@ds050087.mlab.com:50087/projetoweb';

let user  = require('mongodb').MongoClient;

module.exports = class publicacaoFunc {
    static find() {
        return user.connect(url,
            {useNewUrlParser: true}).then((user) => {
                let db = user.db('projetoweb');
                return db.collection('publications').find().toArray();
            }).catch((err) => {throw err; });
    }

    static insert(login, titulo, descricao) {
        return user.connect(url,
            {useNewUrlParser: true}).then((user) => {
                let db = user.db('projetoweb');
                db.collection('publications').insertOne({'login':login, 'titulo':titulo, 'descricao':descricao});
            }).catch((err) => {throw err; });
    }

    static findByLogin(login){
        return user.connect(url,
            {useNewUrlParser: true}).then((user) => {
                let db = user.db('projetoweb');
                return db.collection('publications').find({'login':login}).toArray();
            }).catch((err) => {throw err; });
    }

    static findBySearch(keyWord){
        return user.connect(url,
            {useNewUrlParser: true}).then((user) => {
                let db = user.db('projetoweb');
                return db.collection('publications').find({'titulo': { "$regex": keyWord, "$options": "i" }}).toArray();
            }).catch((err) => {throw err; });
    }

 
};