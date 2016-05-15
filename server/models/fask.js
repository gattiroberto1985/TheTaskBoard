var mongoose = require('mongoose');

var faskSchema = new mongoose.Schema( {
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('fask', faskSchema);
