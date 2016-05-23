// Defining modules to import . . .
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
//var passport = require('passport');

/**
 * passport CONFIGURATION
 */

// Creating the express application . . .
var app = express () ; // this app will be injected as dependency in the controllers!

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// [ 2 ] Adding CORS Support (guarda, ma e' accesso ad ip pubblico)
// CORS Support (parametri: richiesta, risposta, callback)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // gestione sicurezza e origine connessione!
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Rest endpoint for check the state of the server  . . .
app.use('/ttb_mongo_api', function(req, res, next) {
  res.send('Hello World!');
  next(); // pass to next middlewaer
});

// Connect to MongoDB
//mongoose.connect('mongodb://localhost/mean-dev/');
mongoose.connect('mongodb://roberto:roberto@ds011732.mlab.com:11732/thetaskboard');
mongoose.connection.once('open', function() {

    // Load the models. . .
    app.models = require('./models/index');
    //console.log( JSON.stringify ( app.models ) ) ;
    // Load the routes. . .
    var routes = require('./routes.js');
    _.each(routes, function(controller, route){
        //console.log("Entering each . . .");
        app.use(route, controller(app, route));
    });

    console.log('Listening on port 3000...');
    app.listen(3000);
});
