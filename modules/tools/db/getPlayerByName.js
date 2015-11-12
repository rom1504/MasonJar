const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = mongoose.model('Player');

const getPlayersByName = function(player, callback) {
  var query = Player
    .findOne({ 'username': player })
    .where('__v').gt(0)
    .sort({'updatedAt': 'desc'});

  query.find(function (err, player) {
    if (err) return handleError(err);
    if(player[0]) {
      var player = player[0];
      callback({
        updatedAt: player.updatedAt,
        username: player.username,
        onlinePoints: player.onlinePoints,
        points: player.points,
        afk: player.afk,
        lastSeen: player.onlineStamp,
        UUID: player.UUID,
        metadata: player.metadata
      });
    }else {
      callback({
        updatedAt: 'never',
        username: 'unknown',
        onlinePoints: 0,
        points: 0,
        afk: false,
        lastSeen: 'never',
        UUID: 'unknown'
      });
    }
  });
};

module.exports = getPlayersByName;
