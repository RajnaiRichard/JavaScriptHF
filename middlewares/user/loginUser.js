//felhasználó bejelentkeztetése
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');

    return function(req,res,next)
    {
        if(typeof req.body.azonosito === 'undefined' || typeof req.body.jelszo === 'undefined')
        {return next();}

       
        userModel.findOne({
            Azonosito: req.body.azonosito
        },(err,result)=>{
            if((err) || (!result))
            {
                console.log('Azonosito nem talalhato!');
                return next();}

            if(result.Jelszo === req.body.jelszo)
            {
                req.session.userid = result._id;
                req.session.errorsOn = false;
                res.locals.errorsOn = false;
                req.session.showErrors = false;
                res.locals.showErrors = false;
                return req.session.save((err) => {res.redirect('/targyak')});
            }
            console.log('Jelszo nem egyezik!');
            return next();
        })
    }
}