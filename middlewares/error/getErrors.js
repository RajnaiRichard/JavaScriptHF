
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var errorModel = requireOption(objectRepository, 'errorModel');

    return function(req,res,next)
    {

        errorModel.find({},(err,result)=>{
            if(err)
            {next(err);}
            res.local.hibak=result;
            return next();
        })
        
    }
}