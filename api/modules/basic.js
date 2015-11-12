var {
  getPlayers, getUptime, getRestartTime, getTPS
} = require('../../modules/tools/db');

const basic = function(req, res) {
  getRestartTime(function(restartTime) {
    getUptime(function(uptime) {
      getPlayers(function(players) {
        getTPS(function(tps) {
          res.json({
            players,
            uptime,
            restartTime,
            tps
          });
        });
      });
    });
  });
};

module.exports = basic;
