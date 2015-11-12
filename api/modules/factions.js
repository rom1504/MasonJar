var {
  getAllFactions
} = require('../../modules/tools/db');

const factions = function(req, res) {
  getAllFactions(function(factions) {
    res.json(factions);
  }, req.params.limit);
};

module.exports = factions;
