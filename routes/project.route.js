var express = require("express");
var router  = express.Router();
var User    = require("../mongo/User.js");
var prjs    = require("../mongo/Project.js");
var jwt     = require("jwt-simple");
var passport= require("passport");
var env     = process.env;

/**
 * Full projects get.
 */
router.get("/projects", passport.authenticate('jwt', { session: false}), function(req, res) {
    prjs.find().exec( function ( err, datas) {
        if ( err )
            res.send( err );
        res.json( datas );
    });
});

/**
 * Get a single project
 */
router.get("/projects/:_id", passport.authenticate('jwt', { session: false}), function(req, res) {
    prjs.findById(req.params._id).exec( function ( err, datas) {
        if ( err )
            res.send( err );
        res.json( datas );
    });
});

/**
 * Get the tasks of the project
 */
 router.get("/projects/:_id/tasks", passport.authenticate('jwt', { session: false}), function(req, res) {
     prjs.findById(req.params._id).select("tasks").exec( function ( err, datas) {
         if ( err )
             res.send( err );
         res.json( datas );
     });
 });

/**
 * Get header datas of the projects
 */
 router.get("/projects/head", passport.authenticate('jwt', { session: false}), function(req, res) {
     // TBD
 });


module.exports = router;
