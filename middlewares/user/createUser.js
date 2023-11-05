//regisztráció, felhasználó létrehozása az adatbázisban

var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');

    return function(req,res,next)
    {
        if ((typeof req.body === 'undefined') || (typeof req.body.azonosito === 'undefined') ||(typeof req.body.jelszo === 'undefined')) 
        {return next();}
        else
        {

            userModel.findOne({
                Azonosito: req.body.azonosito
            },(err,result)=>{
                if ((err) || (result)) {
                    console.log('Azonosito mar letezik');
                    res.locals.errors='Azonosito mar letezik!';
                    return next();
                }

                var user = new userModel();
                user.Azonosito=req.body.azonosito;
                user.Jelszo=req.body.jelszo;
                
                user.save((err)=>{
                if(err)
                return next(err);

                });
            return next();
            })
            
        }

    }

    

}

//var requireOption = require('../common').requireOption;

/**
 * Check if the email address is already registered, if not
 * create the user (no extra checks on password)
 */
/*
module.exports = function (objectrepository) {

  var UserModel = requireOption(objectrepository, 'userModel');

  return function (req, res, next) {

    //not enough parameter
    if ((typeof req.body === 'undefined') || (typeof req.body.azonosito === 'undefined') ||
      (typeof req.body.jelszo === 'undefined')) {
      return next();
    }

    //lets find the user
    UserModel.findOne({
      azonosito: req.body.azonosito
    }, function (err, result) {

      if ((err) || (result)) {
        res.tpl.error.push('Your email address is already registered!');
        return next();
      }

      //create user
      var newUser = new UserModel();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      newUser.save(function (err) {
        //redirect to /login
        return res.redirect('/login');
      });
    });
  };
};*/
