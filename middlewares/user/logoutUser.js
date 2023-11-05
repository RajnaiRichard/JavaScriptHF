//felhasználó kijelentkeztetése
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');

    return function(req,res,next)
    {
            if(req.session.errorsOn)
                console.log('Hibák kikapcsolva!')

            req.session.destroy((err)=>{
            
            return res.redirect('/');
        })
        
    }
}