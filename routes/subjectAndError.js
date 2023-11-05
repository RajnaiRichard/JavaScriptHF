var mainRedirectMW = require('../middlewares/user/mainRedirect');
var authMW = require('../middlewares/user/auth');
var addSubjectMW = require('../middlewares/subject/addSubject');
var removeSubjectMW = require('../middlewares/subject/removeSubject');
var getUserSubjectsMW = require('../middlewares/subject/getUserSubjects');
var getSubjectsMW = require('../middlewares/subject/getSubjects');
var updateTimetableMW = require('../middlewares/subject/updateTimetable');

var getUserBySessionMW = require('../middlewares/user/getUserBySession');

var getErrorsMW = require('../middlewares/error/getErrors');
var getErrorMW = require('../middlewares/error/getError');
var runErrorMW = require('../middlewares/error/runError');
var generateErrorMW = require('../middlewares/error/generateError');
var deleteErrorMW = require('../middlewares/error/deleteError');
var turnErrorsOnOffMW = require('../middlewares/error/turnErrorsOnOff');
var showErrorsMW = require('../middlewares/error/showErrors');

var renderMW = require('../middlewares/other/render');

var errorModel = require('../models/error');
var userModel = require('../models/user');
module.exports = function (app) {

  var objectRepository = {
    errorModel: errorModel,
    userModel: userModel
  };


    app.use('/targyak/felvetel/:subjectid',
    authMW(objectRepository),
    getUserBySessionMW(objectRepository),
    getSubjectsMW(objectRepository),
    addSubjectMW(objectRepository)
    );
  
    app.use('/targyak/leadas/:subjectid',
    authMW(objectRepository),
    getUserBySessionMW(objectRepository),
    getSubjectsMW(objectRepository),
    removeSubjectMW(objectRepository)
    );
    app.use('/targyak',
    authMW(objectRepository),
    getErrorsMW(objectRepository),
    generateErrorMW(objectRepository),
    runErrorMW(objectRepository),
    getErrorsMW(objectRepository),
    getSubjectsMW(objectRepository),
    renderMW(objectRepository, 'targyak')
    );

    app.use('/orarend',
    authMW(objectRepository),
    getErrorsMW(objectRepository),
    generateErrorMW(objectRepository),
    runErrorMW(objectRepository),
    getErrorsMW(objectRepository),
    getUserSubjectsMW(objectRepository),
    getSubjectsMW(objectRepository),
    updateTimetableMW(objectRepository),
    renderMW(objectRepository, 'orarend')
    );

    app.use('/hiba/torles/:errorid',
    authMW(objectRepository),
    deleteErrorMW(objectRepository)
    );
  /*
    app.use('/hiba',
    authMW(objectRepository),
    getErrorsMW(objectRepository),
    renderMW(objectRepository, 'targyak')
    );*/

    app.use('/errorOnOff',
    authMW(objectRepository),
    turnErrorsOnOffMW(objectRepository)
    );
    app.use('/errorShow',
    authMW(objectRepository),
    showErrorsMW(objectRepository)
    );


};