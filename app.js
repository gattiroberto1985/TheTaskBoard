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
var   express   = require('express')
    , mongoose  = require('mongoose')
    , resource  = require('resourcejs')
    //, _         = require('lodash')
    , session   = require("express-session")
    , cookiePrs = require("cookie-parser")
    , bodyPrs   = require("body-parser")
    , passport  = require("passport")
    , jwt       = require("jwt-simple")
    , morgan    = require("morgan")
    ;

if ( ! env.TTB_SECRET_KEY )
{
    console.log(" ERROR: Environment is not configured for the application!");
    console.log("        I need an enviroment variabile defined as 'TTB_SECRET_KEY'");
    console.log("        Please, inject it in the enviroment!");
    throw "TTB_SECRET_KEY is mandatory! Inject it into the enviroment!";
}


// Loading xpress routing . . .
var app = express();

// Setting CORS headers . . .
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Using morgan for logging . . .
app.use(morgan("dev"));

// Using passport . . .
app.use(passport.initialize());
// pass passport for configuration
require('./passport/passport')(passport);

// Configuring mongoose . . .

mongoose.connect('mongodb://openshift:yNxw5CMJQ&wL!fP8@ds011732.mlab.com:11732/thetaskboard');
mongoose.connection.once('open', function() {

    // Load the models. . .
    app.models = {
          user   : require('./mongo/User.js')
        , fask   : require('./mongo/Fask.js')
        , project: require('./mongo/Project.js')
        //, task   : require("./mongo/Task.js")
    };
    //console.log( JSON.stringify ( app.models ) ) ;
    // Load the mongodb restified (methods exposed:
    //   - GET, POST on root;
    //   - GET, PUT, DELETE, PATCH on /<root>/:id
    /*
     * WE comment the resource methods, as we use the express route to handle
     * the security
     */
    //resource(app, '', 'project', app.models.project).rest();
    //resource(app, '', 'user', app.models.user).rest();
    //resource(app, '', 'fask', app.models.fask).rest();
    //resource(app, 'project/:projectId', 'task', app.models.task).rest();

    // SAME WITH LODASH
    /*var routes = require('./mongo/mongoRoutes.js');
    _.each(routes, function(controller, route){
        console.log(" [ MongoRestify ] Setting rest endpoint for '" + route + "'");
        app.use(route, controller(app, route));
    });*/

    app.listen(port, ip, function () {
        console.log(" [ PID: ${process.pid} ] Listening on server '" + ip + "' on port '" + port + "'...");
    });
});

// declaring use of cookie-parser
app.use(cookiePrs());
// declaring use of sessions
app.use(session({
    secret           : env.TTB_SECRET_KEY,
    resave           : false,
    saveUninitialized: false
}));
// Local sessions defining . . .
app.use(function(req, res, next ) {
    res.locals.session = req.session;
    next();
 });

 // configure app to use bodyParser()
 // this will let us get the data from a POST
 app.use(bodyPrs.urlencoded({ extended: true }));
 app.use(bodyPrs.json());

app.use( "/", require("./routes/auth.route.js"));
app.use( "/", require("./routes/project.route.js"));

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

app.use('/client', express.static('client'));

// END OPENSHIFT management

// START DEFINE LOGIN

// Method to call on every REST call . . .
/*app.use(function (req, res, next)
    {
        if ( req.session.user === undefined )
            res.sendFile(__dirname + "/login.html");
        else
            next();
    }
);*/

/*app.post('/login', function(req, res) {
      req.session.user = req.body.nome;
      res.render('benvenuto', {nomeCognome : req.query.nome});
 });*/

// END DEFINE LOGIN
