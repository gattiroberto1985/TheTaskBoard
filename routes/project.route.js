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
 router.get("/projects/:_id/tasks", passport.authenticate('jwt', { session: false }), function(req, res) {
     prjs.findById(req.params._id).select("tasks").exec( function ( err, datas) {
         if ( err )
             res.send( err );
         res.json( datas );
     });
 });

/**
 * Get header datas of the projects
 */
 router.get("/projects/head", passport.authenticate('jwt', { session: false }), function(req, res) {
     // TBD
 });

router.put("/projects"/*, passport.authenticate('jwt', { session: false })*/, function (req, res) {
    var project = req.body;
    var mProject = new prjs(
        {
            _id            : project._id,
            title          : project.title,
            description    : project.description,
            status         : project.status,
            owner          : project.owner,
            dateOpen       : project.dateOpen,
            dateClose      : project.dateClose,
            dateLastUpdated: project.dateLastUpdated,
            statusNote     : project.statusNote,
            timeline       : project.timeline,
            notes          : project.notes,
            tasks          : project.tasks
        }
    );
    console.log( "Project created: " + JSON.stringify( mProject ) ) ;
    mProject.save( function ( err ) {
        if ( err )
        {
            console.log("ERROR: " + err );
            return res.send(500,  err );
        }
        else
        {
            console.log("OK!");
            return res.send ( 200, "Ok!");
        }
    });
});

router.delete("/projects/:_id"/*, passport.authenticate('jwt', { session: false })*/, function (req, res) {
    var query = { "_id": req.params._id };
    prjs.findOneAndRemove( query, function( err ) {
        if ( err )
            return res.send( 400, { error: err });
        return res.send( 200, "Ok, project deleted!");
    });
});

router.put("/projects/:_id"/*, passport.authenticate('jwt', { session: false })*/, function (req, res) {
    var project = req.body;
    var query = { "_id" : project._id };
    prjs.findOneAndUpdate(query, project, { upsert: true }, function(err, doc) {
        if (err)
            return res.send(500, { error: err });
        return res.send(200, "succesfully saved");
    });
});

module.exports = router;
