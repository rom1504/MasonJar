var { setUptime, setRestartTime } = require('../tools/db');
var startTime = Date.now();

var { RESTART_TIMER, CACHE_TIMER } = require('../../config');
var timeTillRestart = RESTART_TIMER;

var cmd = require('../tools/cmd.js');

module.exports = function(mc) {
  var now = Date.now();

  timeTillRestart = timeTillRestart - CACHE_TIMER;
  setRestartTime(timeTillRestart);

  if( timeTillRestart - CACHE_TIMER < 0 ){
    cmd.restart();
    timeTillRestart = RESTART_TIMER;
  }
  mc.writeServer('list\n');
  uptime = now - startTime;
  setUptime(uptime);
};
