// Getting the mongoose module and translating it in a REST API!
var Resource = require('resourcejs');

var userCntr = function(app, route) {
  // Setup the controller for REST;
  //console.log( JSON.stringify ( app.models.user ) );
  Resource(app, '', route, app.models.user).rest();

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};

var faskCntr =  function(app, route) {

  // Setup the controller for REST;
  console.log( JSON.stringify ( app.models.fask ) );
  Resource(app, '', route, app.models.fask).rest();

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};

var projCntr = function(app, route) {

  // Setup the controller for REST;
  //console.log( JSON.stringify ( app.models.user ) );
  Resource(app, '', route, app.models.project).rest();

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};


module.exports = {
    'user'   : userCntr,
    'fask'   : faskCntr,
    'project': projCntr
};
