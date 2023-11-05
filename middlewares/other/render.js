//az ejs template kirendelése, res.localsra pakolt változók beillesztése
module.exports = function (objectrepository, viewName) {

  return function (req, res) {
    res.render(viewName, res.locals);
  };

};
