//a hibák ki/bekapcsolásáért felelős. Kiakapcsolt hibáknál azok egyáltalán nem futnak és nem generálódnak le.
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var errorModel = requireOption(objectRepository, 'errorModel');
    return function(req,res,next)
    {
       
        req.session.errorsOn=!req.session.errorsOn;
        req.session.skipErrorNum = 1;
        if(req.session.errorsOn)
        console.log('Hibák bekapcsolva!')
        else
        console.log('Hibák kikapcsolva!')
        
        res.redirect('back')
      
        
    }
}
