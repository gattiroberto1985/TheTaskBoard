var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema( {
    _id            : { type: String, required: true },
    title          : { type: String, required: true },
    description    : { type: String, required: false },
    status         : { type: Object, default: "N.A." },
    owner          : { type: Object, default: "N.A." },
    dateOpen       : { type: Date,   default: Date.now },
    dateClose      : { type: Date,   default: Date.now },
    dateLastUpdated: { type: Date,   default: Date.now },
    statusNote     : { type: String, required: false },
    timeline       : { type: Array , default: [ ]    },
    notes          : { type: Array , default: [ ]    },
    tasks          : { type: Array , default: [ ]    }
});
//module.exports = userSchema;
module.exports = mongoose.model('project', projectSchema);
