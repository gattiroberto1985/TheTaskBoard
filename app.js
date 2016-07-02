const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      env          = process.env;

// START OF: SERVER DEFINITION
/*let server = http.createServer(function (req, res) {
  let url = req.url;
  if (url == '/') {
    url += 'index.html';
  }

  // IMPORTANT: Your application HAS to respond to GET /health with status 200
  //            for OpenShift health monitoring

  if (url == '/health') {
    res.writeHead(200);
    res.end();
  } else if (url == '/info/gen' || url == '/info/poll') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo[url.slice(6)]()));
  } else {
    fs.readFile('./static' + url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
      } else {
        let ext = path.extname(url).slice(1);
        res.setHeader('Content-Type', contentTypes[ext]);
        if (ext === 'html') {
          res.setHeader('Cache-Control', 'no-cache, no-store');
        }
        res.end(data);
      }
    });
  }
});*/
// END OF: SERVER DEFINITION

// DEFINING TTB APP
var   express  = require('express')
    , mongoose = require('mongoose')
    , resource = require('resourcejs')
    , _        = require('lodash');

// Loading xpress routing . . .
var app = express();
app.use( "/", require( "./routes/index.js"));

// START OPENSHIFT management

app.use( '/health' , function ( req, res ) {
  res.writeHead(200);
  res.end();
} );

app.use( '/info/gen', function ( req, res ) {
    var url = req.url;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    console.log( url.slice(6));
    res.end(); //res.end(JSON.stringify(sysInfo[url.slice(6)]()));
});

app.use(  '/info/poll', function ( req, res ) {
    var url = req.url;
    console.log( url.slice(6));
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(); //JSON.stringify(sysInfo[url.slice(6)]()));
});

var port = env.NODE_PORT || 3000;
var ip   = env.NODE_IP || 'localhost'

// END OPENSHIFT management

// START DEFINE MONGODB ENDPOINT


// END DEFINE MONGODB ENDPOINT

mongoose.connect('mongodb://nodeserver:nodeserver@ds011732.mlab.com:11732/thetaskboard');
mongoose.connection.once('open', function() {

    // Load the models. . .
    app.models = {
        user   : require('./mongo/User.js'),
        fask   : require('./mongo/Fask.js'),
        project: require('./mongo/Project.js')
    };
    //console.log( JSON.stringify ( app.models ) ) ;
    // Load the mongodb restified . . .

    var routes = require('./mongo/mongoRoutes.js');
    _.each(routes, function(controller, route){
        console.log(" [ MongoRestify ] Setting rest endpoint for '" + route + "'");
        app.use(route, controller(app, route));
    });

    app.listen(port, ip, function () {
        console.log(" [ PID: ${process.pid} ] Listening on server '" + ip + "' on port '" + port + "'...");
    });
});
