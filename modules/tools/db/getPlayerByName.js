const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Player = mongoose.model('Player');

const getPlayersByName = function(player, callback) {
  var query = Player.find({ 'username': player }).sort({'updatedAt': 'desc'});
  query.findOne(function (err, player) {
    if (err) return handleError(err);
    if(player) {
      callback({
        updatedAt: player.updatedAt,
        username: player.username,
        onlinePoints: player.onlinePoints,
        points: player.points,
        afk: player.afk,
        lastSeen: player.onlineStamp,
        UUID: player.UUID,
        plainUUID: player.plainUUID
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
