var mainRedirectMW = require('../middlewares/user/mainRedirect');
var authMW = require('../middlewares/user/auth');
var inverseAuthMW = require('../middlewares/user/inverseAuth');
var loginUserMW = require('../middlewares/user/loginUser');
var logoutUserMW = require('../middlewares/user/logoutUser');
var createUserMW = require('../middlewares/user/createUser');
var getUserMW = require('../middlewares/user/getUser');
var updateUserMW = require('../middlewares/user/updateUser');
var deleteUserMW = require('../middlewares/user/deleteUser');


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
  mainRedirectMW(objectRepository),
  renderMW(objectRepository, 'bejelentezes')
  );

  app.use('/kijelentkezes',
  authMW(objectRepository),
  logoutUserMW(objectRepository),
  mainRedirectMW(objectRepository)
  );

  app.use('/regisztracio',
  inverseAuthMW(objectRepository),
   runErrorMW(objectRepository),
   generateErrorMW(objectRepository),
   getErrorsMW(objectRepository),
  createUserMW(objectRepository),
  renderMW(objectRepository, 'regisztracio')
  );

  app.use('/adatmodositas/:userid',
  authMW(objectRepository),
     runErrorMW(objectRepository),
     generateErrorMW(objectRepository),
     getErrorsMW(objectRepository),
  getUserMW(objectRepository),
  updateUserMW(objectRepository),
  renderMW(objectRepository, 'adatmodositas')
    );

  app.use('/torles/:userid',
  authMW(objectRepository),
     runErrorMW(objectRepository),
     generateErrorMW(objectRepository),
     getErrorsMW(objectRepository),
  getUserMW(objectRepository),
  deleteUserMW(objectRepository),
  mainRedirectMW(objectRepository)
    );

    app.get('/',
    mainRedirectMW(objectRepository),
    renderMW(objectRepository, 'index')
    );

};