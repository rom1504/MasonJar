const mongoose = require('mongoose');


var PlayerCount = mongoose.model('PlayerCount');

const setPlayers = function(callback) {
  var query = PlayerCount.find().sort({'updatedAt': 'desc'});
  query.findOne(function (err, players) {
    if (err) return handleError(err);
    if(players) {
      callback({
        count: players.count,
        updatedAt: players.updatedAt
      });
    }else {
      callback({
        count: 0,
        updatedAt: 'Never'
      });
    }
  });
};

module.exports = setPlayers;
