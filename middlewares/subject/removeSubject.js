// a paramban megadott ID-val rendelkező tárgy leadása, a bejelentkezett felhasználótól törlése az adatbázisba
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');

    return function(req,res,next)
    {

            res.locals.user.Targyak.forEach((targy,index,object)=>{
                if(targy._id == req.param('subjectid'))
                    {object.splice(index,1);}
            })
                res.locals.user.save((err)=>{
                    if(err!==null)
                    console.log(err);
                 })
        res.redirect('back');
    }
}