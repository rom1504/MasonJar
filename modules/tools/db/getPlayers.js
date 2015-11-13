const mongoose = require('mongoose');


var PlayerCount = mongoose.model('PlayerCount');

const getPlayers = function(callback) {
  var query = PlayerCount
    .find()
    .sort({'updatedAt': 'desc'});

  query.find(function (err, players) {
    if (err) return handleError(err);
    if(players) {
      players = players[0];
      callback({
        count: players.count,
        players: players.names,
        updatedAt: players.updatedAt
      });
    }else {
      callback({
        count: 0,
        players: [],
        updatedAt: 'Never'
      });
    }
  });
};

module.exports = getPlayers;
