// Getting the mongoose module and translating it in a REST API!
var Resource = require('resourcejs');

module.exports = function(app, route) {

  // Setup the controller for REST;
  //console.log( JSON.stringify ( app.models.user ) );
  Resource(app, '', route, app.models.user).rest();

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};

/*var restful = require('node-restful');

module.exports = function ( app, route ) {

    // Setup the controller for rest . . .
    var rest = restful.model(
        'user',
        app.models.user
    ).methods(['get', 'put', 'post', 'delete']);

    console.log("Registering controller for user . . .");
    rest.register();
    console.log("Registered!");

    // Return middleware
    return function( req, res, next ) {
        next();
    };
};*/
