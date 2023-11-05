//felhasználó lekérdezése az adatbázisból session alapján
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');

    return function(req,res,next)
    {
        
        userModel.findOne({
            _id:req.session.userid
        },(err,result)=>{
            if((err)||(!result))
            {
                return next(err);
            }
            res.locals.user = result;
            return next();
          });
          
          
    }
}