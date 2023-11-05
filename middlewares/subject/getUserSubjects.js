// a felhasználó által felvett tárgyak lekérése az adatbázisba

var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');

    return function(req,res,next)
    {
        userModel.findOne({
            _id: req.session.userid
        },(err,result)=>{
            if(err)
            return next(err);

            res.locals.felhasznaloiTargyak=result.Targyak;
             
            return next();   
        });
        
    }
}