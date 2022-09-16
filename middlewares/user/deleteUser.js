
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');
    return function(req,res,next)
    {
        if ((typeof res.locals.user === 'undefined')) 
        {return next();}

        res.locals.user.remove((err)=> {
            if (err) {
              return next(err);
            }
            return next();
        })
    }
}