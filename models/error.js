var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Error = db.model('Error',{
    Nev: String,
    _Tulajdonos:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Error;