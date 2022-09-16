var Schema = require('mongoose').Schema;
var db = require('../config/db');

var User = db.model('User',{
    Azonosito: String,
    Jelszo: String,
    Targyak: Array
});

module.exports = User;