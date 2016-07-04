
var express = require("express");
var router  = express.Router();
var User    = require("../mongo/User.js");
var prjs    = require("../mongo/Project.js");
var jwt     = require("jwt-simple");
var passport= require("passport");
var env     = process.env;

var getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

router.get("/", function ( req, res, next ) {
    console.log(" [ express-routes ] GET request on path '/' . . . ");
    res.render("index", { title: "Express" } );
});

router.post("/register", function ( req, res ) {
    console.log(" POST ON REGISTER: ");
    console.log(req.body);
    if (!req.body.username || !req.body.password || !req.body.firstname || !req.body.lastname ) {
      res.json({success: false, msg: "Please provide 'username', 'password', 'firstname' and 'lastname' !"});
    } else {
        console.log("Trying to create user with :");
        console.log(" ... username : '" + req.body.username + "'");
        console.log(" ... password : '" + req.body.password + "'");
        console.log(" ... firstname: '" + req.body.firstname + "'");
        console.log(" ... lastname : '" + req.body.lastname + "'");
      var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: err});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
});

router.post('/login', function(req, res) {
    console.log("Searching for user with username '" + req.body.username + "' . . .");
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err)
            throw err;

        if (!user) {
            res.status(400).send({success: false, msg: 'Authentication failed. User not found.'});
        }
        else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, env.TTB_SECRET_KEY);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                }
                else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            }); // closing comparePassword
        } // closing else on !user
    }); // closing findOne
});

router.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, env.TTB_SECRET_KEY);
    User.findOne({
      username: decoded.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.username + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});


module.exports = router;
