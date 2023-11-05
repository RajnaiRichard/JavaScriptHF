//felhasználó lekérdezése az adatbázisból a paramban megadott ID alapján
var requireOption = require('../common').requireOption;

module.exports = function (objectRepository){

    var userModel = requireOption(objectRepository, 'userModel');

    return function (req, res, next) {
        if ((typeof req.param('userid') === 'undefined') || typeof req.param('userid') === 'null') 
        {return next();}
    
        userModel.findOne({_id: req.param('userid')}, (err, result) =>{
          if (err) {
            return next(err);
          }
    
          res.locals.user = result;
    
          return next();
        });
    
      };
}