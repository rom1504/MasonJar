const mongoose = require('mongoose');

var Uptime = mongoose.model('Uptime');

const setUptime = function(serverUptime) {
  var query = Uptime.find().sort({'updatedAt': 'desc'});
  query.findOne(function (err, uptime) {
    if (err) return handleError(err);

    if(uptime) {
      uptime.uptime = serverUptime;
      uptime.save(function(){});
    }else {
      var uptime = new Uptime({
        updatedAt: Date.now(),
        uptime: serverUptime
      });
      uptime.save(function(err){
        if(err) {
          console.log(err);
        }
      });
    }
  });
};

module.exports = setUptime;
