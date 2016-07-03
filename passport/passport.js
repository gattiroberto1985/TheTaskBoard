var passport = require("passport");
var jwt       = require("jwt-simple");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var env = process.env;

// load up the user model
var User = require('../mongo/User');

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = env.TTB_SECRET_KEY;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
