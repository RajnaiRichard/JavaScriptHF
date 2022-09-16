
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var errorModel = requireOption(objectRepository, 'errorModel');
    return function(req,res,next)
    {
        if ((typeof res.locals.error === 'undefined')) 
        {return next();}

        res.locals.user.remove((err)=> {
            if (err) {
              return next(err);
            }
            return next();
        })
    }
}