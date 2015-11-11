var {
  getAllPlayers
} = require('../../modules/tools/db');

const players = function(req, res) {
  getAllPlayers(function(players) {
    res.json(players);
  }, req.params.limit);
};

module.exports = players;
