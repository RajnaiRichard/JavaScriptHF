
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var errorModel = requireOption(objectRepository, 'errorModel');

    return function(req,res,next)
    {
        if ((typeof req.body.error === 'undefined')) 
        {return next();}

        errorModel.findOne({
            _id: req.body.error._id
        },(err,result)=>{
            if(err)
            {next(err);}
            res.local.error=result;
            return next();
        })
        
    }
}