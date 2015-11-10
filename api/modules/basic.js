var { getPlayers, getUptime } = require('../../modules/tools/db');

const basic = function(req, res) {
  getUptime(function(uptime) {
    getPlayers(function(players) {
      res.json({
        players,
        uptime
      });
    });
  });
};

module.exports = basic;
