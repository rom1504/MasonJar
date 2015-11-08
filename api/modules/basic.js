var { getPlayers } = require('../../modules/tools/db');

const basic = function(req, res) {
  getPlayers(function(players) {
    res.json({
      players
    });
  });
};

module.exports = basic;
