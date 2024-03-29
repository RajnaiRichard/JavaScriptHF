// felhasználói fiók törlése az adatbáisból
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');
    return function(req,res,next)
    {
        userModel.findOne({
            _id: req.session.userid
        },(err,result)=>{
            if((err) || (!result))
            {next(err);}

            result.remove((err)=> {
                if (err) {
                  return next(err);
                }})
        })

            return next();
    }
}