//a paramban megadott ID-val rendelkező hiba lekérdezése az adatbázisból
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var errorModel = requireOption(objectRepository, 'errorModel');

    return function(req,res,next)
    {
        if ((req.param('errorid') === '')) 
        {return next();}

        errorModel.findOne({
            _id: req.param('errorid')
        },(err,result)=>{
            if(err)
            {next(err);}
            res.local.error=result;
            return next();
        })
        
    }
}