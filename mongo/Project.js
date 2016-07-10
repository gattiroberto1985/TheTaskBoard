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


projectSchema/*.schema*/.createInstance = function ( project ) {
    var projectModel = mongoose.model('project', projectSchema);
    return new ProjectModel( {
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
    });
};

var projectModel = mongoose.model('project', projectSchema);

//module.exports = userSchema;
module.exports = projectModel;
