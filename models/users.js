var url = 'mongodb://localhost:27017/test';

let user  = require('mongodb').MongoClient;

module.exports = class userFunc {
    static find() {
        return user.connect(url,
            {useNewUrlParser: true}).then((user) => {
                let db = user.db('test');
                return db.collection('users').find().sort({nome: 1}).toArray();
            }).catch((err) => {throw err; });
    }

    static insert(nome, senha, email) {
        return user.connect(url,
            {useNewUrlParser: true}).then((user) => {
                let db = user.db('test');
                db.collection('users').insertOne({'nome':nome, 'senha':senha, 'email':email });
            }).catch((err) => {throw err; });
    }

    static findByLogin(nome){
        return user.connect(url,
            {useNewUrlParser: true}).then((user) => {
                let db = user.db('test');
                return db.collection('users').find({'nome':nome}).toArray();
            }).catch((err) => {throw err; });
    }

    static findByEmail(email){
        return user.connect(url,
            {useNewUrlParser: true}).then((user) => {
                let db = user.db('test');
                return db.collection('users').find({'email':email}).toArray();
            }).catch((err) => {throw err; });
    }
};