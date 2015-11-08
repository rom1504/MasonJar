const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerCount = new Schema({
  updatedAt: { type: Date, default: Date.now() },
  count: Number
});

mongoose.model('PlayerCount', PlayerCount);
var PlayerCount = mongoose.model('PlayerCount');

const setPlayers = function(playerCount) {
  var query = PlayerCount.find().sort({'updatedAt': 'desc'});
  query.findOne(function (err, players) {
    if (err) return handleError(err);

    if(players) {
      players.count = playerCount;
      players.save(function(){});
    }else {
      var players = new PlayerCount({
        updatedAt: Date.now(),
        count: playerCount
      });
      players.save(function(err){
        if(err) {
          console.log(err);
        }
      });
    }
  });
};

module.exports = setPlayers;
