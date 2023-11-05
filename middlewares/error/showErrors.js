//a bal oldalon előjövő error ablak megjelenítésért/eltűntetéséért feleslős (collapse)
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var errorModel = requireOption(objectRepository, 'errorModel');
    return function(req,res,next)
    {
       
        req.session.showErrors=!req.session.showErrors;
        
        res.redirect('back');
      
        
    }
}
