const mongoose = require('mongoose');


var RestartTimer = mongoose.model('RestartTimer');


const getRestartTime = function(callback) {
  var query = RestartTimer.find().sort({'updatedAt': 'desc'});
  query.findOne(function (err, restartTime) {
    if (err) return handleError(err);
    if(restartTime) {
      callback({
        timeTillRestart: restartTime.timeTillRestart,
        formattedRestartCoutdown: restartTime.formattedRestartCoutdown,
        updatedAt: restartTime.updatedAt
      });
    }else {
      callback({
        uptime: 0,
        timeTillRestart: {},
        formattedRestartCoutdown: '',
        updatedAt: 'never'
      });
    }
  });
};

module.exports = getRestartTime;
