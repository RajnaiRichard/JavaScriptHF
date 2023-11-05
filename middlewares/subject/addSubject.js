// a paramban megadott ID-val rendelkező tárgy felvétele, a bejelentkezett felhasználóhoz beírása az adatbázisba
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');

    return function(req,res,next)
    {
        
            found = false;
            if(typeof res.locals.user === 'undefined')
                console.log('oh no')
            if(typeof res.locals.user.Targyak !== 'undefined')
            {
                if(res.locals.user.Targyak.length>0)
                {
                    res.locals.user.Targyak.forEach((targy)=>{
                        if(targy._id == req.param('subjectid'))
                            {found=true;}
                    })
                }
            }
            if(!found)
            {
                res.locals.user.Targyak.push(res.locals.targyak[req.param('subjectid')]);
                res.locals.user.save((err)=>{
                    if(err!==null)
                    console.log(err);
                })
            }
            res.redirect('back');
         
        
    }
}