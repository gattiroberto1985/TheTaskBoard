// Assigning a controller to each path . . .
module.exports = {
    'user'   : require('./controllers/userCntr.js'),
    'fask'   : require('./controllers/faskCntr.js'),
    'project': require('./controllers/projectCtrl.js')
};
