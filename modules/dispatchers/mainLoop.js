var { setUptime, setRestartTime } = require('../tools/db');
var startTime = Date.now();

var { RESTART_TIMER, CACHE_TIMER } = require('../../config');
var timeTillRestart = RESTART_TIMER;

module.exports = function(mc) {
  var now = Date.now();

  timeTillRestart = timeTillRestart - CACHE_TIMER;
  setRestartTime(timeTillRestart);

  mc.writeServer('list\n');
  uptime = now - startTime;
  setUptime(uptime);
};
