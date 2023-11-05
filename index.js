/*const userModel = require('./models/user');
const errorModel = require('./models/error');

let user = new userModel();
user.Azonosito = 'kecske';
user.Jelszo = 'kaposzta';
user.Targyak = ['jelek', 'terek'];
user.save((err)=>{
    console.log(err);
    let error = new errorModel();
    error.Nev = 'kiléptetés';
    error._Tulajdonos=user;
    error.save((err)=>{
        console.log(err);
    });

});*/



var express = require('express');
var ejs = require('ejs');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine','ejs');
app.use(
    session({
        secret: 'secret'
    })
);




//require('./routes/test')(app);
require('./routes/subjectAndError')(app);
require('./routes/user')(app);

app.use(function (err, req, res, next) {
    res.end('Problem...');
  
    //Flush out the stack to the console
    console.log(err);
  });

var server = app.listen(3000, function () {
    console.log("On: 3000");
});