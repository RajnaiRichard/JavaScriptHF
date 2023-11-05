//az összes hiba lekérdezése az adatbázisból
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var errorModel = requireOption(objectRepository, 'errorModel');

    return function(req,res,next)
    {

        errorModel.find({
            _Tulajdonos: req.session.userid
        },(err,result)=>{
            if(err)
            {next(err);}
            if(result)
            {res.locals.hibak=result;}
            else
            {res.locals.hibak=undefined;}
            return next();
        })
        res.locals.errorsOn = req.session.errorsOn;
        res.locals.showErrors = req.session.showErrors;
    }
}