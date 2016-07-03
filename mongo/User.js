var   mongoose = require( "mongoose" )
    , bcrypt   = require( "bcryptjs" )
    ;

var userSchema = new mongoose.Schema({
    username : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    firstname: { type: String, required: true },
    lastname : { type: String, required: true }
});


userSchema.pre("save", function ( next ) {
    var user = this;
    if ( this.isModified("password") || this.isNew )
    {
        bcrypt.genSalt(10, function ( err, salt ) {
            if ( err )
                return next( err );
            bcrypt.hash( user.password, salt, function( err, hash ) {
                if ( err )
                    return next( err );
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var User = mongoose.model("user", userSchema );

module.exports = User;
