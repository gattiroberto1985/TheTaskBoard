var mongoose = require('mongoose');

var userSchema = new mongoose.Schema( {
    _id     : { type: String, required: true },
    email   : { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});
//module.exports = userSchema;
module.exports = mongoose.model('user', userSchema);

/*console.log ( JSON.stringify ( module.exports ) );
console.log ( module.exports );*/
