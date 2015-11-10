var { cmd } = require('../tools');
var { UPDATE_TIMER } = require('../../config');

var OPS = require('../../server/ops.json');

const update = function(mc, payload) {
  for(player in OPS) {
    if (payload.name.toLowerCase() === OPS.name.toLowerCase()) {
      var TIMER = UPDATE_TIMER;
      cmd.say(`Server restarting for update in ${TIMER / 1000 / 60} minute(s)!`);
      var restartTimer = setInterval(function(){
        TIMER = TIMER - 60000;
        cmd.say(`Server restarting for update in ${TIMER / 1000 / 60} minute(s)!`);
      }, 60000);

      setTimeout(function(){
        clearInterval(restartTimer);
        cmd.update(payload);
      }, UPDATE_TIMER);
    }
  }
};

module.exports = update;
