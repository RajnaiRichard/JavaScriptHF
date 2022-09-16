var mainRedirectMW = require('../middlewares/user/mainRedirect');
var authMW = require('../middlewares/user/auth');
var addSubjectMW = require('../middlewares/subject/addSubject');
var removeSubjectMW = require('../middlewares/subject/removeSubject');
var getSubjectMW = require('../middlewares/subject/getSubject');
var getSubjectsMW = require('../middlewares/subject/getSubjects');

var getErrorsMW = require('../middlewares/error/getErrors');
var getErrorMW = require('../middlewares/error/getError');
var runErrorMW = require('../middlewares/error/runError');
var generateErrorMW = require('../middlewares/error/generateError');
var deleteErrorMW = require('../middlewares/error/deleteError');

var renderMW = require('../middlewares/other/render');

var errorModel = require('../models/error');
var userModel = require('../models/user');
module.exports = function (app) {

  var objectRepository = {
    errorModel: errorModel,
    userModel: userModel
  };


    app.use('/targy/felvetel/:subjectid',
    authMW(objectRepository),
     runErrorMW(objectRepository),
     generateErrorMW(objectRepository),
     getErrorsMW(objectRepository),
    addSubjectMW(objectRepository),
    renderMW(objectRepository, 'targy')
    );

    app.use('/targy/leadas/:subjectid',
    authMW(objectRepository),
     runErrorMW(objectRepository),
     generateErrorMW(objectRepository),
     getErrorsMW(objectRepository),
    getSubjectMW(objectRepository),
    removeSubjectMW(objectRepository),
    renderMW(objectRepository, 'targy')
    );

    app.use('/orerend/:userid',
    authMW(objectRepository),
     runErrorMW(objectRepository),
     generateErrorMW(objectRepository),
     getErrorsMW(objectRepository),
    getSubjectsMW(objectRepository),
    //updateTimetable(objectRepository),
    renderMW(objectRepository, 'orerend')
    );

    app.use('/hiba/torles/:errorid',
    authMW(objectRepository),
    getErrorMW(objectRepository),
    deleteErrorMW(objectRepository),
    renderMW(objectRepository, 'targy')
    )
    app.use('/hiba',
    authMW(objectRepository),
    getErrorsMW(objectRepository),
    renderMW(objectRepository, 'hiba')
    )


};