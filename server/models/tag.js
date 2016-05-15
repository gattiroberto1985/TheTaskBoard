var mongoose = require('mongoose');

var tagSchema = new mongoose.Schema( {
    _id: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('tag', tagSchema);
