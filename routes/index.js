
var express = require("express");
var router  = express.Router();
var User    = require("../mongo/User.js");

router.get("/", function ( req, res, next ) {
    console.log(" [ express-routes ] GET request on path '/' . . . ");
    res.render("index", { title: "Express" } );
});

router.post("/register", function ( req, res ) {
    console.log(" [ express-routes ] POST request on path '/register' . . . ");
    var username  = req.body.username ;
    var password  = req.body.password ;
    var firstname = req.body.firstname;
    var lastname  = req.body.lastname ;

    var user = new User();
    user.username  = username;
    user.password  = password;
    user.firstname = firstname;
    user.lastname  = lastname;

    console.log(" [ express-routes ] |-- Saving user on db . . . ");
    user.save( function ( err, savedUser ) {
        if ( err )
        {
            console.log( " [ express-routes ] [ save-user ] ERROR: save user failed!");
            return res.status( 500 ).send();
        }
        // if saving has been fine . . .
        console.log( " [ express-routes ] [ save-user ] Ok, user saved!");
        return res.status ( 200 ).send();
    });
});


module.exports = router;
