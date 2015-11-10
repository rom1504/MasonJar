const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestartTimer = new Schema({
  updatedAt: { type: Date, default: Date.now() },
  timeTillRestart: Number,
  formattedRestartCoutdown: String
});
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
mongoose.model('RestartTimer', RestartTimer);
var RestartTimer = mongoose.model('RestartTimer');

const setRestartTime = function(timeTillRestart) {
  var query = RestartTimer.find().sort({'updatedAt': 'desc'});
  query.findOne(function (err, restart) {
    if (err) return handleError(err);

    if(restart) {
      restart.timeTillRestart = timeTillRestart;
      restart.formattedRestartCoutdown = getDuration(timeTillRestart).toString();
      restart.save(function(){});
    }else {
      var restart = new RestartTimer({
        updatedAt: Date.now(),
        timeTillRestart: timeTillRestart,
        formattedRestartCoutdown: getDuration(timeTillRestart).toString()
      });
      restart.save(function(err){
        if(err) {
          console.log(err);
        }
      });
    }
  });
};

module.exports = setRestartTime;
