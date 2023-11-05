//felhasználó bejelentkeztetése
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');

    return function(req,res,next)
    {
        if(typeof req.body.azonosito === 'undefined' || req.body.azonosito === '')
        {return next();}

       
        userModel.findOne({
            Azonosito: req.body.azonosito
        },(err,result)=>{
            if((err) || (!result))
            {   console.log('Azonosito nem talalhato!');
                return next();
            }

            console.log('Jelszo: ' + result.Jelszo);
            return next();
        })
    }
}