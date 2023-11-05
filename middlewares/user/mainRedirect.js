//bejelentkezés alapján a felhasználó átirányítása


module.exports = function (objectRepository){

    return function(req,res,next)
    {
        if(typeof req.session.userid === 'undefined')
        {return res.redirect('/bejelentkezes');}
        return res.redirect('/targyak');;
    }
}