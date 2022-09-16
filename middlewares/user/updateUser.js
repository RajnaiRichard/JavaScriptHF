
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');
    return function(req,res,next)
    {
        if(typeof res.locals.user === 'undefined'|| typeof req.body.azonosito === 'undefined'|| typeof req.body.jelszo === 'undefined')
        {return next();}

        userModel.updateOne({
            _id: res.locals.user._id
        },{
            Azonosito: req.body.azonosito,
            Jelszo: req.body.jelszo
        }, (err,result)=>{
            if(err)
            {
                return next(err);
            }
            return next();
        })
    }
}