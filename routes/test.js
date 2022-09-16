var getSubjectsMW = require('../middlewares/subject/getSubjects');
var renderMW = require('../middlewares/other/render');

var objectRepository = {};
module.exports = function (app) {
app.use(
    getSubjectsMW(objectRepository),
    renderMW(objectRepository,'targyak')

);

};