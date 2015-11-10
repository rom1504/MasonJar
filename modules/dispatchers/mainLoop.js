var { setUptime } = require('../tools/db');
var startTime = Date.now();

module.exports = function(mc) {
  var now = Date.now();

  mc.writeServer('list\n');
  uptime = now - startTime;
  setUptime(uptime);
};
