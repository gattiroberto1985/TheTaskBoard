// Defining modules to import . . .
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

var serveStatic = require('serve-static');

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

/** OPENSHIFT COMPATIBILITY **/
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


app.use('/client/doLogin', function( req, res, next) {
    // recupero variabile post: req.body.<nome_variabile>
    var username = req.body.username;
    var password = req.body.password;
    console.log( "Username: '" + username + "'");
    console.log( "Password: '" + password + "'");

    try
    {
        if ( username === undefined || username == null || username == "" )
            throw "Username must be filled!";

        if ( password === undefined || password == null || password == "" )
            throw "Password must be filled!";

        var mdbConnString = "mongodb://" + username + ":" + password + "@ds011732.mlab.com:11732/thetaskboard";
        console.log( " Connecting with '" + mdbConnString + "'");
        mongoose.connect( mdbConnString );
        mongoose.connection.once('open', function( ) {
                // Load the models. . .
                app.models = require('./models/index');
                //console.log( JSON.stringify ( app.models ) ) ;
                // Load the routes. . .
                var routes = require('./routes.js');
                _.each(routes, function(controller, route){
                    //console.log("Entering each . . .");
                    app.use(route, controller(app, route));
                });
        });
        console.log("'Once' method completed!");
        //console.log("Exiting 'once' method with correct status!");
        res.sendStatus(200);
    }
    catch ( err )
    {
        console.log(" ERROR: " + err );
        res.sendStatus(201);
    }
    next();
});

/*
var serve = serveStatic("./");

var server = http.createServer(function(req, res) {
  var done = finalhandler(req, res);
  serve(req, res, done);
});
*/
app.use('/client', express.static('./client'));

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});


// Connect to MongoDB
//mongoose.connect('mongodb://localhost/mean-dev/');
/*mongoose.connect('mongodb://roberto:roberto@ds011732.mlab.com:11732/thetaskboard');
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
});*/
