//a paramban megadott ID-val rendelkező hiba kitörlése az adatbázisból
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var errorModel = requireOption(objectRepository, 'errorModel');
    return function(req,res,next)
    {
        if ((req.params.errorid === '')) 
        {return next();}

        errorModel.findOne({
            _id: req.params.errorid
        },(err,result)=>{
            if((err) || (!result))
            {next(err);}

            result.remove((err)=> {
                if (err) {
                  return next(err);
                }})
                res.redirect('back');
        })
        
    }
}
