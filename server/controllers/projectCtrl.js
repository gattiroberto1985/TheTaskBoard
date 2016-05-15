// Getting the mongoose module and translating it in a REST API!
var Resource = require('resourcejs');

module.exports = function(app, route) {

  // Setup the controller for REST;
  //console.log( JSON.stringify ( app.models.user ) );
  Resource(app, '', route, app.models.project).rest();

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};
