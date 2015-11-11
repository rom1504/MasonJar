var {
  getPlayerByName
} = require('../../modules/tools/db');

const basic = function(req, res) {
  getPlayerByName(req.params.player, function(player) {
    res.json(player);
  });
};

module.exports = basic;
