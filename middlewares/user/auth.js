//bejelentkezés ellenőrzése az olyan funkciókhoz amelyek csak bejelentkezve elérhetőek
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');

    return function(req,res,next)
    {
        if(typeof req.session.userid === 'undefined')
        {return res.redirect('/');}
        return next();
    }
}