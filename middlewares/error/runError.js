//a generált hibák érvényesítése, futtatása

var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var errorModel = requireOption(objectRepository, 'errorModel');
    var userModel = requireOption(objectRepository, 'userModel');
    return function(req,res,next)
    {
        
        if( typeof res.locals.hibak === 'undefined' || res.locals.hibak.length === 0 || req.session.errorsOn === false || req.session.skipErrorNum > 0)
        {
            if(req.session.skipErrorNum>0)
            req.session.skipErrorNum--;
            
            return next();
            
        }
        else
        {
            let rnd = Math.floor(Math.random() * res.locals.hibak.length);
            eval(res.locals.hibak[rnd].Script);
  
        }
    }
}