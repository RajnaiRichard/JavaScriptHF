var mainRedirectMW = require('../middlewares/user/mainRedirect');
var authMW = require('../middlewares/user/auth');
var inverseAuthMW = require('../middlewares/user/inverseAuth');
var loginUserMW = require('../middlewares/user/loginUser');
var logoutUserMW = require('../middlewares/user/logoutUser');
var createUserMW = require('../middlewares/user/createUser');
var getUserByParamMW = require('../middlewares/user/getUserByParam');
var getUserBySessionMW = require('../middlewares/user/getUserBySession');
var updateUserMW = require('../middlewares/user/updateUser');
var deleteUserMW = require('../middlewares/user/deleteUser');
var forgotpwMW = require('../middlewares/user/forgotpw');


var getErrorsMW = require('../middlewares/error/getErrors');
var getErrorMW = require('../middlewares/error/getError');
var runErrorMW = require('../middlewares/error/runError');
var generateErrorMW = require('../middlewares/error/generateError');


var renderMW = require('../middlewares/other/render');


var errorModel = require('../models/error');
var userModel = require('../models/user');
module.exports = function (app) {

  var objectRepository = {
    errorModel: errorModel,
    userModel: userModel
  };



  app.use('/bejelentezes',
  inverseAuthMW(objectRepository),
  loginUserMW(objectRepository),
   getErrorsMW(objectRepository),
  renderMW(objectRepository, 'bejelentezes')
  );

  app.use('/kijelentkezes',
  authMW(objectRepository),
  logoutUserMW(objectRepository)
  );

  app.use('/regisztracio',
  inverseAuthMW(objectRepository),
  createUserMW(objectRepository),
  renderMW(objectRepository, 'regisztracio')
  );

  app.use('/adatmodositas',
  authMW(objectRepository),
  getErrorsMW(objectRepository),
  generateErrorMW(objectRepository),
  runErrorMW(objectRepository),
  getErrorsMW(objectRepository),
  getUserBySessionMW(objectRepository),
  updateUserMW(objectRepository),
  renderMW(objectRepository, 'adatmodositas')
    );

  app.use('/torles',
  authMW(objectRepository),
  getUserBySessionMW(objectRepository),
  deleteUserMW(objectRepository),
  logoutUserMW(objectRepository)
    );
    app.use('/elfelejtettjelszo',
    //inverseAuthMW(objectRepository),
    forgotpwMW(objectRepository),
    renderMW(objectRepository, 'elfelejtettjelszo')
      );
  
    app.use('/',
    inverseAuthMW(objectRepository),
    loginUserMW(objectRepository),
    renderMW(objectRepository, 'index')
    );

};