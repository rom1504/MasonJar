var {
  getPlayers, getUptime, getRestartTime
} = require('../../modules/tools/db');

const basic = function(req, res) {
  getRestartTime(function(restartTime) {
    getUptime(function(uptime) {
      getPlayers(function(players) {
        res.json({
          players,
          uptime,
          restartTime
        });
      });
    });
  });
};

module.exports = basic;
