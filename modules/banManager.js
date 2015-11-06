var { VOTES_TO_BAN, VOTES_TO_UNBAN } = require('../config');

const banManager = function(mc, BannedPlayers, callback) {
  // Nothing here for now.
  mc.on('line', function(line) {
    // Parse ban votes
  });

  callback({error: false});
};

module.exports = banManager;
