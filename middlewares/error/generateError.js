//egy véletlenszerű hiba generálása az előre definiáltakból és beírása az adatbázisba
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var errorModel = requireOption(objectRepository, 'errorModel');

    return function(req,res,next)
    {
        if(req.session.errorsOn === false || req.session.skipErrorNum > 0)
        return next();
        
        error = new errorModel();
        let NumberOfErrors = 4;
        let rnd = Math.floor(Math.random() * NumberOfErrors);
        let duplicate = true;
        let NumberOfErrorsTried =0;
        while(duplicate && NumberOfErrorsTried < NumberOfErrors)
        {
            switch(rnd)
            {
                case 0:
                error.Nev = 'Tárgyfelvételi időszak - random kilépletés';
                error.Script = 'console.log(\'[Random kilépletés] hiba lefutott!\'); req.session.destroy((err)=>{return res.redirect(\'/\');})';
                break;
                case 1:
                error.Nev = 'A neptunt sokan használják - 2s timeout linkeknél';
                error.Script = 'console.log(\'[2s timeout linkeknél] hiba lefutott!\'); setTimeout(() => { return next();}, 2000);';
                break;
                case 2:
                error.Nev = 'Az egyik tárgy véletlenszerűen leadódik';
                error.Script = `console.log(\'[Az egyik tárgy véletlenszerűen leadódik] hiba lefutott!\'); 
                        userModel.findOne({
                            _id: req.session.userid
                        },(err,result)=>{
                            if(err)
                            return next(err);
                            if(result)
                            {
                                if( result.Targyak.length>0)
                                result.Targyak.splice(Math.floor(Math.random() * result.Targyak.length),1);
                                result.save((err)=>{
                                    if(err)
                                    return next(err);
                                })      
                            }
                            return next();
                        })`;
                break;
                case 3:
                    error.Nev = 'Neptun válaszüzenet - a levél írójával együtt, mindenki más is megkapja az üzentet';
                    error.Script = `console.log(\'[Mindenki megkapja a válaszüzenetet] hiba lefutott!\'); 
                    res.locals.alertmsg = \'Re:\\nunsubscribe\';
                    next();`;
                break;
            }
            error._Tulajdonos = req.session.userid;

            found=false;
            res.locals.hibak.forEach(hiba => {
                if(hiba.Nev==error.Nev)
                {found=true; }
            });

            if(!found)
            {
                error.save((err)=>{
                    if(err!==null)
                        return next(err);
                })
                duplicate=false;
            }
            else
            {
                rnd = (rnd + 1)%NumberOfErrors;
                NumberOfErrorsTried++;
            }
        }
    
        return next();
    }
}