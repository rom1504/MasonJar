const mongoose = require('mongoose');


var Uptime = mongoose.model('Uptime');
var getDuration = function(millis){
    var dur = {};
    var units = [
        {label:"millis",    mod:1000},
        {label:"seconds",   mod:60},
        {label:"minutes",   mod:60},
        {label:"hours",     mod:24},
        {label:"days",      mod:31}
    ];
    // calculate the individual unit values...
    units.forEach(function(u){
        millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
    });
    // convert object to a string representation...
    dur.toString = function(){
        return units.reverse().map(function(u){
            return dur[u.label] + " " + (dur[u.label]==1?u.label.slice(0,-1):u.label);
        }).join(', ');
    };
    return dur;
};

const getUptime = function(callback) {
  var query = Uptime.find().sort({'updatedAt': 'desc'});
  query.findOne(function (err, uptime) {
    if (err) return handleError(err);
    if(uptime) {
      callback({
        uptime: uptime.uptime,
        uptimeBreakdown: getDuration(uptime.uptime),
        formattedUptime: getDuration(uptime.uptime).toString(),
        updatedAt: uptime.updatedAt
      });
    }else {
      callback({
        uptime: 0,
        uptimeBreakdown: {},
        formattedUptime: '',
        updatedAt: 'never'
      });
    }
  });
};

module.exports = getUptime;
